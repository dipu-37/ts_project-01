import { rejects } from "assert";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import multer from "multer";
import fs from 'fs';

cloudinary.config({
  cloud_name: "dawiaujoz",
  api_key: "761748791784373",
  api_secret: "XXAFX6pUvblnfPdSlwpk_e5Mn0Q", //api key
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>>=> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);
      // delete a file asynchronously
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File is deleted.');
        }
      });
      },
    );
  });
};



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
