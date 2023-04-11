import loading from "../assets/Lottie/DefaultLoading.json";
import Lottie from "lottie-react";

const Loading = ({ size }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie animationData={loading} loop={true} style={{ width: size }} />
    </div>
  );
};
export default Loading;
