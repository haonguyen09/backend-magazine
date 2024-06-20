const nodemailer = require("nodemailer");
const dotenv = require('dotenv')

dotenv.config()

const sendEmailCreateOrder = async () => {

    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSwORD,
    },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'haonguyen09450@gmail.com', // sender address
        to: "haonguyen09450@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}

module.exports = {
    sendEmailCreateOrder
}