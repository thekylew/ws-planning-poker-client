import { useState, useEffect } from "react";

const useDimensions = (ref) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    console.log(ref);
    if (ref && ref.current) {
      setHeight(ref.current.clientHeight);
      setWidth(ref.current.clientWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { height, width };
};

export default useDimensions;
