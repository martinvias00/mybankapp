import data from "./db/data";
const history = "history",
  users = "users",
  currentuser = "currentuser",
  accounts = "accounts",
  expense = "expense";
const method = {
  initLocaldata: function () {
    localStorage.setItem(history, JSON.stringify(data.history));
    localStorage.setItem(users, JSON.stringify(data.user));
    localStorage.setItem(accounts, JSON.stringify(data.accounts));
    localStorage.setItem(expense, JSON.stringify(data.expense));
  },
  setLocaluser: function (user) {

    localStorage.setItem(users, JSON.stringify(user));
  },
  setLocaltransacs: function (transacs) {
    localStorage.setItem(history, JSON.stringify(transacs));
  },
  setLocalcurr: function (user) {
    localStorage.setItem(currentuser, JSON.stringify(user));
  },
  setLocalaccounts: function (account) {
    localStorage.setItem(accounts, JSON.stringify(account));
  },

  addLocalaccounts: function (account) {
    const newItem = method.getLocalaccounts();

    newItem.push(account);
  
    method.setLocalaccounts(newItem);
  },
  addLocaltransacs: function (transacs) {
    const newItem = method.getLocaltransacs();
    newItem.push(transacs);
    method.setLocaltransacs(newItem);
  },
  addLocaluser: function (user) {
    const newItem = method.getLocaluser();
    newItem.push(user);
    method.setLocaluser(newItem);
  },

  getLocaluser: function () {
    return JSON.parse(localStorage.getItem(users));
  },
  getLocaltransacs: function () {
    return JSON.parse(localStorage.getItem(history));
  },
  getLocalcurr: function () {
    return JSON.parse(localStorage.getItem(currentuser));
  },
  getLocalaccounts: function () {
    return JSON.parse(localStorage.getItem(accounts));
  },

  updateLocaluser: function (user) {
    const newItem = method.getLocalcurr();
    method.setLocaluser(newItem);
  },
  updateLocaltransacs: function (transacs) {
    const newItem = method.getLocaltransacs();
    newItem.unshift(transacs);
    method.setLocaltransacs(newItem);
  },
  updateLocalcurr: function (user) {
    const newItem = method.getLocalcurr();

    newItem.push(user);
    method.setLocalcurr(newItem);
  },
  updateLocalaccounts: function (user) {
    const newItem = method.getLocalaccounts();
    newItem.push(user);
    method.setLocalaccounts(newItem);
  },

  setLocalexpense: function (expense1) {
    localStorage.setItem(expense, JSON.stringify(expense1));
  },
  addLocalexpense: function (expense) {
    const newItem = method.getLocalexpense();
    newItem.push(expense);
    method.setLocalexpense(newItem);
  },
  getLocalexpense: function () {
    return JSON.parse(localStorage.getItem(expense));
  },
  updateLocalexpense: function (expense) {

    const newItem = method.getLocalexpense();

    newItem.push(expense);
    method.setLocalexpense(newItem);
  },
  clearLocaluser: function () {
    localStorage.removeItem(users);
  },
  clearLocaltransacs: function () {
    localStorage.removeItem(history);
  },
  clearLocalcurrentuser: function () {
    localStorage.removeItem(currentuser);
  },
  clearLocalaccount: function () {
    localStorage.removeItem(accounts);
  },
  clearLocalexpense: function () {
    localStorage.removeItem(expense);
  },

  rmLocalaccount: function (account) {
    const newItem = method.getLocalaccounts();
    method.setLocalaccounts(newItem.filter((item) => item.id !== account));
  },
  rmLocaluser: function (user) {
    const newItem = method.getLocaluser();
    method.setLocaluser(newItem.reduce((item) => item.id === user.id));
  },

  rmLocalexpense: function (expense) {
    const newItem = method.getLocaluser();
    method.setLocaluser(newItem.reduce((item) => item.id === expense.id));
  },
};

export default method;
