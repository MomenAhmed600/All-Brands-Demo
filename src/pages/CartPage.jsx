import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { carts, removeCart, increaseCartCount, decreaseCartCount } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const c = Object.keys(carts)
      .map((id) => carts[id].count)
      .reduce((acc, curr) => acc + curr, 0);

    setCartCount(c);
  }, [carts]);

  useEffect(() => {
    const prc = Object.keys(carts)
      .map((id) => ({
        price: carts[id].product.price,
        count: carts[id].count,
      }))
      .reduce((acc, curr) => acc + curr.price * curr.count, 0);

    setPrice(prc);
  }, [carts]);

  // useEffect(() => {
  //   if (user) {
  //     fetch(`http://localhost:8000/carts?userId=${user.id}`)
  //       .then((res) => res.json())
  //       .then((data) => setCartsList(data));
  //   }
  // }, [user]);

  return (
    <>
      <Container>
        {Object.keys(carts)
          .map((id) => carts[id])
          .map(({ product, count }) => (
            <>
              <div className="review-p-fevo" key={product.id}>
                <div className="row" id="bg-prof-img">
                  <div className="col-md-2 " id="img-fv">
                    <Link to={`/details-page/${product.id}`}>
                      <img
                        src={product.image}
                        alt=""
                        className="img-fluid mt-1 cursor-pointer"
                        id="img-favo"
                      />
                    </Link>
                  </div>
                  <div className="col-md-5 favo-content">
                    <Link
                      to={`/details-page/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h2
                        className="mt-1 product-title-cart"
                        style={{ color: "black" }}
                      >
                        {product.title}
                      </h2>
                    </Link>
                    <h5 className="mt-1" id="favo-para">
                      {product.description}
                    </h5>
                    <div className="size-buttons">
                      <button>S</button>
                      <button>M</button>
                      <button>L</button>
                      <button>XL</button>
                      <button>XXL</button>
                    </div>

                    <div className="links-favo">
                      <div>
                        <h6 className="star-logo">
                          <span id="rate">
                            {product.price} <span>EGP</span>
                          </span>
                        </h6>
                      </div>

                      <div className="quananddel">
                        <div className="quantity">
                          <button
                            className="plus"
                            onClick={() => increaseCartCount(product.id)}
                          >
                            +
                          </button>

                          <span>{carts[product.id]?.count || 1}</span>

                          <button
                            className="minus"
                            onClick={() => decreaseCartCount(product.id)}
                          >
                            -
                          </button>
                        </div>

                        <div>
                          <a
                            id="delete-logo"
                            onClick={() => removeCart(product.id)}
                            href="#as"
                          >
                            <i>
                              <MdDeleteForever />
                            </i>{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}

        <hr />
        <div className="checkout">
          <h1>CheckOut</h1>
          <div className="content-check">
            <div className="content-1">
              <div>
                <h3>Total Quantity:</h3>
              </div>
              <div className="con-11">
                <h5>{cartCount}</h5>
              </div>
            </div>

            <div className="content-2">
              <div>
                <h3>Total Price:</h3>
              </div>
              <div className="con-22">
                <h5>
                  {price}
                  <span>EGP</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </Container>
    </>
  );
}

export default CartPage;
