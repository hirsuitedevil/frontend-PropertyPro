import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import Listing from "./pages/Listing";
import PrivateRoute from "./components/PrivateRoute";
import EditProperty from "./pages/EditProperty";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import { SocketContextProvider } from "./context/SocketContext";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route
                path="/resetpassword/:id/:token"
                element={<ResetPassword />}
              />
              <Route path="/properties" element={<Properties />} />
              <Route path="/addproperties" element={<AddProperty />} />
              <Route
                path="/category/:typeName/:propertyId"
                element={<Listing />}
              />
              <Route
                path="/edit-property/:propertyId"
                element={<EditProperty />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </SocketContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
