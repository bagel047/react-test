import { useState, useContext, useEffect } from "react";
import { baseUrl } from "../shared";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../App";

export default function Login() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(false);
  }, []);

  function login(e) {
    e.preventDefault();

    let data = {
      email: email,
      username: username,
      password: password,
    };
    const url = baseUrl + "api/register/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setLoggedIn(true);

        navigate(
          location?.state?.previousUrl
            ? location.state.previousUrl
            : "/customers"
        );
      });
  }

  return (
    <form
      id="registerForm"
      onSubmit={login}
      className="w-full max-w-sm mx-auto mt-16 bg-slate-300 p-10 rounded"
    >
      <div>
        <h3 className="mb-6">Sign up</h3>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label htmlFor="email">Email</label>
        </div>
        <div className="md:w-2/3">
          <input
            id="email"
            className="bg-gray-100 appearance-none border-1 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label htmlFor="username">Username</label>
        </div>
        <div className="md:w-2/3">
          <input
            id="username"
            className="bg-gray-100 appearance-none border-1 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label htmlFor="password">Password</label>
        </div>
        <div className="md:w-2/3">
          <input
            id="password"
            className="bg-gray-100 appearance-none border-1 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          form="registerForm"
          className="bg-purple-600 hover:bg-purple-800 text-white py-1 px-3 rounded"
        >
          Register
        </button>
      </div>
    </form>
  );
}
