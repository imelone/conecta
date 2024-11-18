import React from "react";

const Home: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: "url('/assets/images/home.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default Home;
