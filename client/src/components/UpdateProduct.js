import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Card, Container, Button } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';

const UpdateProduct = () => {
  const history = useHistory();
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [values, setValues] = useState({
    price: '',
    title: '',
    condition: '',
    categories: [],
    description: '',
  });

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/${id}`,
      );
      setValues(response.data);
    } catch (error) {
      setError(true);
      console.log('error:', error);
    }
  }

  async function fetchCategories() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/categories`,
      );

      const categoryList = res.data.map((category) => category.name);

      setCategoriesList(categoryList);
    } catch (error) {
      console.log(error);
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const videoRequests = [];
      const imageRequests = [];

      if (selectedFiles !== null) {
        for (const file of selectedFiles) {
          const formData = new FormData();

          formData.append('file', file);
          formData.append('folder', process.env.REACT_APP_UPLOAD_FOLDER);
          formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

          const [type] = file.type.split('/');
          const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}`;

          if (type === 'video')
            videoRequests.push(axios.post(`${url}/video/upload`, formData));
          if (type === 'image')
            imageRequests.push(axios.post(`${url}/image/upload`, formData));
        }

        const videoResponses = await axios.all(videoRequests);
        const imageResponses = await axios.all(imageRequests);

        values.videos = videoResponses.map(
          (response) => response.data.secure_url,
        );
        values.images = imageResponses.map(
          (response) => response.data.secure_url,
        );
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/products/update/${values._id}`,
        values,
      );

      if (response.status === 200) {
        alert('Product Updated');
        history.push('/account');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center "
      style={{ minHeight: '75vh' }}
    >
      <div>
        <Card style={{ width: '22rem' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Update Product</Card.Title>
            <Form onSubmit={(e) => e.preventDefault}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={(e) => {
                    setValues({ ...values, title: e.target.value });
                  }}
                />
              </Form.Group>
              <br />

              <Form.Group>
                <Form.Control
                  min="0"
                  required
                  step="any"
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={(e) => {
                    setValues({ ...values, price: Number(e.target.value) });
                  }}
                />
              </Form.Group>
              <br />

              <Form.Check
                label="New"
                type="radio"
                name="condition"
                checked={values.condition === 'new'}
                onChange={() => {
                  setValues({ ...values, condition: 'new' });
                }}
              />

              <Form.Check
                type="radio"
                label="Like new"
                name="condition"
                checked={values.condition === 'like new'}
                onChange={() => {
                  setValues({ ...values, condition: 'like new' });
                }}
              />

              <Form.Check
                type="radio"
                name="condition"
                label="Fairly used"
                checked={values.condition === 'fairly used'}
                onChange={() => {
                  setValues({ ...values, condition: 'fairly used' });
                }}
              />
              <br />

              <Form.Group>
                <Form.Control
                  type="text"
                  as="textarea"
                  name="description"
                  style={{ height: '100px' }}
                  value={values.description}
                  onChange={(e) => {
                    setValues({ ...values, description: e.target.value });
                  }}
                />
              </Form.Group>
              {values.categories.length !== 0 && (
                <Multiselect
                  isObject={false}
                  options={categoriesList}
                  placeholder="Categories"
                  avoidHighlightFirstOption={true}
                  selectedValues={values.categories.map(
                    (category) => category.name,
                  )}
                  onSelect={(selected) => {
                    values.categories = selected;
                  }}
                  style={{
                    chips: { background: 'var(--color-main)' },
                    optionContainer: {
                      borderRadius: '.5rem',
                    },
                  }}
                />
              )}

              <Form.File
                multiple
                type="file"
                accept="image/*, video/*"
                onChange={(e) => setSelectedFiles(e.target.files)}
              />
              <Button
                style={{ background: 'var(--color-main)', color: 'white' }}
                onClick={(e) => onSubmit(e)}
                type="submit"
              >
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default UpdateProduct;
