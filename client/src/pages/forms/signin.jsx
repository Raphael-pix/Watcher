import "./forms.css";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/context";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { loginData, setLoginData,user,setUser} = useContext(GlobalContext);
  const [, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/login", {
        email: loginData.email,
        password: loginData.password,
      });
      const result = response.data;
      if (result ) {
        setUser(result)
      }
      if(result && user){
        Navigate("/");
      }
      console.log(user)
      
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="form">
      <div className="form-container">
      <h1 className="form-title">Sign in</h1>
      <p>Log in to your account</p>
      <div className="form-input-container">
        <div className="input-container">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="enter email"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
          }
        />
        </div>
        <div className="input-container">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-input"
            placeholder="enter password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          log in
        </button>
        <p>Don't have an account? <Link to='/accounts/create-account' className="link">Sign up</Link></p>
        {error ? (
          <div className="error-message">
            <ul className="error-list">
              {error.map((errorItem, index) => (
                <li key={index}>{errorItem}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      </div>
      <div className="fade-cover"></div>
    </div>
  );
}
