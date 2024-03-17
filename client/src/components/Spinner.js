import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner">
        <CircularProgress color='secondary'/>
      </div>
    </div>
  );
}

export default Spinner;
