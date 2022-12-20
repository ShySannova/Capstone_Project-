import "./App.scss"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Restaurant from "./pages/Restaurant/Restaurant";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserRegister from "./components/Register/UserRegister";
import Menu from "./pages/Menu/Menu";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Add } from "./components/Add/Add";
import { Edit } from "./components/Edit/Edit";
import UserLogin from "./components/Login/UserLogin";
import CartMain from "./pages/CartMain/CartMain";
import Order from "./pages/Order/Order";


console.log(import.meta.env.VITE_BASE_URL)


const Client =()=>{
  return(
    <div className="app">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

const Vendor =()=>{
  return(
    <div className="app">
      <Outlet/>
      <Footer/>
    </div>
  )
}


const router = createBrowserRouter([
  {
    path:"/",
    element:<Client/>,
    children:[
      {
        path:"/",
        element:<Home/>,
        children:[
          {
            path:"/home/signIn",
            element:<UserLogin/>
          },
          {
            path:"/home/signUp",
            element:<UserRegister/>
          },
        ]

      },
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:"/menu",
        element:<Menu/>
      },
      {
        path:"restaurant/menu",
        element:<Menu/>
      },
      {
        path:"/home/cart",
        element:<CartMain/>
      },
      {
        path:"/home/orders",
        element:<Order/>
      },
     
    ]
  },
  {
    path:"/restaurant",
    element:<Vendor/>,
    children:[
      {
        path:"/restaurant",
        element:<Restaurant/>,
        children:[
          {
            path:"/restaurant/signIn",
            element:<Login/>
          },
          {
            path:"/restaurant/signUp",
            element:<Register/>
          },
          {
            path:"/restaurant/dashboard",
            element:<Dashboard/>,
            children:[
              {
                path:"/restaurant/dashboard/product/add",
                element:<Add/>
              },
              {
                path:"/restaurant/dashboard/product/edit",
                element:<Edit/>
              },
            ]
          }

        ]
      },     
    ]
  },

])

function App(){
  return(
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}




export default App
