const nodemailer = require("nodemailer");

async function sendMail(emailAddress, password, userName) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USERNAME,
    to: emailAddress,
    subject: "Your Account Credentials",
    html: `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Email Credentials</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    
        .header {
          background-color: #007bff;
          color: #ffffff;
          padding: 10px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
    
        .content {
          padding: 20px;
          text-align: center;
        }
    
        .credentials {
          font-size: 18px;
          font-weight: bold;
          color: #007bff;
          margin: 20px 0;
          padding: 10px;
          border: 1px dashed #007bff;
          display: inline-block;
          border-radius: 5px;
          background-color: #f0f8ff;
        }
    
        .footer {
          text-align: center;
          color: #777777;
          font-size: 12px;
          margin-top: 20px;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <div class="header">
          <h1>Your Account Credentials</h1>
        </div>
        <div class="content">
          <p>Thank you for registering with us. Below are your credentials:</p>
          <div class="credentials">
            <p><strong>Username:</strong> ${userName}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 EduPortal. All rights reserved.</p>
        </div>
      </div>
    </body>
    
    </html>
    `,
  };

  await transporter
    .sendMail(mailOptions)
    .then(() => console.log("Email sent successfully"))
    .catch((err) => {
      console.log(`Error while sending email: ${err.message}`);
    });
}
module.exports = sendMail;
