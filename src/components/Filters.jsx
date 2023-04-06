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
      <div className="filter-container">
        <h3 className="filter-header glow">
          By defult you see our top pieces gallery.
          <br /> You can use the select to pick a specific painter.
        </h3>
        <div className="select-painter">
          <Form.Select
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
          </Form.Select>
        </div>
      </div>
    </>
  );
}

export default Filters;
