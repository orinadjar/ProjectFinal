import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed) {
        setKeyword('');
        navigate(`/search/${trimmed}`);
    } else {
        navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <FormControl
        type="search"
        placeholder="Search products..."
        className="me-2"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type="submit" variant="outline-success" className='btn-search'>
        <FaSearch />  Search
      </Button>
    </Form>
  );
};

export default SearchBox;
