const fs = require("fs")

fs.writeFileSync("./Output/app.log", "Application started!\n")
console.log("File created.")

const logEntry1 = `${new Date().toISOString()} user logged in. \n`
fs.appendFileSync("./Output/app.log", logEntry1)
console.log("User logged...")

const logEntry2 = `${new Date().toISOString()} user fetched data.\n`
fs.appendFileSync("./Output/app.log", logEntry2)
console.log("Task completed...")