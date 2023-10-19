const generateOtp = () => {
  let OTP = ''
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 12; i++) {
    OTP += str[Math.floor(Math.random() * str.length)]
  }
  return OTP
}
module.exports = generateOtp