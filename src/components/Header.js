import React from "react";
import Button from './Button';

const Header = (props) => {
  return (
    <header role='banner'>
      <Button role="button" aria-label='Left align' click={props.oldestHandler} buttonName='Oldest' />
      <Button role="button" aria-label='Right align' click={props.latestHandler} buttonName='Latest' />
    </header>
  );
};
export default Header;
