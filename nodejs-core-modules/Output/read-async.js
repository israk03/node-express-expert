const fs = require("fs")

console.log("Start reading......")

fs.readFile("../data/diary.txt", "utf-8", (error, data)=>{
    if(error){
        console.error(error.message)
    }
    console.log("File content: ")
    console.log(data);
})

console.log("Finished...(This runs immediately - no blocking)")