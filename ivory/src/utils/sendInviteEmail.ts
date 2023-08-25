const nodemailer = require("nodemailer");

const sendInviteEmail = async (email, userId) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hassanjaeh@gmail.com",
      pass: "xexdswmqqsgafmiz",
    },
  });

  const mailOptions = {
    from: "hassanjaeh@gmail.com",
    to: email,
    subject: "Invitation to Ivory Pay",
    html: `
      <p>You've been invited to Ivory Pay!</p>
      <p>Click the link below to accept the invitation:</p>
      <a href="http://yourdomain.com/accept/invite?id=${userId}&email=${email}">Accept Invitation</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Invite email sent successfully");
  } catch (error) {
    console.error("Error sending invite email:", error);
  }
};

module.exports = sendInviteEmail;
