import React, { useState, useEffect } from "react";
import method from "../../localStorageManager";
import Input from "../Input";

const Deposit = ({ setamount, accountno1, amount, settransacs }) => {
  const [error, seterror] = useState("");
  useEffect(() => {
    if (/[-]+/.test(amount)) {
      seterror("Amount cannot be negative");
    } else {
      seterror("");
    }
  }, [amount, seterror]);
  return (
    <div
      className="container"
      style={{
        width: "70%",
        height: "60vh",
        backgroundColor: "white",
        marginLeft: "20px",
        marginRight: "20px",
        borderRadius: "10px",
        boxShadow: " -4px -3px 45px 21px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Deposit</h1>
      <Input
        text="amount"
        name="amount"
        type="number"
        value={amount === 0 ? "" : amount}
        setState={setamount}
        isdiable={false}
        errorMessage=""
      />
      <span>{error}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          const newobjt = method
            .getLocalaccounts()
            .filter((item) => item.accountNo === accountno1);
          if (newobjt.length !== 0) {
            const oldList = method.getLocalaccounts();
            const list1 = newobjt[0];
            if (parseInt(amount) > 0) {
              const newbalance =
                parseInt(newobjt[0].balance) + parseInt(amount);
              const nobjt = {
                id: list1.id,
                name: list1.name,
                username: list1.username,
                password: list1.password,
                email: list1.email,
                accountNo: list1.accountNo,
                balance: newbalance,
              };
              const xlist = oldList.map((item) => {
                if (item.id === list1.id) {
                  return nobjt;
                } else {
                  return item;
                }
              });
              method.setLocalaccounts(xlist);

              const date1 = new Date().toDateString();
              const newtrasac = {
                employeeId: method.getLocalcurr().id,
                accountNo: newobjt[0].accountNo,
                transferto: "",
                name: newobjt[0].name,
                refNo: Math.floor(Math.random() * 500) + 5012 + "MWX",
                date: date1,
                type: "deposit",
                amount: amount,
              };
              method.updateLocaltransacs(newtrasac);
              settransacs(method.getLocaltransacs());
              setamount(0);
            }
          }
        }}
      >
        submit
      </button>
    </div>
  );
};

export default Deposit;
