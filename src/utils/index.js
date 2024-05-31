import moment from "moment";
import { toast } from "react-toastify";

export const checkServer = () => {
  return typeof window === "undefined";
};

export const isLogin = () => {
  if (!checkServer()) {
    const token = localStorage.getItem("token");
    return !!token;
  }
  return false;
};

export const isPc = () => {
  if (checkServer()) return true;
  if (!navigator || !navigator.userAgent) {
    return false;
  }
  const ua = navigator?.userAgent?.toLowerCase();
  if (
    /AppleWebKit.*Mobile/i.test(ua) ||
    /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(
      ua
    )
  ) {
    return !/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(ua);
  }
  return true;
};

// 判断微信环境
export const isWeixin = () => {
  if (checkServer()) return false;
  const u = navigator.userAgent;
  return !!u.match(/MicroMessenger/i);
};

/**
 * 判断用户浏览器终端信息
 *
 * browser.versions.ios 判断是否是IOS设备
 */
export const browser = () => {
  if (navigator) {
    const u = navigator ? navigator.userAgent : "";
    return {
      trident: u.indexOf("Trident") > -1, // IE内核
      presto: u.indexOf("Presto") > -1, // opera内核
      webKit: u.indexOf("AppleWebKit") > -1, // 苹果、谷歌内核
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, // android终端
      iPhone: u.indexOf("iPhone") > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf("iPad") > -1, // 是否iPad
      webApp: u.indexOf("Safari") === -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf("MicroMessenger") > -1, // 是否微信
      // qq: u.match(/\sQQ/i) === ' qq', // 是否QQ
    };
  }
  return {};
};

/**
 * 获取url参数数据，返回obj对象
 */
export const getUrlToJson = (url) => {
  try {
    const strUrl = url || window?.location?.href || "";
    const temp1 = strUrl.split("?");
    const pram = temp1[1];
    if (pram === "undefined" || !pram) {
      return {};
    }
    const keyValue = pram.split("&");
    const obj = {};
    for (let i = 0; i < keyValue.length; i++) {
      const item = keyValue[i].split("=");
      const key = item[0];
      const value = item[1];
      obj[key] = value;
    }
    return obj;
  } catch (error) {
    return {};
  }
};

export const copyValue = (value) => {
  const inputValue = document.createElement("input"); // 创建DOM元素
  document.body.appendChild(inputValue); // 将创建的DOM插入到Body上
  inputValue.value = value; // 将数据赋值给创建的DOM元素的Value上
  inputValue.select(); // 通过表单元素的select()方法选中内容
  document.execCommand("copy"); // 执行浏览器复制命令
  document.body.removeChild(inputValue); // 移除DOM元素
  toast.success("复制成功");
};

/**
 * 时间戳转化为日期字符串
 * @param {timestamp} stamp 时间戳
 * @param {bool} unix 秒级使用unix
 * @param {string} format 格式化字符串
 */
export const formatTime = (
  stamp,
  unix = true,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  return unix
    ? moment.unix(stamp).format(format)
    : moment(stamp).format(format);
};

export const vaildEmail = (email) => {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailReg.test(email);
};
