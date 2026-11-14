

import Landing from "./components/auths/Landing"
import Register from "./components/auths/Register";
import Login from "./components/auths/Login";

import TrackingResults from "./components/TrackingResults";

import UserDashboard from "./components/UserDashboard";

import CreateShipments from "./components/shipments/CreateShipments";
import RecentShipmentsPage from "./components/shipments/RecentShipmentsPage";

import Quotes from "./components/quotings/Quotes";
import { ProtectedRoute, PublicRoute } from "./components/RouteGuards";

import Profile from "./components/user/Profile";
import SavedAddresses from "./components/user/SavedAddresses";
import Notifications from "./components/notifications/Notifications";
import NotFound from "./components/NotFound";

import { NotificationProvider } from "./context/NotificationContext";

import Support from "./components/support/Support";


import {Routes, Route} from "react-router-dom";

function App() {

  return (
    <NotificationProvider>
      <Routes>
        <Route path = '/' element = {<Landing/>} />
        <Route path = '/login' element = {<PublicRoute><Login/></PublicRoute>} />
        <Route path = '/register' element = {<PublicRoute><Register/></PublicRoute>} />
        <Route path = '/dashboard' element = {<ProtectedRoute><UserDashboard/></ProtectedRoute>} />

         <Route path = '/tracking' element = {<ProtectedRoute><TrackingResults/></ProtectedRoute>} />
         <Route path = '/tracking/:trackingId' element = {<ProtectedRoute><TrackingResults/></ProtectedRoute>} />

         <Route path = '/createShipments' element = {<ProtectedRoute><CreateShipments/></ProtectedRoute>} />
         <Route path = '/editShipments/:trackingId' element = {<ProtectedRoute><CreateShipments/></ProtectedRoute>} />

         <Route path = '/recentshipmentspage' element = {<ProtectedRoute><RecentShipmentsPage/></ProtectedRoute>} />

         <Route path = '/quotes' element = {<ProtectedRoute><Quotes/></ProtectedRoute>} />

         <Route path = '/profile' element = {<ProtectedRoute><Profile/></ProtectedRoute>} />
         <Route path = '/addresses' element = {<ProtectedRoute><SavedAddresses/></ProtectedRoute>} />

         <Route path = '/notifications' element = {<ProtectedRoute><Notifications/></ProtectedRoute>} />

         <Route path = '/support' element = {<ProtectedRoute><Support/></ProtectedRoute>} />

         <Route path = '*' element = {<NotFound/>} />

      </Routes>
    </NotificationProvider>
   )
};

export default App