const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'syed1234@hotmail.co.uk',
    subject: 'Welcome',
    text: `Welcome ${name}`
  })
}

const sendDeleteEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'syed1234@hotmail.co.uk',
    subject: 'Goodbye',
    text: `Goodbye ${name}`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendDeleteEmail
}