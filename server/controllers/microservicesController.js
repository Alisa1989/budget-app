// const asyncHandler = require("express-async-handler");

// // const fs = require('fs');
// const fs = require("node:fs");

// // Create ----------------------
// const getRoundedNumber = (req, res) => {
//   const content = "56753.09123";
//   fs.writeFileSync(
//     "C:/Users/astei/OneDrive/Desktop/Current Projects/budget-app/server/pipline.txt",
//     content,
//     (err) => {
//       if (err) {
//         console.error(err);
//       }
//     }
//     );
//   console.log("file written!")


// const callRoundingService = async () => {
//     const response = await fetch('http://127.0.0.1:8080', {
//     method: 'get'
//   });
//   const responseJSON= await response.json();
//   console.log("response json", responseJSON)
//   res.json(responseJSON);
// }

// callRoundingService();
// }

// module.exports = { getRoundedNumber };
