const fs = require('fs')
const logPath = './log/log.txt'
const create_log = (message) => {
  try {
    console.log(fs.existsSync(logPath))
    console.log(fs.readFileSync(logPath))
    let textFile = fs.readFileSync(logPath, 'utf-8')
    console.log(textFile)
    textFile += `\n${message}`
    console.log(textFile)
    fs.writeFileSync(logPath, textFile, 'utf-8')
    return true
  } catch (e) {
    console.log(e)
  }
}
module.exports = create_log