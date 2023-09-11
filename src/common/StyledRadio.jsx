import React from "react";
import { Radio } from "@mui/material";

const StyledRadio = (props) => {
  return (
    <Radio
      sx={{
        borderRadius: "5px", // Adjust the border-radius as needed
        border: "1px solid #000", // Add a border to create a rectangular shape
        padding: "5px", // Add padding to make the rectangle bigger
        color: "#000", // Change the color of the radio button
        "&.Mui-checked": {
          backgroundColor: "#000", // Change the background color when checked
          borderColor: "#000", // Change the border color when checked
          color: "#fff", // Change the text color when checked
        },
      }}
      {...props}
    />
  );
};

export default StyledRadio;
