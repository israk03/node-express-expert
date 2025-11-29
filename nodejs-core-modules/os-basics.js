const os = require("os");

console.log("System info");
console.log("-".repeat(50));

console.log("Platform: ", os.platform());
console.log("Architechture: ", os.arch());
console.log("OS type: ", os.type());
console.log("OS release: ", os.release());
console.log("Hostname: ", os.hostname());

console.log("-".repeat(50));

console.log("CPU info \n")

const cpus = os.cpus();
console.log("CPU Model: ", cpus[0].model)
console.log("Number of cores: ", cpus.length);
console.log("CPU Speed: ", cpus[0].speed)

console.log("-".repeat(50));

console.log("Memory info \n")
const totalMem = os.totalmem();
const freeMem = os.freemem();
console.log("Total memory: ", (totalMem/1024/1024/1024).toFixed(2), "GB")
console.log("Free memory: ", (freeMem/1024/1024/1024).toFixed(2), "GB")
