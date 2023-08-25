const express = require("express"); // Make sure you're using this import statement
var bodyParser = require('body-parser')

import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { registerUser , getAllUsers, getUserById, updateUser} from "./userServices";
import { createWallet, updateWallerWithDrawByUserId, updateWalletAmountByUserId, getWalletByUserId, walletTransferByUserId } from "./walletServices";
const bcrypt = require('bcrypt');
const cors = require("cors")

var jwt = require('jsonwebtoken');

// Initialize database connection
AppDataSource.initialize()
  .then(async () => {
    console.log("Database Up and Running");

    // Set up Express app
    const app = express();

    // configure the app to use bodyParser()
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cors())
    app.use(bodyParser.json());
   
    app.post("/invite", async (req, res) => {
        try {
          const newUser = await registerUser({
            firstName: '',
            lastName: '',
            email: req.body.email,
            password: '',
            isActive: false,
            isAdmin: false
          }); // Assuming request body matches User entity structure
          res.status(201).json({
            message: "Invite sent",
            acceptUrl: `/accept/invite?id=${newUser.id}&email=${newUser.email}`
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: error.driverError.detail });
        }
      });

      app.put("/register/admin", async (req, res) => {
        try {
          const userId = req.query.id;
          const email = req.body.email

          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const updatedUser = await registerUser({
            firstName: "",
            lastName: "",
            email: email,
            password: hashedPassword,
            isActive: true,
            isAdmin: true
          }); 

          createWallet(updatedUser.id, 0)
          res.json(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });

      app.put("/accept/invite", async (req, res) => {
        try {
          const userId = req.query.id;
          const email = req.query.email

          console.log(userId, email)
        
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const updatedUser = await updateUser(userId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: email,
            password: hashedPassword,
            isActive: true,
            isAdmin: false
          }); 

          createWallet(updatedUser.id, 0)
          res.json(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
    
      app.post("/login", async (req, res) => {

        try {
          const { email, password } = req.body;
      
          // Retrieve user from the database using the email
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { email } });
      
          if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
      
          // Compare the provided password with the stored hashed password
          const passwordMatches = await bcrypt.compare(password, user.password);
      
          if (passwordMatches) {
            // Generate JWT token
            const token = jwt.sign({ email }, "secretKey", { expiresIn: "1h" });
      
            res.json({ token });
          } else {
            res.status(401).json({ error: "Invalid credentials" });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });


      const authenticateToken = (req, res, next) => {
        const token = req.header("Authorization");
      
        if (!token) {
          return res.status(401).json({ error: "Unauthorized" });
        }
      
        jwt.verify(token, "secretKey", (err, user) => {
          if (err) {
            return res.status(403).json({ error: "Forbidden" });
          }
          req.user = user; // Attach user information to the request object
          next();
        });
      };

      app.get("/current-user", authenticateToken, async (req, res) => {
        try {
          // The user information from the token is available in req.user
          const email = req.user.email;
          
          // Retrieve user from the database using the email
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { email } });
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          res.json(user);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });

      app.get("/users", async (req, res) => {
        try {
          
         const allUsers = await getAllUsers()
      
      
          res.json(allUsers);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
      app.post("/wallet/deposit", authenticateToken, async (req, res) => {
        try {
          // The user information from the token is available in req.user

          const amount = req.body.amount
          const email = req.user.email
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { email } });
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          const updateWallet = await updateWalletAmountByUserId(user.id, amount)

          res.json({
            "wallet": updateWallet
          })
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
      app.post("/wallet/withdraw", authenticateToken, async (req, res) => {
        try {
          // The user information from the token is available in req.user

          const amount = req.body.amount
          const email = req.user.email
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { email } });
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          const updateWallet = await updateWallerWithDrawByUserId(user.id, amount)

          res.json({
            "wallet": updateWallet
          })
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });

      app.post("/wallet/transfer", authenticateToken, async (req, res) => {
        try {
          // The user information from the token is available in req.user

          const recipient = req.body.recipient
          const amount = req.body.amount
          const email = req.user.email
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { email } });
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }

          const getWallet = await getWalletByUserId(user.id)

          if (getWallet.amount < amount) {
            res.json({
              "status": "Insufficient Balance"
            })
          }

          console.log("rec", recipient)
          const walletTransfer = await walletTransferByUserId(getWallet.id, recipient, amount)
      
          // const updateWallet = await updateWalletAmountByUserId(user.id, amount)

          res.json({
            "wallet": walletTransfer
          })
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });

      app.get("/wallet/", authenticateToken, async (req, res) => {
        try {
     

          const amount = req.body.amount
          const email = req.user.email
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { email } });
      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          const getWallet = await getWalletByUserId(user.id)
          console.log(getWallet)

          res.json({
            "wallet": getWallet
          })
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
      app.put("/toggleUser", authenticateToken, async (req, res) => {
        const { userId, isActive } = req.body;
      
        try {
          // Get the user by userId
          const user = await getUserById(userId);
    
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          // Toggle the user's active status
          const updatedUser = { ...user, isActive: isActive };
          console.log(updatedUser)
          await updateUser (userId,updatedUser);
      
          return res.status(200).json(updatedUser);
        } catch (error) {
          console.error("Error toggling user status:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
      
    // Define routes, middleware, etc. here

    // Start the Express server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => console.log(error));



