import React , {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import { UPDATE_BLOG } from "../mutations/blogMutations";
import { GET_BLOG } from "../queries/blogQueries";
import { useMutation } from "@apollo/client";

const UpdateBlogModal = ({handleClose , show , setShow, handleShow , data}) => {

    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.description);
    const [image, setImage] = useState(data.image);
    
    const handleSubmit = () => {
        if (!name || !description || !image) {
            return alert("Please fill out all fields");
        }
        updateBlog(name, description, image)
        handleClose()
    }

    const [updateBlog] = useMutation(UPDATE_BLOG, {
        variables: { id: data.id, name, description, image },
        refetchQueries: [{ query: GET_BLOG, variables: { id: data.id } }],
    });

  return (
    <>
    
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange = {(e) => setName(e.target.value)}
              type="text"
              placeholder="name@example.com"
              autoFocus
              value = {name}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value = {description}  onChange = {(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Image</Form.Label>
            <Form.Control as="textarea" rows={3} value = {image}  onChange = {(e) => setImage(e.target.value)}/>
          </Form.Group>
      
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default UpdateBlogModal