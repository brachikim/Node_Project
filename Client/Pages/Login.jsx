import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../components/App';
import '../css/Forms.css'

function Login() {
  localStorage.setItem('currentUser', null);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => {
        if (res.status !== 200) {
          alert('The username or password is not correct')
          throw console.error();
        } else {
          return res.json()
        }
      })
      .then(data => {
        setUser(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        alert('Login successful');
        navigate('/home');
      })
      .catch(() => 
        console.log('error')
      )
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { userContext } from '../components/App';
// import '../css/Forms.css'

// function Login() {
//   localStorage.setItem('currentUser', null);
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const navigate = useNavigate();
//   const { setUser } = useContext(userContext);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();


    
//     fetch(`http://localhost:3000/login`)
//       .then(res => res.json())
//       .then(user => {
//         if (user[0] != null) {
//           if (user[0].website === formData.password) {
//             setUser(user[0]);
//             localStorage.setItem('currentUser', JSON.stringify(user[0]));
//             alert('Login successful');
//             navigate('/home');
//           } else {
//             alert('Your password is incorrect');
//           }
//         } else {
//           alert('The username does not exist in the system');
//           navigate('/register');
//         }
//       })
//   };

//   return (
//     <div className='container'>
//       <form className='form' onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   )
// }

// export default Login