import './App.css'
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './Modules/HomeModule/components/Dashboard/Dashboard'
import RecipeList from './Modules/RecipeModule/components/RecipeList'
import RecipeData from './Modules/RecipeModule/components/RecipeData'
import NotFound from './Modules/SharedModule/components/NotFound/NotFound'
import Login from './Modules/AuthModule/components/Login/Login'
import Register from './Modules/AuthModule/components/Register/Register'
import Verify from './Modules/AuthModule/components/Verify/Verify'
import MasterLayout from './Modules/SharedModule/components/MasterLayout/MasterLayout'
import UsersList from './Modules/UsersModule/components/UsersList'
import AuthLayout from './Modules/SharedModule/components/AuthLayout/AuthLayout'
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './Modules/SharedModule/components/ProtectedRoute/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css';



function App() {
  
  let[loginData,setLoginData]=useState(null);
  
  let saveLoginData= ()=>{
    let encodedToken=localStorage.getItem('token');
    let decodedToken=jwtDecode(encodedToken);
    localStorage.setItem('userData',JSON.stringify(decodedToken))
    setLoginData(decodedToken);
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      saveLoginData()}
  
  },[])

  let routes = createBrowserRouter([
    {path:'DashBoard',
      element:
      <ProtectedRoute loginData={loginData} >
      <MasterLayout loginData={loginData}/>
       </ProtectedRoute>,

      errorElement: <NotFound/>,
      children:[{path:"",element:<Dashboard/>}, 
      {path:"recipes",element:<RecipeList/>},
      {path:"recipeData",element:<RecipeData/>},
      {path:"users",element:<UsersList/>},
      ]

    },
    {path:"/",
      element:<AuthLayout/>,
      errorElement: <NotFound/>,
      children:[
      {path:"",element:<Login
       saveLoginData={saveLoginData}
      />},
      {path:"login",element:<Login 
      saveLoginData={saveLoginData}
      />},
      {path:"register",element:<Register/>},
      {path:"verify",element:<Verify/>}
  
      ]
  
  
    }
  ])

  return (

    <>
    <ToastContainer />
     <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
