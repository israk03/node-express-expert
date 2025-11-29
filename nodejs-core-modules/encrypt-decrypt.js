const crypto = require("crypto");

// algorithm
const algorithm = "aes-256-cbc";

// 32 bytes key 
const key = crypto.randomBytes(32);

// 16 bytes for IV
const iv = crypto.randomBytes(16);


// encrypt function
function encrypt(text){
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
}

// decrypt function
function decrypt(encryptedText){
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
}



const message = "This is a secret message.";
console.log("Original: ", message);

const encryptMsg = encrypt(message);
console.log("Encrypted: ", encryptMsg);

const decryptMsg = decrypt(encryptMsg);
console.log("Decrypted: ", decryptMsg);