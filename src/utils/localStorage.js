const tokenKey = "token";
/**
 * 设置localStorage缓存
 * @param {key} 存储的键值
 * @param {value} 存储的值
 */
export const setLocalStorage = (key, value) => {
  try {
    return localStorage.setItem(key, value);
  } catch (error) {}
};

/**
 * 获取localStorage缓存
 * @param {key} 获取的键值
 */
export const getLocalStorage = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return "";
  }
};

/**
 *  清除指定localStorage缓存
 * @param {key} 清除的键值
 */
export const removeLocalStorage = (key) => {
  return window.localStorage.removeItem(key);
};

/**
 * 清楚全部的缓存
 */
export const clearLocalStorge = () => {
  return window.localStorage.clear();
};

/**
 * 设置TokenKey
 */
export const setTokenKey = (value) => {
  return setLocalStorage(tokenKey, value);
};

/**
 * 获取TokenKey
 */
export const getTokenKey = () => {
  return getLocalStorage(tokenKey);
};

/**
 * 清掉TokenKey
 */
export const clearTokenKey = () => {
  return removeLocalStorage(tokenKey);
};

