import React from 'react';

function Campo(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.valor}
      </button>
    );
  }
export default Campo;