import React from "react";
import Form from "react-bootstrap/Form";

function Filters({ arrayArtists, onSelect }) {
  //   console.log("test ", arrayArtists);

  function handleChange(e) {
    onSelect(e.target.value);
    // console.log("test for handle change", e.target.value.replace(" ", "+"));
  }

  return (
    <>
      <div className="headerFilters">
        By defult you see our top 100 pieces,
        <br /> you can filter the paint acourdibg to your favorite painter
      </div>
      <div className="selectArtist">
        <select
          onChange={handleChange}
          aria-label="select an painter"
          id="selectElement"
        >
          <option value="">...</option>
          {arrayArtists.map((paint, index) => (
            <option key={index} value={paint}>
              {paint}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Filters;
