import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };
    console.log(newUser);

    axios
      .post("http://localhost:5000/login/signup", newUser)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit} method="POST">
        <label>Username</label>
        <input
          type="text"
          name="username"
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Password</label>
        <input
          type="text"
          name="username"
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <br />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
