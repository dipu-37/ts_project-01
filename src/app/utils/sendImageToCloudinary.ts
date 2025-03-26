import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

export const sendImageToCloudinary = async() => {
  cloudinary.config({
    cloud_name: "dawiaujoz",
    api_key: "761748791784373",
    api_secret: "XXAFX6pUvblnfPdSlwpk_e5Mn0Q", // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult =await cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes",
      }
    )
    .catch((error: any) => {
      console.log(error);
    });

  console.log(uploadResult);
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd()+'/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
 export const upload = multer({ storage: storage })