import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import data from "../db.json";
import { useCart } from "../context/CartContext";

function DetailsPage() {
  const { id } = useParams();
  console.log("id:", id);
  const [product, setProduct] = useState({});
  const { addCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const foundProduct = [
      ...(data["top10-all-products"] || []),
      ...(data["all-products-cards"] || []),
      ...(data["top10-man"] || []),
      ...(data["man"] || []),
      ...(data["top10-woman"] || []),
      ...(data["woman"] || []),
      ...(data["top10-kids"] || []),
      ...(data["kids"] || []),
    ].find((item) => item.id === id);
    setProduct(foundProduct);
  }, [id]);

  const handleAddCart = (product) => {
    addCart(product);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Container>
      <div className="review-p">
        <div className="row" id="bg-prof-img">
          <div className="col-md-5">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid my-5"
              id="img-prof"
            />
          </div>
          <div className="col-md-5 ">
            <h1 className="mt-5 ">{product.title}</h1>
            <p className="mt-4">{product.description}</p>
            <div className="links">
              <h3>{product.price} EGP</h3>
            </div>
            <button
              type="button"
              className="btn-prof"
              onClick={() => {
                handleAddCart(product);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DetailsPage;
