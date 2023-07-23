import React from "react";
import ReactLoading from "react-loading";
const LoadingPage = ({ message }) => {
  return (
    <div className="manage-modal ">
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          maxWidth: "300px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "30px",
          padding: "10px",
        }}
      >
        <ReactLoading type="spin" width={100} height={50} color="black" />
        <p
          style={{
            marginTop: "40px",
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
