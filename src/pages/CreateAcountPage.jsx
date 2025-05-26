import React, { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const [acctData, setAcctData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const hChanges = (e) => {
    const { name, value } = e.target;
    setAcctData({ ...acctData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(acctData),
    });
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="login">
        <div className="logform">
          <h1>
            Create account <MdPersonAdd />
          </h1>
          <p>Please enter your details to create an account.</p>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              id="first"
              placeholder="First Name*"
              required
              onChange={hChanges}
            />
            <input
              type="text"
              name="lastName"
              id="last"
              placeholder="Last Name*"
              required
              onChange={hChanges}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address*"
              required
              onChange={hChanges}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password*"
              minLength={6}
              required
              onChange={hChanges}
            />
            <input
              type="submit"
              defaultValue="Create Account"
              onClick={openPopup}
            />
          </form>
          <hr />
          <h2>Already have an account?</h2>
          <p>
            To access your account or reset your account password, login here...
          </p>
          <button onClick={handleClick} id="sign">
            Login
          </button>
        </div>


        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <div className="popup-header">
                <h3>Search Recipe</h3>
                <button className="close-btn" onClick={closePopup}>
                  X
                </button>
              </div>
              <div className="popup-body">
                <h2>
                  You Are Successfully To Create Account{" "}
                  <span>
                    <FaUserCheck />
                  </span>
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
