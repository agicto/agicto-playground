import React, { useState, useEffect } from "react";
import { getUserInfo } from "../services/index";
 
const CommonHooks = () => {
  const [userInfo, setUserInfo] = useState(null);

  const initUserInfo = async () => {
    const res = await getUserInfo();
    if (res?.code !== 0) {
      setUserInfo(null);
      return;
    }
    setUserInfo(res?.data);
    localStorage.setItem('userInfo', JSON.stringify(res?.data))

  };
  // useEffect(() => {
  //   initUserInfo();
  // }, []);

  return {
    userInfo,
    initUserInfo
  };
};

export default CommonHooks;
