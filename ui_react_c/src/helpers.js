import moment from "moment";

const tokenName = "cashless_sanctum_token";

const getToken = () => window.localStorage.getItem(tokenName);

const setToken = (token) => window.localStorage.setItem(tokenName, token);

const clearToken = () => window.localStorage.removeItem(tokenName);

const dateStringToLocal = (date) => {
  var stillUtc = moment.utc(date).toDate();
  return moment(stillUtc).local().format("YYYY-MM-DD hh:mm:ss");
};

const toMoney = (price) => {
  return "₱" + price.toFixed(2);
};

export { getToken, setToken, clearToken, dateStringToLocal, toMoney };
