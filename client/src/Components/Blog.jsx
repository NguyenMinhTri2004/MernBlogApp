import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import { DELETE_BLOG } from '../mutations/blogMutations';
import { useMutation } from '@apollo/client';
import { GET_BLOGS } from '../queries/blogQueries';
import UpdateBlogModal from './UpdateBlogModal';
import { FaTrash } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';

const Blog = ({data}) => {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  
  const handleShowUpdate = () => {
    setShowUpdate(true);
  }
  const [deleteProject] = useMutation(DELETE_BLOG, {
    variables: { id: data?.id },
    refetchQueries: [{ query:  GET_BLOGS }],
  });

  const handleDeleteProject = (e) => {

    deleteProject()
  }

    return (
      <>
     
        <Card style={{ width: '18rem' }}>
        <Link to = {`/blogs/${data?.id}`}>
          <Card.Img variant="top" src= {data.image} />
        </Link>
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              {data.description}
            </Card.Text>
            <div style={{display: "flex", gap : '2px', 'flex-wrap' : "wrap" }} >
            <FaTrash style={{"margin-right" : "10px" }} onClick = {() => handleDeleteProject()} variant="danger">Delete</FaTrash>
            <FaRegEdit onClick = {() => handleShowUpdate()} variant="danger">Update</FaRegEdit>
            </div>
          </Card.Body>
        </Card>  
     
    <UpdateBlogModal handleClose = {handleCloseUpdate} show = {showUpdate} setShow = {setShowUpdate} handleShow = {handleShowUpdate} data = {data} />
      </>
      );
}

export default Blog