const StorageService = {
  SetLocalStorage(key, value) {
    localStorage.setItem(key, value);
  },
  getLocalStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.log("get token error");
    }
  },
  removeItemToken(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log("error remove Token");
    }
  },
};

export default StorageService;
