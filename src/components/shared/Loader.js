import React from "react";

import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={{
        width: "100%",
        height: "1000px",
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px"
    }}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#1976d2"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
