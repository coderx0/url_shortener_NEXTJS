import Lottie from "lottie-react";
import loading from "./loading.json";

function Loading() {
  return (
      <Lottie
     className="h-48"
          animationData={loading} loop autoPlay />
  );
}

export default Loading;
