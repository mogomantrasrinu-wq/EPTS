import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
 
 
 
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[role, setRole] = useState("")
  const [message, setMessage] = useState("");
  const [loading ,setLoading] = useState(false)
  const navigate = useNavigate();
 
 
 
  const handleLogin = async(e)=>{
    e.preventDefault();
 
    if (!role){
      setMessage("Please select a role");
      return;
    }
    setLoading(true);
    setMessage("");
 
    try{
      const response =await axios.post(
         "https://epts-backend.onrender.com/api/login",
         {
          username,
          password,
          role,
         }
      );
   
 
    if (response.data.success) {
      setMessage("✅ Login successful! Redirecting to admin dashboard...");
     
      localStorage.setItem("token", response.data.token);
     
      setTimeout(() => {
        if(role ==="admin") navigate("/admin");
        else if (role === "employee") navigate("/employee");
        else if (role ==="manager") navigate("/manager");
      }, 1500);
    } else {
      setMessage("❌" + response.data.message);
    }
  }catch(error){
    console.error(error);
    setMessage("❌ something went wrong try again!");
 
  }finally{
    setLoading(false);
 
  }
 
  };
 
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card-group">
 
              <div className="card p-4">
                <div className="card-body">
                  <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-secondary">Sign in to your account</p>
 
 
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="bi bi-person-fill"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
 
 
                    <div className="input-group mb-4">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Select Role</label>
                      <select id="role" class="form-select role-select"
                      value={role}
                      onChange={(e)=>setRole(e.target.value)}
                      required>
                        <option value="">-- Select Role --</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
 
 
                    <div className="row">
                      <div className="col-6">
                        <button type="submit" className="btn btn-primary px-4"
                        disabled={loading}>
                          {loading? "Logging in...":"Login"}
                        </button>
                      </div>
                      <div className="col-6 text-end">
                       
                      </div>
                    </div>
                  </form>
 
 
                  {message && (
                    <div className="mt-3 text-center fw-bold text-danger">
                      {message}
                    </div>
                  )}
                </div>
              </div>
 
 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Login;
 
 