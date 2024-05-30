const transporter = require("../config/nodemailer");
const Email=require('../model/mailDetails')
const createEmail =async (req,res)=>{
    const {to,subject,text}=req.body;
    try {
        await transporter.sendMail({
            from:'clickapick001@gmail.com',
            to,
            subject,
            text,
        });
        const newEmail =new Email({to,subject,text});
        await newEmail.save()

        res.status(200).send('Email sent successfully');
    } catch (error) {
       res.status(500).send(`'Error sending email:${error.message}'`) 
    }
};

module.exports={
createEmail
}