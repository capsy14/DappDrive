import React, { useState } from "react";
import "./fileUpload.css"
import axios from "axios";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: "587f1d581b13a54db68f",
          pinata_secret_api_key: "077d9cba66f263642a247b507c937755635207ecbfc7c2e8061de9a8f682c7a3",
          "Content-Type": "multipart/form-data",
        },
      });

      const imgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      contract.add(account, imgHash);

      alert("Image uploaded successfully.");
      setFileName("No image selected");
      setFile(null);
    } catch (error) {
      if (error.response) {
        console.log("Server responded with:", error.response.data);
        console.log("Status code:", error.response.status);
      }
      alert("Unable to upload image to Pinata. Please try again later.");
    }
  };

  const retrieveFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  return (
    <div className="top-container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          className="chooseimg"
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="Imagesall">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;

