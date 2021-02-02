const sgMail = require('@sendgrid/mail')

const sgAPIKey = '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'

sgMail.setApiKey(sgAPIKey)

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