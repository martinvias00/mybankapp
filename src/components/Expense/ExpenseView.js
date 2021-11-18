import React, { useState } from "react";
import ExpenseTable from "./ExpenseTable";
import ExpenseChartForIndividual from "./ExpenseChartForIndividual";
const ExpenseView = ({ setexpense, expense, accounts, listofexpense }) => {
  const [ChartList, setChartList] = useState([]);
  const [AccountInfo, setAccountInfo] = useState({
    accNo: "",
    name: "",
    balance: 0,
    accExpense: 0,
    balwithExpense: 0,
  });

  const handleSelectChange = (accNo2) => {
    const expenseList = [...listofexpense];
    const userDetails = accounts.filter((acc) => acc.accountNo === accNo2)[0];

    let userexpense = expenseList.filter((exp) => exp.id === accNo2)[0];

    let x = userexpense.list
      .map((items) => {
        return items.total;
      })
      .reduce((x, y) => parseInt(x) + parseInt(y));
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
          {console.log(expense)}
          <ExpenseTable
            expense={expense}
            setexpense={setexpense}
            setChartList={setChartList}
            accounts={accounts}
            setAccountInfo={setAccountInfo}
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
