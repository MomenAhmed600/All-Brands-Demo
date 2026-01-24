import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function DetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = [
          ...(data["top10-all-products"] || []),
          ...(data["all-products-cards"] || []),
          ...(data["top10-man"] || []),
          ...(data["man"] || []),
          ...(data["top10-woman"] || []),
          ...(data["woman"] || []),
          ...(data["top10-kids"] || []),
          ...(data["kids"] || []),
        ].find((item) => String(item.id) === String(id));
        setProduct(foundProduct);
      })
      .catch((err) => {
        console.error("Error loading product data:", err);
      });
  }, [id]);

  const handleAddCart = (product) => {
    addCart(product);
  };

  if (!product) return <p>Loading...</p>;

  console.log("Type of product.image:", typeof product.image);

  return (
    <Container>
      <div className="review-p">
        <div className="row" id="bg-prof-img">
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <Carousel>
              <Carousel.Item>
                <Zoom>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid my-5"
                    id="img-prof"
                    style={{ cursor: "zoom-in" }}
                  />
                </Zoom>
              </Carousel.Item>
              <Carousel.Item>
                <Zoom>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid my-5"
                    id="img-prof"
                    style={{ cursor: "zoom-in" }}
                  />
                </Zoom>
              </Carousel.Item>
              <Carousel.Item>
                <Zoom>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid my-5"
                    id="img-prof"
                    style={{ cursor: "zoom-in" }}
                  />
                </Zoom>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-5 details-product">
            <h1 className="product-titile">{product.title}</h1>
            <h5 className="mt-4">{product.description}</h5>
            <div className="links">
              <h4>{product.price} EGP</h4>
            </div>
            <div className="size-buttons">
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
              <button>XXL</button>
            </div>
            <button
              type="button"
              className="btn-prof"
              onClick={() => handleAddCart(product)}
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
