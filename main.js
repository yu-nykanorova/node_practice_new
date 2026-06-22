// console.log("Hello from Node.js");
//
// console.log(__dirname); // абсолютний шлях до директорії файлу
// console.log(__filename); // абсолютний шлях до файлу
//
// console.log(process.cwd()); // показує шлях, звідки запущено програму
//
// // require("./services/test");
// const { a, myFunc} = require("./services/test");
//
// myFunc();
// console.log(a);


// http

// const http = require("node:http");
// const assert = require("node:assert");
//
// const server = http.createServer(async (req, res) => {
//     res.writeHead(200, {"Content-Type": "application/json"});
//
//     if (req.url === "/cars") {
//         switch (req.method) {
//             case "GET":
//                 return res.end(JSON.stringify({
//                     data: "my cars"
//                 }));
//             case "POST":
//                 return res.end(JSON.stringify({
//                     data: "To create car"
//                 }))
//         }
//     }
// });
//
// server.listen(3000);


// path

// const path = require('node:path');
// const {myFunc} = require('./services/test');
//
// const filePath = path.join(process.cwd(), "services", "test.js");
//
// console.log(filePath);
//
// console.log(path.basename(filePath)); // остання частина шляху
// console.log(path.dirname(filePath)); // директорія шляху - все, окрім останньої частини
// console.log(path.extname(filePath)); // розширення файлу
// console.log(path.parse(filePath)); // об'єкт про шлях
// console.log(path.normalize(filePath)); // нормалізація шляху
// console.log(path.isAbsolute(filePath)); // чи абсолютний шлях


// readline

// const readLine = require("node:readline/promises");
//
// const start = async () => {
//     const rlInterface = readLine.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//
//     const name = await rlInterface.question("What is your name?");
//
//     console.log(`Hello, ${name}!`);
//     // rlInterface.close();
//     process.exit(0);
// };
//
// start();


// fs

const fs = require("node:fs/promises");
const fsNotPromise = require("node:fs");
const path = require("node:path");
const rl = require("node:readline/promises");

const start = async () => {
    // await fs.mkdir(path.join("storage", "files"), { recursive: true });
    const filePath = path.join("storage", "files", "myFile.txt");
    // await fs.writeFile(filePath, "Hello, my new file");
    // await fs.appendFile(filePath, "\nLet continue...");
    // const myFileText = await fs.readFile(filePath, "utf8");
    // console.log(myFileText);

    // await fs.rename(filePath, path.join(process.cwd(), "storage", "files", "myCopiedFile.txt"));

    // const filePathNew = path.join("storage", "files", "myCopiedFile.txt");

    // await fs.copyFile(filePathNew, path.join(path.dirname(filePathNew), "myFile.txt"));
    // await fs.rmdir(path.join(process.cwd(), 'storage', "files"), {recursive: true});
    // await fs.rm(path.join(process.cwd(), 'storage', "files", "myCopiedFile.txt"));
    // await fs.unlink("delete.txt");

    // читати окремі рядки
    // const filestream = fsNotPromise.createReadStream(filePath, "utf-8");
    // const fileStream = rl.createInterface({input: filestream});
    // try {
    //     for await (const line of fileStream) {
    //         await fs.appendFile(path.join("storage", "files", "myNewFile.txt"), `${line} - new\n`);
    //     }
    // } finally {
    //     await fileStream.close();
    // }

    // читати пдф, jpg...
    // const readStream = fsNotPromise.createReadStream("image.jpg");
    //
    // const writeStream = fsNotPromise.createWriteStream("newImage.jpg");
    // readStream.on("data", (chunk) => {
    //     writeStream.write(chunk);
    // })

    // або через pipe

    // readStream.pipe(writeStream);

    // os

    const os = require("node:os");

    console.log(os.arch());
    console.log("next");
    console.log(os.cpus);
    console.log("next");
    console.log(os.totalmem() / 1024 / 1024 / 1024);
    console.log("next");
    console.log(os.freemem() / 1024 / 1024 / 1024);
    console.log("next");
    console.log(os.homedir());
    console.log("next");
    console.log(os.hostname());
    console.log("next");
    console.log(os.release());
    console.log("next");
    console.log(os.tmpdir());
    console.log("next");
    console.log(os.type());
    console.log("next");
    console.log(os.uptime());
    console.log("next");
    console.log(os.userInfo());
    console.log("next");
    console.log(os.version());
    console.log("next");
    console.log(os.networkInterfaces());
    console.log("next");
    console.log(os.platform());

    // events

    const e = require("node:events");

    const eventEmitter = new e.EventEmitter();

    eventEmitter.on("error", () => {
        console.log("error");
    });

    eventEmitter.on("ok", () => {
        console.log("ok");
    });

    eventEmitter.emit("error");
    eventEmitter.emit("ok");

}

start();








