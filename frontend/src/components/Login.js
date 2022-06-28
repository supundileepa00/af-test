import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
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
      .post("http://localhost:5000/login", newUser)
      .then((res) => {
        console.log(res.data);
        if (res.data.user) {
          if (res.data.validate) {
            navigate("/view-books");
          } else {
            alert("Invalid Password");
            setpassword("");
          }
        } else {
          alert("No User");
          setUsername("");
          setpassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} method="POST">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <br />
        <label>Password</label>
        <input
          value={password}
          type="password"
          name="username"
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
