import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Navbar/Style.css";
import { Buffer } from "buffer";
import Catview from "../catview/Catview";

const Map = () => {
    var [category, setCategory] = useState([]);
    useEffect(() => {
    axios
      .get("http://localhost:3005/view")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="popular">
      <div className="popular-item">
        {category.map((rows, pos) => {
          return (
            <Catview
              key={pos}
              id={rows._id}
              category={rows.Category}
              subcategory={rows.Subcategory}
              image={`data:image/jpeg;base64,${Buffer.from(rows.image1.data).toString("base64")}`}
              description={rows.Description}
              price={rows.Price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Map;