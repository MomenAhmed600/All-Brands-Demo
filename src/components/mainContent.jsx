import { useNavigate } from "react-router-dom";

export default function MainContent() {

  const navtext = useNavigate();

  return (
    <>
      <div className="">
      <div className="viedo">
        <video
          loop="loop"
          muted="muted"
          autoPlay="auto"
          src="main video.mp4"
        ></video>
      </div>
      
        <div className="img-cover">
          <img
            src="main-man-photo.jpg"
            alt=""
          />
          <div className="content">
            <h1 onClick={() => navtext("/products/man")}>New Collection Man Clothes</h1>
          </div>
        </div>

        <div className="img-cover">
          <img
            src="main-woman-photo.jpg"
            alt=""
          />
          <div className="content">
            <h1 onClick={() => navtext("/products/woman")}>New Collection Woman Clothes</h1>
          </div>
        </div>
      
        <div className="img-cover">
          <img
            src="main-kids-photo.jpg"
            alt=""
          />
          <div className="content">
            <h1 onClick={() => navtext("/products/kids")}>New Collection Kids Clothes</h1>
          </div>
        </div>
     

      </div>

    </>
  );
}
