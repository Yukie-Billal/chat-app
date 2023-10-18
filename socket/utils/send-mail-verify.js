const generateOTP = require("./generate-otp");
const {createEmailVerify} = require("../models/email-verify");
const sendMailVerify = async (req, email) => {
  const OTP = generateOTP()
  const emailVerify = await createEmailVerify(email, OTP, req.ip, new Date())
  const mailPayload = {to: `${email}`, subject: 'Email verification' + `To: ${email}`, otp: OTP}
  await sendRequest({
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(mailPayload)
  })
  return {emailVerify}
}

async function sendRequest(option) {
  await fetch('http://192.168.18.90:5000/mails/send-verify', option)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => {
        console.log("Err dimana fetch:", err)
      })
}

module.exports = sendMailVerify