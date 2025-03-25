import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html : string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: "gmdipu141@gmail.com",
      pass: "ouyu asfw qyew foxv",  // app password
    },
  });


      await transporter.sendMail({
      from: 'gmdipu141@gmail.com', // sender address
      to, // receiver 
      subject: "Reset your password within 10m", 
      text: " ", 
      html, 
    });

};
