const fs = require("fs")

fs.writeFileSync("./Output/temp.txt", "This is a temp file");
console.log("Temp file created.")

if(fs.existsSync("./Output/temp.txt")){
    console.log("File exits.")

    fs.unlinkSync("./Output/temp.txt")
    console.log("File deleted.")
}