import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    pass: '',
    conf: '',
  });

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (values.pass !== values.conf) {
      alert('Please enter matching passwords');
      return;
    }

    try {
      const userCredential = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCz5GQw9rpsQ_WeKR1Qj0-CkRUvQUEmogI',
        {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.pass,
            returnSecureToken: true,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      ).then((response) => response.json());

      if (userCredential) {
        console.log('User signed up:', userCredential);

        // Use navigate instead of history.push
        navigate('/login');

        setValues({
          email: '',
          pass: '',
          conf: '',
        });
      } else {
        console.log('Error signing up.');
      }
    } catch (error) {
      console.log('Error signing up:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">SignUp</h2>
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
                  placeholder="Create Your Password"
                  value={values.pass}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, pass: event.target.value }))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={values.conf}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, conf: event.target.value }))
                  }
                />
              </div>

              <div>
                <button className="btn btn-primary" onClick={handleSubmission}>
                  Sign Up
                </button>
                <p className="mt-3 text-center">Already have an account?</p>
                <p className="text-center">
                  <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;