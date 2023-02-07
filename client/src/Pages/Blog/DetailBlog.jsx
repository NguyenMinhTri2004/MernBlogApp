import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_BLOG } from '../../queries/blogQueries';
import { useParams } from 'react-router-dom'

const DetailBlog = () => {
  
const { id } = useParams();

const { loading, error, data } = useQuery(GET_BLOG, { variables: { id } });


  return (
    <div>
        <h1>{data?.blog?.name}</h1>
        <img style={{ width: '48rem' }} src= {data?.blog?.image} alt="" />
        <p>{data?.blog?.description}</p>
    </div>
  )
}

export default DetailBlog