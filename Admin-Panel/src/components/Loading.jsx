import loading from "../assets/Lottie/DefaultLoading.json";
import Lottie from "lottie-react";

const Loading = ({ size }) => {
  return (
    <div className="loadingAnimation">
      <Lottie animationData={loading} loop={true} className="loading" />
    </div>
  );
};
export default Loading;
