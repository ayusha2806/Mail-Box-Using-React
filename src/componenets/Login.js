import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    pass: '',
  });

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCz5GQw9rpsQ_WeKR1Qj0-CkRUvQUEmogI',
        {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.pass,
            returnSecureToken: true,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      if (response.ok) {
        const userData = await response.json();
        console.log('User logged in:', userData);
  
        // Generate userId from email address
        const userId = userData.email.replace(/[^a-zA-Z0-9]/g, "");
  
        // Dispatch the loginSuccess action with token, user, email, and userId data
        dispatch(
          loginSuccess({
            token: userData.idToken,
            user: userId,
          })
        );
  
        navigate('/compose');
        setValues({
          email: '',
          pass: '',
        });
      } else {
        const errorData = await response.json();
        console.log('Error logging in:', errorData);
        
        alert('Incorrect email or password. Please try again.');
      }
    } catch (error) {
      console.log('Error logging in:', error.message);
    }
  };

  return (
    <div style={{ 
      backgroundImage: 'url(https://img.freepik.com/free-vector/wave-background_53876-115944.jpg?w=996&t=st=1707032579~exp=1707033179~hmac=79e299d11aa7002e997026c55ba0a8fa58e8608fde12cfa9066cb07a0fc49424)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">
                <h2 className="text-center">Login In</h2>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email"
                    value={values.email}
                    onChange={(event) =>
                      setValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                    value={values.pass}
                    onChange={(event) =>
                      setValues((prev) => ({ ...prev, pass: event.target.value }))
                    }
                  />
                </div>
                <div>
                  <button className="btn btn-primary" onClick={handleSubmission}>
                    Login
                  </button>
                  <p className="mt-3 text-center">Already have an account?</p>
                  <p className="text-center">
                    <Link to="/">Signup</Link>
                  </p>
                  <p className="text-center">
                    <Link to="/password">Forget Password</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
