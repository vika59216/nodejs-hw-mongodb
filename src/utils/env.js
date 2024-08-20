import dotenv from "dotenv";
/*import { v2 as cloudinary } from 'cloudinary';*/

dotenv.config();

export function env(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${cloud_name}'].`);
}

/*const cloudName = process.env.CLOUD_NAME;

console.log(`Your cloud name is: ${cloudName}`);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});*/