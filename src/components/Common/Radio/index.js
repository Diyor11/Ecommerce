/**
 *
 * Checkbox
 *
 */

import React, { useState } from 'react';

function Radio({handleChangeSubmit}) {
  const [size, setSize] = useState('')
  

  const handleChange = (event) => {
    setSize(event.target.value)
    handleChangeSubmit(event.target.name,event.target.value);
  }

  return (
    <div>
      <ul>
        <li>
          <label>
            <input
              name="sorting"
              type="radio"
              value="Newest First"
              checked={size === "Newest First"}
              onChange={handleChange}
            />
            Newest First
          </label>
        </li>

        <li>
          <label>
            <input
              name="sorting"
              type="radio"
              value="Price High to Low"
              checked={size === "Price High to Low"}
              onChange={handleChange}
            />
            Price High to Low
          </label>
        </li>

        <li>
          <label>
            <input
              name="sorting"
              type="radio"
              value="Price Low to High"
              checked={size === "Price Low to High"}
              onChange={handleChange}
            />
            Price Low to High
          </label>
        </li>
      </ul>
    </div>
  );
}

export default Radio;
