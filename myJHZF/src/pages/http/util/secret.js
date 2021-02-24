 const CryptoJS = require('crypto-js');  //引用AES源码js

 var key = CryptoJS.enc.Utf8.parse("abghdjsuhgthjiyu");
        //加密
        function Encrypt(word){
            var encryptedData = CryptoJS.AES.encrypt(word, key, {
                mode: CryptoJS.mode.ECB,
                // padding: CryptoJS.pad.Pkcs7
            });
            encryptedData = encryptedData.ciphertext.toString();
            var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedData);
            return CryptoJS.enc.Base64.stringify(encryptedHexStr);
        }


        //解密
        function Decrypt(word){
            var decryptedData = CryptoJS.AES.decrypt(word, key, {
                mode: CryptoJS.mode.ECB,
                // padding: CryptoJS.pad.Pkcs7
            });
          return decryptedData.toString(CryptoJS.enc.Utf8);
        }
export {
    Decrypt ,
    Encrypt
}
