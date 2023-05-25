import { useRef, useState } from 'react';
import "./share.css";
import { PermMedia } from "@material-ui/icons"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { getUser } from '../../utils/helper';
import request from '../../utils/request';

export default function Share({ onPostAdded }) {
  const API = process.env.REACT_APP_SERVER_API;
  const [file, setFile] = useState();
  const [desc, setDesc] = useState("");
  const [user] = useState(getUser());
  const filePickerRef = useRef(null);

  const resetForm = () => {
    setFile(null);
    setDesc("");

  }

  const handleFilePickerClick = () => {
    filePickerRef.current.click();

  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file.name);
      e.target.value = '';
    }
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value)
  };

  const handleCloseImage = (e) => {
    setFile();
  }

  const handleUploadClick = () => {
    if (!desc || !user.id) {
      return;
    }
    request
      .post(`${API}/posts`, {

        file: file ? file : null,
        post_desc: desc,
        user_id: user.id,

      })
      .then((response) => {
        onPostAdded(response.data);
      })
      .catch((error) => {
        console.error(error);
      }).finally(resetForm());
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <div>
            <img className="shareProfileImg" src={user.pdp} alt="" />
            <input
              placeholder="What's in your mind Safak?"
              onChange={handleDescChange}
              value={desc}
              className="shareInput"
            />
          </div>
          {file && (
            <div className="shareImageContainer">
              <img className="shareImage" src={`assets/post/${file}`} alt="selected-file" />
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
                className='share-input'
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
