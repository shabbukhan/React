import React from "react";

const Button = props => {
  return (
      <button onClick={props.click}>{props.buttonName}</button>
  )
};
export default Button;