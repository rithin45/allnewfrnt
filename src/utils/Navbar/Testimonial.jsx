import React from "react";
// import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
        "Grocery Shop: Where culinary desires meet convenience, and quality is delivered to your doorstep. Embark on a gastronomic adventure that tantalizes your taste buds and nourishes your spirit. Enjoy every bite!"
        </p>
      </div>
      <div className="testimonial-section-bottom">
        {/* <img src={ProfilePic} alt="" /> */}
        <p>
        "Grocery Haven is an absolute delight! Their extensive variety, prompt delivery, and tantalizing flavors make every shopping trip a heavenly experience."
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>John Doe</h2>
      </div>
    </div>
  );
};

export default Testimonial;