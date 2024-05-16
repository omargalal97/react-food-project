import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'

export default function MasterLayout({ loginData }) {
  return (
    <div className="d-flex">
      <div >
        <SideBar loginData={loginData}/>
      </div>

      <div className="w-100">
        <NavBar loginData={loginData} />
       
        <Outlet />
      </div>
    </div>
  )
}
