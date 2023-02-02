import React , {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_BLOG } from '../mutations/blogMutations';
import { GET_BLOGS } from '../queries/blogQueries';


const AddBlogModal = ({handleClose , show , setShow, handleShow}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [addBlog] = useMutation(ADD_BLOG, {
        variables: { name, description,  image},
        update(cache, { data: { addBlog } }) {
          const { blogs } = cache.readQuery({ query: GET_BLOGS });
          cache.writeQuery({
            query: GET_BLOGS,
            data: {  blogs: [... blogs, addBlog] },
          });
        },
      });

    const handleSubmit = () => {
        if (name === '' || description === ''  || image === '') {
            return alert('Please fill in all fields');
        
        }
        addBlog(name, description, image);


        handleClose()
        setName('');
        setDescription('');
    }


    return (
        <>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Creat Post</Modal.Title>
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
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3}   onChange = {(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Image</Form.Label>
                  <Form.Control as="textarea" rows={3}   onChange = {(e) => setImage(e.target.value)}/>
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
      );
}

export default AddBlogModal