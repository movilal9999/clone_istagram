import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import Post from './Post'
import Posts from './Posts'

function MainLayout() {
  return (
    <div>
        <LeftSidebar />
    
        <div>
            <Outlet />
        </div>
      
    </div>
  )
}

export default MainLayout
