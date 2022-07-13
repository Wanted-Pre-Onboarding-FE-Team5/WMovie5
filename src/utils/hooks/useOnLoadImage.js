import { useState } from "react";

const useOnLoadImage = () => {
  const [isLoadedImage, setIsLoadedImage] = useState(false);

  const imageOnLoadHandler = () => {
    setIsLoadedImage(true);
  };

  return { isLoadedImage, imageOnLoadHandler}
};

export default useOnLoadImage;
