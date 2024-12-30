import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostList from './components/PostList';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import Model from './components/Model';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost, fetchAllPosts, searchPost } from './redux/postSlice';
import Form from 'react-bootstrap/Form';

function App() {
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatcher = useDispatch();

  const addPost = (post) => {
    addNewPost(dispatcher, post);
  }


  const handleSearchOnChange = (e) => {
    let txt = e.target.value;
    if (txt.trim()) {
      setSearchText(txt);
    }
    else {
      setSearchText("");
      fetchAllPosts(dispatcher);
    }
  }


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim().length != 0) {
      searchPost(dispatcher, searchText);
      setSearchText(searchText);
    }
    else if (searchText.trim().length == 0) {
      fetchAllPosts(dispatcher);
      setSearchText("");
    }
  }

  return (
    <>
      <Container className='bg-light'>
        <Row>
          <Col>
            <Container >
              <Form onSubmit={(e) => handleSearch(e)} className='d-flex justify-content-center p-3 gap-2 '>
                <input type="text" value={searchText} onChange={(e) => handleSearchOnChange(e)} placeholder='Search by title' className='w-75 rounded' />
                <Button type='submit'>
                  <FontAwesomeIcon icon={faSearch} className="icon" />
                </Button>

                <Button onClick={handleShow} >
                  <FontAwesomeIcon icon={faPlus} className="icon" />
                  <span className='px-2'>Add Post</span>
                </Button>
              </Form>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container style={{ backgroundColor: "#FFFFFF" }} className='rounded'>
              <Row>
                <PostList />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container >

      {show && <Model
        show={show}
        modalTitle={"Add a Post"}
        handleClose={handleClose}
        handleSubmit={addPost}
        userId=""
        title=""
        description=""
      ></Model>
      }
    </>
  );
}

export default App