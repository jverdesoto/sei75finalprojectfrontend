import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Upload = () => {
  const [imageTitle, setImageTitle] = useState('')
  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    setImageTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const myFile = e.target.files[0] 
    const blob = myFile.slice(0, myFile.size);
    const fileExt = myFile.name.split('.').pop();
    const newFile = new File([blob], `${uuidv4()}.${fileExt}`, { type: `${myFile.type}` });
    setImage(newFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    const body = {
      title: imageTitle,
      document: image
    }

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_photo/`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Title"
            id="title"
            value={imageTitle}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
          />
        </p>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Upload;
