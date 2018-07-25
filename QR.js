var QRCode = require('qrcode')
 
QRCode.toDataURL('Hello This is test', function (err, url) {
  console.log(url)
})