import React from 'react';
import './clearall.styles.css'

const ClearAll = props => {

  return <button className="clearall" onClick={props.clearAll}>
          X
        </button>
}

export default ClearAll;