import AWS from "aws-sdk";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config";

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const access_key = config.ncp.accessKey;
const secret_key = config.ncp.secretKey;


const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId : access_key,
        secretAccessKey: secret_key
    }
});

const uploader = (type) => {
  let bucket_name = 'team2/posts';
  if (type === "user") bucket_name = 'team2/users';

  const upload = multer({
    storage: multerS3({
      s3: S3,
      bucket: bucket_name,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname))
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  })
  return upload.array('filename');
}

const deleteImg = async (req, res, next) => {
  let objectKey = null;
  if (req.body.prevImage) {
    objectKey = req.body.prevImage.split("/").slice(-2).join("/");
  } 

  if (req.path.split("/")[3] === "removeImage") {
    objectKey = req.path.split("/")[1] + "/" + req.body.key;
  }

  if (objectKey?.indexOf("default") !== -1) {
    objectKey = null;
  }
  
  if (objectKey !== null) {
    console.log("이전파일명", objectKey) 
    S3.deleteObject({
      Bucket : 'team2',
      Key: objectKey,
    }, function(err, data){
      if (err) console.log(err);
      console.log(data);
    });
  }
  next();
}

export { uploader, deleteImg };