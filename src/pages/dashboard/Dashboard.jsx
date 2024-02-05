import React from 'react'
import './dashboard.css'
import {  DFooter} from '../../components'
import { PostList } from '../post/_Post/_Post'



export const MyDashboard = () => {
  
  return (
    <>
      <PostList resource="posts" />
  
      <DFooter/>
    </>
  )
};