import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [needToUpdColors, setNeedToUpdColors] = useState(true)
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    if(needToUpdColors === true) {
      axiosWithAuth()
        .get("/colors")
        .then(res => {
          setColorList(res.data)
        })
        .catch(err => console.log(err.message))
        setNeedToUpdColors(false)
    }
  },[needToUpdColors])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setNeedToUpdColors={setNeedToUpdColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
