const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");


router.post('/sendmail', async (req, res) => {
    const Veg = req.body.Veg;
    const Nonveg = req.body.Nonveg;
    const Reason = req.body.Reason;
    const nemail = req.body.nemail;
    const remail = req.body.remail;
    const manager = req.body.manager;
    const name = req.body.name;

    const currentTime = new Date();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "donfunky595@gmail.com",
            pass: process.env.MailPass
        }
    });

    const mailOptions = {
        from: "donfunky595@gmail.com",
        to: nemail,
        subject: "Packet Add for Donation",
        text: `Dear ${name},\nRestaurent ${remail} Added ${Veg} Veg Packets and NonVeg ${Nonveg} Packets For donation at ${currentTime} due to ${Reason}. Please connect with the Restaurent and collect the food items for donation.\n\n\nThank You ,\nTeam PlateLinker`
    };
    

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: "Mail not send" });
        } else {
            // console.log("Email sent: " + info.response);
            return res.status(200).json({ success: true, message: "Mail send successfully" });
        }
    });

}),

router.post('/paymentmail', async (req, res) => {
    const veg = req.body.veg;
    const NonVeg = req.body.nonVeg;
    const Reason = req.body.message;
    const remail = req.body.remail;
    const uemail = req.body.uemail;
    const name = req.body.name;
    const vmeal = req.body.vmeal;
    const nmeal = req.body.nmeal;

    const currentTime = new Date();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "donfunky595@gmail.com",
            pass: process.env.MailPass
        }
    });

    const mailOptions = {
        from: "donfunky595@gmail.com",
        to: remail,
        cc: "vinayakshukla0786@gmail.com",
        subject: "Packet Add for Donation",
        text: `Dear ${name},\n User ${uemail} Added ${veg}  ${vmeal} Veg Packets and  ${NonVeg}  ${nmeal} NonVeg Packets For donation at ${currentTime} due to ${Reason}. Please connect with the Restaurent and collect the food items for donation.\n\n\nThank You ,\nTeam PlateLinker`
    };
    
    

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: "Mail not send" });
        } else {
            // console.log("Email sent: " + info.response);
            return res.status(200).json({ success: true, message: "Mail send successfully" });
        }
    });

})



module.exports = router;