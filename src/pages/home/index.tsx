import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          navigate("/hls-demo");
        }}
      >
        Redirect to hls demo
      </button>
      <button
        type="button"
        onClick={() => {
          navigate("/sigma-demo");
        }}
      >
        Redirect to sigma demo
      </button>
    </>
  );
}

export default HomePage;
