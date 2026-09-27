
import Landing from "./components/auths/Landing"
import Register from "./components/auths/Register";
import Login from "./components/auths/Login";


import {Routes, Route} from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path = '/' element = {<Landing/>} />
      <Route path = '/login' element = {<Login/>} />
      <Route path = '/register' element = {<Register/>} />
    </Routes>
   )
}

export default App
