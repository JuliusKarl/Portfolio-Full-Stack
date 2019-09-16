const router = require('express').Router();
const nodemailer = require('nodemailer');

router.route('/').get((req, res) => {
    res.send("gonna send email now");
});
router.route('/send').post((req, res, next) => {
    res.send('Mail Sent!');
    alert("Mail Sent!");
    // Nodemailer --> start
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    let mailOptions = {
        from: "juliuskarl24@gmail.com",
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.message,
    }

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log('Error occurs', err);
        }
        else {
            console.log('Email Sent!');
        }
    });
});

module.exports = router
