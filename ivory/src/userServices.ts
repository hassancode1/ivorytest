import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

// Function to register a new user
export async function registerUser(userData) {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.save(userData);
  return newUser
}

// Function to get a user by ID
export async function getUserById(userId) {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.findOne({ where: { id :userId} });
}
export async function getAllUsers() {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.find(); 
}


// Function to get a user by email
export async function getUserByEmail(email) {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.findOne({ where: { email } });
}

export async function updateUser(id, newData) {
  const userRepository = AppDataSource.getRepository(User);
  const userToUpdate = await userRepository.findOne({ where: { id } }); // userId should be the selection condition
  
  if (!userToUpdate) {
    throw new Error("User not found");
  }

  userRepository.merge(userToUpdate, newData);
  return userRepository.save(userToUpdate);
}





