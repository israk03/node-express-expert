const fs = require("fs")

console.log("Start reading....")

try{
    
    const data = fs.readFileSync('../data/diary.txt', "utf-8")
    console.log("File content: ")
    console.log(data)

}catch(err){
    console.error(err.message)
}

console.log("Finished")

