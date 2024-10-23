import React from "react";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import UserSignup from "./components/userSignup";
import ChefSignup from "./components/chefSignup";
import Login from "./components/login";
import Home from "./components/home";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>MealMate</h1>
        <div className="flex justify-center space-x-4 mt-10">
          {/* Button for User Signup */}
          <Link to="/signup/user">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Find a Chef
            </button>
          </Link>

          {/* Button for Chef Signup */}
          <Link to="/signup/chef">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Become a Chef
            </button>
          </Link>
        </div>
        <Routes>
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/chef" element={<ChefSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;