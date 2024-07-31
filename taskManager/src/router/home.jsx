import { Navigate, Route  } from "react-router-dom";
import App from "../App";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/login"
import SingUp from "../pages/signup";
import EditTask from "../pages/EditTask";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img src="./PageNotFound.svg" alt="404 Not Found" className="w-full max-w-md md:max-w-lg lg:max-w-xl" />
    </div>  );
};
const  homeRoute=()=> {
  return(
  <Route path='/' element={<App/>} ErrorBoundary={ErrorPage}>
    <Route path='' element={<DashBoard/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='signup' element={<SingUp/>}/>
    <Route path="edit" element={<EditTask/>}/>
  </Route>
  );
}

export default homeRoute
