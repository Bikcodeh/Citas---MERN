import nodemailer from 'nodemailer';

export const sendRegisterEmail = async (email: string, user: string, token: string) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });
  await transport.sendMail({
    from: 'Uptask Admin <uptask@gmail.com>',
    to: email,
    subject: 'Uptask - Confirm your account',
    text: 'Confirm your account in Uptask',
    html: `<p>Hi ${user} confirm your account in Uptask</p>
        <p>Your account it's almost done! The only on you need to do is confirm it in the next link</p>
        
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Account</a>`
  })
}

export const sendForgotPasswordEmail = async (email: string, user: string, token: string) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });
  await transport.sendMail({
    from: 'Uptask Admin <uptask@gmail.com>',
    to: email,
    subject: 'Uptask - Confirm your account',
    text: 'Reset your password',
    html: `<p>Hi ${user}, you requested to change your password</p>
        <p>Follow the next link to reset your password</p>
        
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reset password</a>`
  })
}