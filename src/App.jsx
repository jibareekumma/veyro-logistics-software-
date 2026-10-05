import Landing from "./components/auths/Landing"
import Register from "./components/auths/Register";
import Login from "./components/auths/Login";

import UserDashboard from "./components/UserDashboard";
import { ProtectedRoute, PublicRoute } from "./components/RouteGuards";


import {Routes, Route} from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path = '/' element = {<Landing/>} />
      <Route path = '/login' element = {<PublicRoute><Login/></PublicRoute>} />
      <Route path = '/register' element = {<PublicRoute><Register/></PublicRoute>} />
      <Route path = '/dashboard' element = {<ProtectedRoute><UserDashboard/></ProtectedRoute>} />
    </Routes>
   )
}

export default App