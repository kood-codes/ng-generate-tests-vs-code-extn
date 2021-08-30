const fs = require("fs-extra");
const path = 'dist/extension.js';
let extension = fs.readFileSync(path, 'utf-8');
extension = extension.replace('e+"/templates/"', '__dirname+"/templates/"');
fs.writeFileSync(path, extension);

console.log("Replaced data");