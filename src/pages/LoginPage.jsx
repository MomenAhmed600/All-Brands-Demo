import { useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { useState } from "react";
import { useUser } from '../context/UserContext';


export default function LoginPage() {
  const { setUser } = useUser();
 
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((users) => {
        const user = users.find(
          (user) => user.email === data.email && user.password === data.password
        );

        if (user) {
          setUser(user); 
          localStorage.setItem("user", JSON.stringify(user));
          navigate(`/profile/${user.id}`);
        } else {
          alert('Invalid email or password. Please try again.');
        }
      })
      .catch((err) => {
        console.log(err)
        alert('An error while logging in. Please try again.');
      });
  };


  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-account");
  };

  return (
    <div className="login">
      <div className="logform">
        <h1>Login <IoPersonCircle /></h1>
        <h6>Sign In With E-mail Address:</h6>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="e-mail"
            placeholder="Email address*"
            required
            value={data.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="pass"
            placeholder="Password*"
            minLength={6}
            required
            value={data.password}
            onChange={handleChange}
          />
          <input type="submit" value="Login" />
        </form>
        <a href="*">FORGOT PASSWORD?</a>
        <hr />
        <h4>Dont Have An Account Yet?</h4>
        <button id="login" onClick={handleClick}>
          Create Account
        </button>
      </div>
    </div>
  );
}
