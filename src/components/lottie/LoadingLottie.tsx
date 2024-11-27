import React from 'react';
import Lottie from 'lottie-react';
import animationData from "./loading.json"

const Loadinglottie = () => {
  return <Lottie animationData={animationData} loop={true} style={{ height: 130, width: 130}} />;
};

export default Loadinglottie;
