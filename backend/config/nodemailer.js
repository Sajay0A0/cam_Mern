const nodemailer=require ('nodemailer')
const transporter= nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'clickapick001@gmail.com',
        pass:'naff lnwf xrlv ufuh'
    },
});

module.exports=transporter