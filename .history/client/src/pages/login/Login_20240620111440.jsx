// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import "./login.scss";

// const Login = () => {
//   const [inputs, setInputs] = useState({
//     username: "",
//     password: "",
//   });
//   const [err, setErr] = useState(null);

//   const navigate = useNavigate()
 
//   const handleChange = (e) => {
//     console.log("e = ",e.target.name,e.target.value); 
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };
//   const { login } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await login(inputs);
//       navigate("/")
//     } catch (err) {
//       setErr(err.response.data);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="card">
//         <div className="left">
//           <h1>Tata Connect</h1>
//           <p>
//           Join our community and stay connected with the latest updates, events, and exclusive content. Experience seamless communication and collaboration with Tata Connect.
//           </p>
//           <span>Don't you have an account?</span>
//           <Link to="/register">
//             <button>Register</button>
//           </Link>
//         </div>
//         <div className="right">
//           <h1>Login</h1>
//           <form>
//             <input
//               type="text"
//               placeholder="Username"
//               name="username"
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               onChange={handleChange}
//             />
//             {err && err}
//             <button onClick={handleLogin}>Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Tata Connect</h1>
          <p>
            Join our community and stay connected with the latest updates, events, and exclusive content. Experience seamless communication and collaboration with Tata Connect.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && <span>{err}</span>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
