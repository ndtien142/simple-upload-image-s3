const AWS = require("aws-sdk");
const fs = require("fs");
const { uuid } = require("uuidv4");
require("dotenv").config();

// import env
const KEY_ID = process.env.KEY_ID || "";
const SECRET_KEY = process.env.SECRET_KEY || "";
const BUCKET_NAME = process.env.BUCKET_NAME || "";

const s3 = new AWS.S3({
  accessKeyId: KEY_ID,
  secretAccessKey: SECRET_KEY,
});

// const params = {
//   Bucket: BUCKET_NAME,
// };

// s3.createBucket(params, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Bucket Created Successfully", data.Location);
//   }
// });

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName);
  const fileExtension = fileName.split(".").pop();
  const key = `${uuid()}.${fileExtension}`;
  const contentType = `image/${fileExtension}`.toUpperCase();

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File Uploaded Successfully", data.Location);
    }
  });
};

uploadFile("h1.JPG");
