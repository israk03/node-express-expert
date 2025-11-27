const fs = require("fs")

// sync

fs.writeFileSync("./Output/temp.txt", "This is a temp file");
console.log("Temp file created.")

if(fs.existsSync("./Output/temp.txt")){
    console.log("File exits.")

    fs.unlinkSync("./Output/temp.txt")
    console.log("File deleted.")
}


// async

fs.writeFile("./Output/temp2.txt", "This is a temp 2 file.", (err)=>{
    if(err){
        console.log(err.message)
    }
    console.log("Another file created.")

    fs.unlink("./Output/temp2.txt", (err)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log("File 2 deleted")
        }

    })
})