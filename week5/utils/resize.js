'use strict';
const sharp = require('sharp');

const makeThumbnail = async (path, thumbname) => { // file = full path to image (req.file.path), thumbname = filename (req.file.filename)
  // TODO: use sharp to create a png thumbnail of 160x160px, use async await
  const newName = thumbname
console.log("making thumbnail")
let buffer = await sharp(path)
    .resize(160, 160)
    .png()
    .toBuffer();
    return sharp(buffer).toFile(path);

  return newName
};

module.exports = {
  makeThumbnail,
};