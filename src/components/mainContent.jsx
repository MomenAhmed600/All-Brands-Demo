import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MainContent() {

  const navtext = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
      const isDesktop = window.innerWidth > 768;
      const videoEl = videoRef.current;
  
      if (videoEl && isDesktop) {
        videoEl
          .play()
          .catch((err) => {
            console.log("Autoplay blocked", err);
          });
      }
    }, []);

  return (
    <>
      <div className="">
      <div className="viedo">
        <video
            ref={videoRef}
            loop
            muted
            playsInline
            autoPlay
            controls={window.innerWidth <= 768}
            src="main video.mp4"
          />
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
