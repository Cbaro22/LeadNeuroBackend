import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
 

export const mailTransporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
                
            }
        })

mailTransporter.verify()
    .then(() => {
    })
    .catch((err) => {
        console.error("SMTP Error:", err);
    });

export  const registerationEmail =async (email) => {
    try {
        await mailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to our platform",
            html:`<h1>Welcome to our platform. You have successfully registered!</h1>`
        }) 
    } catch (error) {
        console.error("Error sending registration email:", error);
    }
       
    }

export const loginEmail = async (email) => {
    try {
        await mailTransporter.sendMail({ 
            from: process.env.EMAIL,
            to: email,
            subject: "Login Notification",
            html:`<h1>You have successfully logged in to your account!</h1>`
        })
    } catch (error) {
        console.error("Error sending login email:", error);
    }
}

    export const forgotPasswordEmail = async (email, resetToken) => {
    
        await mailTransporter.sendMail({
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Password Reset Request",
                    html:`<h1>You have requested to reset your password. Please click the link below to reset your password:</h1><p><a href="http://yourdomain.com/reset-password/${resetToken}">Reset Password</a></p>`
                })
    }

    export const resetPasswordEmail = async (email) => {
        try{
             await mailTransporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset Successful",
            html: `<h1>Your password has been reset successfully!</h1>`
        })
        } catch (error) {
            console.error("Error sending reset password email:", error);
        }
       
    }

    export const deleteAccountEmail = async (email) => {
        
        await mailTransporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Account Deletion Confirmation",
            html: `<h1>Your account has been deleted.</h1>`
        })
    }