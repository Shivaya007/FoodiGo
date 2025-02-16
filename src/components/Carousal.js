import React, { useState, useEffect } from "react";

export default function Carousel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://api.unsplash.com/search/photos?query=food&client_id=RqopynQe1VpbHiYsUDzkIABDH-vsXGFessO4Kakd2oY")
      .then((response) => response.json())
      .then((data) => {
        setImages(data.results.slice(0, 3).map((photo) => photo.urls.regular));
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectfit :"contain !important"}}>
        <div className="carousel-inner">
          <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button>
            </form>
          </div>

          {images.length > 0 &&
            images.map((img, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={img} className="d-block  w-100" alt={`Slide ${index + 1}`} style={{height:"500px",filter:"brightness(30%)"}}/>
              </div>
            ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
