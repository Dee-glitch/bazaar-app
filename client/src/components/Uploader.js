import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Uploader = ({ data }) => {
  const history = useHistory();

  const [selectedFiles, setSelectedFiles] = useState(null);

  const toProductPage = (id) => {
    history.push(`/${id}`);
    document.getElementById('add-product-link').style.display = 'block';
  };

  const handleClick = async () => {
    const isFilled = Object.keys(data).every((key) => data[key]);
    try {
      if (!selectedFiles || !isFilled) return;

      const videoRequests = [];
      const imageRequests = [];

      for (const file of selectedFiles) {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('folder', process.env.REACT_APP_UPLOAD_FOLDER);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

        const [type] = file.type.split('/');
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}`;

        if (type === 'video') videoRequests.push(axios.post(`${url}/video/upload`, formData));
        if (type === 'image') imageRequests.push(axios.post(`${url}/image/upload`, formData));
      }

      const videoResponses = await axios.all(videoRequests);
      const imageResponses = await axios.all(imageRequests);

      data.videos = videoResponses.map((response) => response.data.secure_url);
      data.images = imageResponses.map((response) => response.data.secure_url);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/products/create`, data);
      const { id } = response.data;

      if (id) toProductPage(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form.File
        required
        multiple
        type="file"
        accept="image/*, video/*"
        onChange={(e) => setSelectedFiles(e.target.files)}
      />
      <br />

      <Button
        type="submit"
        className="w-100"
        onClick={handleClick}
        style={{ background: 'var(--color-main)' }}
      >
        Add Product
      </Button>
    </>
  );
};

export default Uploader;
