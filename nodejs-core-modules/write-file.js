const fs = require("fs")

const content1 = "This is content no 1 for sync"

try{
    fs.writeFileSync("./Output/test-sync1.txt", content1)
}catch(error){
    console.error(error.message)
}



const content2 = "This is content no 2 for async"

fs.writeFile("../Output/test-async.txt", content2, (error)=> {
    if(error){
        console.error(error.message);
    }else{
        console.log("Written file...")
    }
})
