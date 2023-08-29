const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, phone, appointmentDetails } = req.body;

    // Send SMS using Twilio
    const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    twilio.messages.create({
        to: phone,
        from: TWILIO_PHONE_NUMBER,
        body: `Hello ${name}, your appointment details: ${appointmentDetails}`,
    });

    // Send email using Nodemailer
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'your-email-service-provider',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'developer@example.com',
        subject: 'Appointment Confirmation',
        text: `Appointment details: ${appointmentDetails}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    // Respond to the user
    res.send('Thank you! Your request has been received.');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
