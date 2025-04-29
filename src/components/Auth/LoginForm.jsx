// import React, { useState } from 'react';
// import { login } from './authService';
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// // import './LoginForm.css'; // Import the CSS file for this component

// const LoginForm = ({setIsAuthenticated}) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);


//     const [cookies, setCookie] = useCookies(['token']);

//     const navigate = useNavigate(); // Initialize navigate

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setIsLoading(true);
//         setError('');

//         try {
//             debugger
//             const token = await login(username, password);
//             // Save token to cookies
//             setCookie('token', token, { path: '/' }); // Adjust options as needed
//             // Redirect to dashboard
//             setIsAuthenticated(true)
//             setTimeout(() => {
//                 navigate('/dashboard'); // Use navigate for redirection
//             }, 1500);
//         } catch (err) {
//             setError('Invalid username or password');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="login-container">
//             <h1 className="login-heading">Sign In</h1>
//             <form onSubmit={handleSubmit} className="login-form">
//                 <div className="login-field">
//                     <label htmlFor="username">Username</label>
//                     <input
//                         className="login-input"
//                         type="text"
//                         id="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="login-field">
//                     <label htmlFor="password">Password</label>
//                     <input
//                         className="login-input"
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 {error && <div className="login-error">{error}</div>}
//                 <button className="login-button" type="submit" disabled={isLoading}>
//                     {isLoading ? 'Loading...' : 'Login'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default LoginForm;



import React, { useState } from "react";
import { login } from './authService';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';



const LoginForm = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    console.log(username);
    console.log(password);

    const [cookies, setCookie] = useCookies(['token']);

    const navigate = useNavigate(); // Initialize navigate

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setIsLoading(true);
    //     setError('');

    //     try {
    //         debugger
    //         const token = await login(username, password);
    //         // Save token to cookies
    //         setCookie('token', token, { path: '/' });
    //         // Redirect to dashboard
    //         setIsAuthenticated(true)
    //         setTimeout(() => {
    //             navigate('/dashboard'); // Use navigate for redirection
    //         }, 1500);
    //     } catch (err) {
    //         setError('Invalid username or password');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };




    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
debugger
        try {
            const token = await login(username, password);
            // Save token to cookies
            setCookie('token', token, { path: '/' });
            // Redirect to dashboard
            setIsAuthenticated(true);

            // Success alert
            Swal.fire({
                icon: 'success',
                title: 'Logged in successfully!',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                navigate('/sale-orders'); // Use navigate for redirection
            }, 1500);
        } catch (err) {
            setError('Invalid email or password');

            // Error alert
            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Invalid username or password',
                showConfirmButton: true
            });
        } finally {
            setIsLoading(false);
        }
    };




    return (

        <div className="login-form-container">

            {/* <form className="form" onSubmit={handleSubmit}>
                <p id="heading">Login</p>
                <div className="field">
                    <svg
                        className="input-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                    </svg>
                    <input
                        autoComplete="off"
                        placeholder="Username"
                        className="input-field"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}

                    />
                </div>
                <div className="field">
                    <svg
                        className="input-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                    <input
                        placeholder="Password"
                        className="input-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="btn">
                    <button className="button1" type="submit">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                    <button className="button2">Sign Up</button>
                </div>
                <button className="button3">Forgot Password</button>
            </form> */}



            <div className="card">
                <div className="card2">
                    <form className="form" onSubmit={handleSubmit}>
                        <p id="heading">Login</p>
                        <div className="field">
                            <svg
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                                className="input-icon"

                            >
                                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                            </svg>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Email"
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <svg
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                                className="input-icon"
                            >
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                            </svg>
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="btn">
                            <button className="button1">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                            <button className="button2">Sign Up</button>
                        </div>
                        <button className="button3">Forgot Password</button>
                    </form>
                </div>
            </div>


        </div>

    );
};


export default LoginForm;
