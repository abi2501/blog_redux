import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { getAllUsers } from '../redux/postSlice';
import { useDispatch, useSelector } from 'react-redux';

function PostForm({ usrId = "", title = "", description = "", handleClose, handleSubmit, btnLable }) {
    const [postTitle, setPostTitle] = useState(title);
    const [postDescription, setPostDescription] = useState(description);
    const [userId, setUserId] = useState(usrId);
    const [enable, setEnable] = useState(false);

    const userList = useSelector(getAllUsers);
    const userSelect = userList.map((user, idx) => <option key={idx} value={user.id}>{user.username}</option>);

    const handleTitleChange = (e) => {
        let titletxt = e.target.value;
        if (titletxt) {
            setPostTitle(e.target.value);
        }
        enableSubmit();
    }

    const handleDesChange = (e) => {
        let desc = e.target.value;

        if (desc) {
            setPostDescription(desc)
        }
        enableSubmit();
    }

    const handleUserList = (e) => {
        let usr = e.target.value;
        if (usr) {
            setUserId(usr);
        }
        enableSubmit();
    }

    const enableSubmit = () => {
        if (postTitle && postDescription && userId) {
            setEnable(true);
        }
        else {
            setEnable(false);
        }
    }
    const handlePostSubmit = (e) => {
        e.preventDefault();

        const post = {
            userId: parseInt(userId),
            title: postTitle,
            body: postDescription
        }
        handleSubmit(post);
        setPostTitle('');
        setPostDescription('');
        setUserId('');
        setEnable(false);
        handleClose();
    }

    return (
        <Form className='justify-content-center px-5 gap-3' onSubmit={(e) => handlePostSubmit(e)}>
            <Row className="mb-3">
                <Form.Group as={Row} className='mb-2'>
                    <Form.Select value={userId} onChange={(e) => handleUserList(e)}>
                        <option value="">Choose...</option>
                        {userSelect}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Row} controlId="" className='mb-2'>
                    <Form.Control type="title" onChange={(e) => handleTitleChange(e)} placeholder="Title" value={postTitle} />
                </Form.Group>
                <Form.Group as={Row} controlId="" className='mb-2'>
                    <Form.Control rows={5} as="textarea" placeholder="Description" onChange={(e) => handleDesChange(e)} value={postDescription} />
                </Form.Group>
                <Form.Group as={Row} className='mb-2' >
                    <Button variant="primary" disabled={!enable} type="submit" onClick={handlePostSubmit}>
                        {btnLable}
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    )
}

export default PostForm