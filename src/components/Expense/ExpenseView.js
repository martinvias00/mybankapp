import React, { useState, useEffect } from "react";
import method from "../../localStorageManager";
import ExpenseTable from "./ExpenseTable";
import ExpenseChartForIndividual from "./ExpenseChartForIndividual";
const ExpenseView = ({ listOfItems, accounts }) => {
  const [ChartList, setChartList] = useState([]);
  const [AccountInfo, setAccountInfo] = useState({
    accNo: "",
    name: "",
    balance: 0,
    accExpense: 0,
    balwithExpense: 0,
  });
  const [accNo, setaccNo] = useState("");
  const [accountSelected, setaccountSelected] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
    email: "",
    accountNo: "",
    balance: 0,
  });
  const [expense, setexpense] = useState(method.getLocalexpense());

  const handleSelectChange = (accNo2) => {
    setaccNo(accNo2);
    setaccountSelected(accNo2);
    let x = 0;
    const userDetails = accounts.filter((acc) => acc.accountNo === accNo2)[0];
    const userexpense = expense
      .filter((item) => item.accountNo === accNo2)
      .map((items) => {
        return items.total;
      });

    if (userexpense.length > 1) {
      x = userexpense.reduce((x, y) => parseInt(x) + parseInt(y));
    } else if (userexpense.length === 1) {
      x = userexpense;
    } else {
      x = 0;
    }

    const expenseAmount = parseInt(userDetails.balance) - parseInt(x);
    let newInfo = {
      accNo: "",
      name: "",
      balance: 0,
      accExpense: 0,
      balwithExpense: 0,
    };
    if (userexpense) {
      newInfo = {
        accNo: accNo2,
        name: userDetails.name,
        balance: userDetails.balance,
        accExpense: x,
        balwithExpense: expenseAmount,
      };
    }

    setChartList([x, userDetails.balance, accNo2]);
    setAccountInfo(newInfo);
  };
  useEffect(() => {
    const userDetails = accounts.filter(
      (acc) => acc.accountNo === expense.accountNo
    );

    const userexpense = method
      .getLocalexpense()
      .filter((item) => item.accountNo === expense.accountNo)
      .map((items) => {
        return items.total;
      });

    const y = expense.total + userDetails.balance;
    setChartList([userexpense, y, userexpense.accountNo]);
    let newInfo = {
      accNo: expense.accountNo,
      name: expense.name,
      balance: userDetails.balance,
      accExpense: userexpense,
      balwithExpense: 0,
    };
    setAccountInfo(newInfo);
  }, [expense, accounts]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "97%",
          height: "90%",
          backgroundColor: "white",
          marginLeft: "20px",
          borderRadius: "10px",
          boxShadow: " -4px -3px 45px 21px rgba(0,0,0,0.18)",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
            marginTop: "25px",
          }}
        >
          <div
            style={{
              width: "395px",
              height: "100px",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <select
              name="accountno1"
              onChange={(e) => {
                e.preventDefault();
                handleSelectChange(e.target.value);
              }}
              style={{
                width: "250px",
                display: "flex",
                justifyContent: "center",
                border: "1px green solid",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              {accounts &&
                accounts
                  // .filter((item) => expense.accountNo === item.accountNo)
                  .map((item, index) => {
                    return (
                      <option key={index} value={item.accountNo}>
                        {item.accountNo} / {item.name}
                      </option>
                    );
                  })}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                paddingLeft: "5px",

                width: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",

                flex: 1,
              }}
            >
              <span style={accountInfoStyle}>
                <h5 style={titleStyle}>Balance</h5>
                <p style={amountStyle}>{AccountInfo.balance}</p>
              </span>
              <span style={accountInfoStyle}>
                <h5 style={titleStyle}>Expense</h5>
                <p style={amountStyle}>{AccountInfo.accExpense}</p>
              </span>
              <span style={accountInfoStyle}>
                <h5 style={titleStyle}>Total</h5>
                <p style={amountStyle}>{AccountInfo.balwithExpense}</p>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "70%",
                height: "100%",
                marginBottom: "20px",
              }}
            >
              <ExpenseChartForIndividual
                ChartList={ChartList}
                expense={expense}
              />
            </div>
          </div>
          <ExpenseTable
            accountSelected={accountSelected}
            accNo={accNo}
            expense={expense}
            listOfItems={listOfItems}
            setexpense={setexpense}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseView;

const titleStyle = { width: "200px", textAlign: "center" };
const amountStyle = { width: "200px", textAlign: "left" };
const accountInfoStyle = {
  display: "flex",
  width: "100%",
  height: "50px",
  justifyContent: "space-evenly",
  textAlign: "left",
  border: "none",
  backgroundColor: "transparent",
  resize: "none",
  outline: "none",
  fontSize: "1.5em",
};
