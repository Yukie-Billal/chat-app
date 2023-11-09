import generateOtp from "./generate-otp.js";
import emailVerify from "../models/email-verify.js"
import axios from "axios";

export const sendMailVerify = async (req, email) => {
  console.log('\nIni adalah endpoint kirim email\n')
  const OTP = generateOtp()
  const resutlEmailVerify = await emailVerify.createEmailVerify(email, OTP, req.ip, new Date())
  const mailPayload = {to: `${email}`, subject: 'Email verification' + `To: ${email}`, otp: OTP}
  sendRequest({
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  }, JSON.stringify(mailPayload))
  return {resutlEmailVerify}
}

function sendRequest(option, data) {
  axios.post('http://localhost:5000/mails/send-verify', data).then(res=>console.log(res)).catch(e=>console.log('\nError\n', e.message))
  // fetch(, option)
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(err => {
  //       console.log("Err dimana fetch:", err)
  //     })
}