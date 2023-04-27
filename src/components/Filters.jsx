import React from "react";
import Form from "react-bootstrap/Form";

function Filters({ arrayArtists, onSelect }) {
  function handleChange(e) {
    onSelect(e.target.value);
  }

  return (
    <>
      <div className="filter-container">
        <div className="filter-background-div">
          <h3 className="filter-header">
            Rijksmuseum's top pieces gallery.
            <br />
            Sign up to like, comment and share !
          </h3>
        </div>
        <div className="select-painter">
          <Form.Select
            onChange={handleChange}
            aria-label="select an painter"
            id="selectElement"
          >
            <option value="">Artists list</option>
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
