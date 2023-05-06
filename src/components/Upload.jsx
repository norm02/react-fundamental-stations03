import React from "react";
import Compressor from "compressorjs";

export const Upload = () => {
  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.8,
      success: (compressedResult) => {
        console.log("compressedResult", compressedResult);
      },
    });
  };

  return (
    <input
      accept="image/*"
      type="file"
      onChange={(e) => handleCompressedUpload(e)}
    />
  );
};
