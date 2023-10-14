const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON and URL-encoded body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a basic route for sending emails
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter using your email service (e.g., Gmail)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com', // Your Gmail email address
      pass: 'your-password', // Your Gmail password or an app-specific password
    },
  });

  // Email content
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com', // Recipient's email address
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});