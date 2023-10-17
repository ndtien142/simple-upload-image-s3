const AWS = require("aws-sdk");
const KEY_ID = "AKIAZNZFAPIDOFKSGXQX";
const SECRET_KEY = "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";
const fs = require("fs");
const BUCKET_NAME = "iot-bucket-documentation";

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

  const params = {
    Bucket: BUCKET_NAME,
    Key: "photo.jpg",
    Body: fileContent,
    ContentType: "image/JPG",
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
