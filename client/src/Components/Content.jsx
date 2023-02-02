import React , {useState} from 'react'
import { useQuery } from '@apollo/client';
import { GET_BLOGS } from '../queries/blogQueries';
import Blog from './Blog'
import Button from 'react-bootstrap/Button';
import AddBlogModal from './AddBlogModal';

const Content = () => {
  const { loading, error, data } = useQuery(GET_BLOGS);

 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);


  return (
    <>
        <div style={{display: "flex", gap : '20px', 'flex-wrap' : "wrap" }}>
          {
          !loading && !error && 
              data.blogs.map((item , index) => {
                  return (
                      <Blog key={index} data = {item}/>
                  )
              })
          }

        </div>
        <Button style={{"margin-top" : "20px" }} onClick = {() => handleShow()} variant="primary">Create Post</Button>{' '}
        <AddBlogModal handleClose = {handleClose} show = {show} setShow = {setShow} handleShow = {handleShow}/>
    </>
  )
}

export default Content