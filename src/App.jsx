import Landing from "./components/auths/Landing"
import Register from "./components/auths/Register";
import Login from "./components/auths/Login";

import TrackingResults from "./components/TrackingResults";

import UserDashboard from "./components/UserDashboard";

import CreateShipments from "./components/shipments/CreateShipments";
import RecentShipmentsPage from "./components/shipments/RecentShipmentsPage";
import { ProtectedRoute, PublicRoute } from "./components/RouteGuards";


import {Routes, Route} from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path = '/' element = {<Landing/>} />
      <Route path = '/login' element = {<PublicRoute><Login/></PublicRoute>} />
      <Route path = '/register' element = {<PublicRoute><Register/></PublicRoute>} />
      <Route path = '/dashboard' element = {<ProtectedRoute><UserDashboard/></ProtectedRoute>} />

       <Route path = '/tracking' element = {<ProtectedRoute><TrackingResults/></ProtectedRoute>} />

       <Route path = '/createShipments' element = {<ProtectedRoute><CreateShipments/></ProtectedRoute>} />

       <Route path = '/recentshipmentspage' element = {<ProtectedRoute><RecentShipmentsPage/></ProtectedRoute>} />

       
    </Routes>
   )
}

export default App