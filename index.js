const node = require('./server/server').serv()
const path = require("path");
const port = process.env.PORT === undefined ? 5000 : process.env.PORT;
process.env.API = "http://localhost:"+port
node.start(port,path.resolve(__dirname));

module.exports = node
