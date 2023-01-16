import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./Upload.css";

const fileTypes = ["JPG", "PNG", "GIF"];

const Upload = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div>
      <div className="header">อัปโหลดไฟล์</div>
      <hr />

      <div
        className="text-center"
        style={{ marginLeft: "340px", marginTop: "40px" }}
      >
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
    </div>
  );
};

export default Upload;
