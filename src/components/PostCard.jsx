import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import { useDispatch } from 'react-redux';
import { deletePost, editPost } from '../redux/postSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faClose } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Model from './Model';


function PostCard({ id, title, description, userId, username }) {

    const [show, setShow] = useState(false);
    const [showDesc, setShowDesc] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShowDesc(false);
        setShow(true);
    };

    const dispatcher = useDispatch();

    const handlePostDelete = () => {
        console.log("Deleteing ..")
        deletePost(dispatcher, id);
    }

    const handlePostEdit = (post) => {

        editPost(dispatcher, { ...post, id: id });
    }

    return (
        <Col md="4" className='py-2'>
            <Card className="text-center h-100 shadow">
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <label>{title}</label>
                        <Button variant="outline" onClick={handleShow}><FontAwesomeIcon icon={faPenToSquare} className="icon" /></Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {
                            description.length > 200
                                ? <>{description.slice(0, 200).trim()}<Button variant="link" onClick={() => setShowDesc(true)}>Read More</Button></>
                                : <>{description}</>
                        }
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-between align-items-center">
                        <label>{username}</label>
                        <Button variant="outline" onClick={() => handlePostDelete()}>
                            <FontAwesomeIcon icon={faTrashCan} className="icon" />
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
            {show && <Model
                show={show}
                modalTitle="Edit a Post"
                handleClose={handleClose}
                userId={userId}
                title={title}
                description={description}
                handleSubmit={handlePostEdit}
            ></Model>}

            {
                showDesc && <Modal show={showDesc} onHide={() => setShowDesc(false)}>
                    <Modal.Header>
                        <span className='ml-auto'>{title}</span>
                        <div className=' ms-auto' >
                            <Button variant="outline" onClick={handleShow}><FontAwesomeIcon icon={faPenToSquare} className="icon" /></Button>
                            <Button variant="outline" onClick={() => setShowDesc(false)}><FontAwesomeIcon icon={faClose} className="icon" /></Button>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {description}
                    </Modal.Body>

                </Modal>
            }
        </Col>
    )
}

export default PostCard