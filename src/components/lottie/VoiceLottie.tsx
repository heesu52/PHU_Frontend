import React from 'react';
import Lottie from 'lottie-react';
import animationData from "./voice.json"

const Voicelottie = () => {
  return <Lottie animationData={animationData} loop={true} style={{ height: 130, width: 130}} />;
};

export default Voicelottie;
