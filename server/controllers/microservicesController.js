const asyncHandler = require("express-async-handler");

// const fs = require('fs');
const fs = require("node:fs");

// Create ----------------------
const getRoundedNumber = (req, res) => {
  const content = "56753.09123";
  fs.writeFileSync(
    "C:/Users/astei/OneDrive/Desktop/Current Projects/budget-app/server/pipline.txt",
    content,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
    );
  console.log("file written!")


const callRoundingService = async () => {
    const response = await fetch('http://127.0.0.1:8080', {
    method: 'get'
  });
  const responseJSON= await response.json();
  console.log("response json", responseJSON)
  res.json(responseJSON);
}

callRoundingService();
}
// let alreadySent = false;
// let counter = 0

// fs.watch("C:/Users/astei/OneDrive/Desktop/Current Projects/budget-app/server/pipline.txt", (eventType, filename) => { 
//     console.log("The file", filename, "was modified!"); 
//     console.log("The type of change was:", eventType); 
//     if (eventType === "change") {
//         counter += 1;
//         console.log("this is happening: ", eventType, "this many times", counter, alreadySent);
//         if (alreadySent == false) {
//             fs.readFile(
//                 "C:/Users/astei/OneDrive/Desktop/Current Projects/budget-app/server/pipline.txt",
//                 "utf8",
//                 (err, data) => {
//                     if (err) {
//                         console.error(err);
//                         return;
//                     }
//                     alreadySent = true;
//                     console.log("should be true", alreadySent);
//                     res.send(data);
//                 }
//                 )}
//             }
//   });
// };

module.exports = { getRoundedNumber };
