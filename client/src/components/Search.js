import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ margin: '5px auto' }}>
      <InputGroup className="mb-3" style={{ width: '50%', margin: '0 auto' }}>
        <FormControl
          aria-describedby="basic-addon2"
          placeholder="search products"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          type="submit"
          style={{ background: 'var(--color-main)', color: 'white' }}
        >
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search;
