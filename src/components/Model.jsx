
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PostForm from './PostForm';

function Model({ show, modalTitle, handleClose, userId, title, description, handleSubmit }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title ><span style={{ width: "200px", wordBreak: "break-word" }}>{modalTitle}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PostForm
                    usrId={userId}
                    title={title}
                    description={description}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit} btnLable={modalTitle} />
            </Modal.Body>
        </Modal>
    )
}

export default Model