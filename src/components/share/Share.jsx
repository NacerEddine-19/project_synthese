import { useRef, useState } from 'react';
import "./share.css";
import { PermMedia } from "@material-ui/icons"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function Share() {
  const [file, setFile] = useState();
  const filePickerRef = useRef(null);

  const handleFilePickerClick = () => {
    filePickerRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      e.target.value = '';
    }
    console.log(file);
  };

  const handleCloseImage = (e) => {
    setFile();
  }
  console.log(file);

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    fetch('https://localhost:3000/post', {
      method: 'POST',
      body: file,
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <div>
            <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
            <input
              placeholder="What's in your mind Safak?"
              className="shareInput"
            />
          </div>
          {file && (
            <div className="shareImageContainer">
              <img className="shareImage" src={URL.createObjectURL(file)} alt="selected-file" />
              <button className="removeFileButton" onClick={handleCloseImage}><CloseRoundedIcon style={{ fontWeight: 900 }} /></button>
            </div>
          )}
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption" onClick={handleFilePickerClick}>
              <PermMedia htmlColor="tomato" className="shareIcon box" />
              <input
                ref={filePickerRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                style={{ display: "none" }} />
              <span className="shareOptionText">Photo or Video</span>
            </div>
          </div>
          <button className="shareButton" onClick={handleUploadClick}>Share</button>
        </div>
      </div>
    </div>
  );
}
