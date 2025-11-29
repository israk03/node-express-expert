const crypto = require("crypto");

const userInput = process.argv[2];

if(!userInput){
    console.log("Provide a text to hash...")
    process.exit(1);
}

// creating SHA256 hash
const hash = crypto.createHash("sha256").update(userInput).digest("hex")

console.log("\nYour input: ", userInput);
console.log("SHA-256 Hash: ", hash, "\n")

// creating SHA512 hash
const hash512 = crypto.createHash("sha512").update("israk03").digest("hex")

console.log("\nYour input: israk03");
console.log("SHA-256 Hash: ", hash512, "\n")

// creating MD5 hash
const md5 = crypto.createHash("md5").update("jjdh").digest("hex")

console.log("\nYour input: jjdh");
console.log("M5 Hash: ", md5, "\n")