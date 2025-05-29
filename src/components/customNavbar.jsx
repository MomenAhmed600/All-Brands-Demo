import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsCart, BsFillPersonFill, BsSearch } from "react-icons/bs";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { Modal, NavDropdown } from "react-bootstrap";
import { useSearch } from "../context/SearchContext";

function CustomNavbar() {
  const { user, setUser } = useUser();
  const { carts } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const { setSearch } = useSearch();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const c = Object.keys(carts)
      .map((id) => carts[id].count)
      .reduce((acc, curr) => acc + curr, 0);
    setCartCount(c);
  }, [carts]);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value)
  };
  
  const handleSubmit = (e) => {
   e.preventDefault();
   setSearch(inputValue)
  };

  const handleSearchClose = () => setShowSearch(false);
  const handleSearchShow = () => setShowSearch(true);
  return (
    <>
      <Navbar bg="light" id="navooo">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <div className="img-logo">
              <img
                src="brand-logo.png"
                className="d-inline-block align-top logo"
                alt="Logo"
              />
            </div>
            <span className="ms-2">Brands</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
          </Nav>
          <Nav className="me-2">
            <Nav.Link href="#login" onClick={handleSearchShow}>
              <BsSearch />
            </Nav.Link>

            {user ? (
              <>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <Nav.Link as={Link} to={`/profile/${user.id}`}>
                    <img
                      src={user.profileImage}
                      alt={user.firstName}
                      className="rounded-circle"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "5px",
                        border: " 2px solid #48cb57",
                      }}
                    />
                    <span>{user.firstName}</span>
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={Link} to="login">
                <BsFillPersonFill />
              </Nav.Link>
            )}

            <Nav.Link
              as={Link}
              to="/carts"
              className="position-relative cart-log"
            >
              <BsCart />
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger count-log"
                  style={{ fontSize: "12px" }}
                >
                  {cartCount}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Modal show={showSearch} onHide={handleSearchClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          

          <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Item"
            value={inputValue}
            onChange={handleChange}
            className="form-control"
          />
            <div className="btn-sreach-di">
            <button type="submit" className="btn-sreach">Search</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomNavbar;
