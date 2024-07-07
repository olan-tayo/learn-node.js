import fs from "fs/promises";

// readfile
// fs.readFile("./text.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// const data = fs.readFileSync("./text.txt", "utf8");
// console.log(data);

//readfile() - Promise.then()
// fs.readFile("./text.txt", "utf8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

//readfile() - async/await
const readFile = async () => {
  try {
    const data = await fs.readFile("./text.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//writefile() - async/await
const writeFile = async () => {
  try {
    await fs.writeFile("./text.txt", "hello, i am writing to this file ");
    console.log("I am written to");
  } catch (error) {
    console.log(error);
  }
};

//appendFile() - async/await
const appendFile = async () => {
  try {
    await fs.appendFile("./text.txt", "\nThis is an appended text");
    console.log("File appeneded to");
  } catch (error) {
    console.log(error);
  }
};

writeFile();
appendFile();
readFile();
