import React, { useState, useEffect } from "react";
import Input from "../Input";
const ExpenseForm = ({ setexpenseEntry }) => {
  const corporateExpense = [
    "petty cash",
    "loan",
    "workforce pay",
    "nececities",
  ];

  const [eno, seteno] = useState("");
  const [ename, setename] = useState("");
  const [eitem, seteitem] = useState("");
  const [eid, seteid] = useState("");
  const [edate, setedate] = useState(() => new Date().toDateString());
  const [edesc, setedesc] = useState("");
  const [epurpose, setpurpose] = useState("");
  const [etotal, settotal] = useState("");
  const [eautorizeby, setautorizeby] = useState("");
  const [expense, setexpense] = useState({
    expenseno: eno,
    employeename: ename,
    employeeid: eid,
    date: edate,
    description: edesc,
    purpose: epurpose,
    total: etotal,
    autorizedby: eautorizeby,
  });

  useEffect(() => {
    setexpense({
      expenseno: eno,
      employeename: ename,
      employeeid: eid,
      date: edate,
      description: edesc,
      purpose: epurpose,
      total: etotal,
      autorizedby: eautorizeby,
    });
    setexpenseEntry({
      expenseno: eno,
      employeename: ename,
      employeeid: eid,
      date: edate,
      description: edesc,
      purpose: epurpose,
      total: etotal,
      autorizedby: eautorizeby,
    });
  }, [eno, ename, eid, edate, edesc, epurpose, etotal, eautorizeby]);
  useEffect(() => {}, [input]);

  return (
    <form style={formStyle}>
      <Input
        type="text"
        text="Date"
        name="date"
        value={edate}
        setState={setedate}
        isdiable={false}
        errorMessage={""}
      />

      <Input
        type="text"
        text="Autorized by"
        name={eautorizeby}
        value={eautorizeby}
        setState={setautorizeby}
        isdiable={false}
        errorMessage={""}
        hasAlist={false}
      />

      <Input
        type="text"
        text="Item"
        name="item"
        value={eitem}
        setState={seteitem}
        isdiable={false}
        errorMessage={""}
      />
      <Input
        type="text"
        text="Description"
        name="description"
        value={edesc}
        setState={setedesc}
        isdiable={false}
        errorMessage={""}
      />
      <Input
        type="text"
        text="Purpose"
        name="purpose"
        value={epurpose}
        setState={setpurpose}
        isdiable={false}
        errorMessage={""}
        list={corporateExpense}
        hasAlist={true}
      />

      <Input
        type="text"
        text="total"
        name={etotal}
        value={etotal}
        setState={settotal}
        isdiable={false}
        errorMessage={""}
        hasAlist={false}
        inputStyle={{ border: `2px blue solid` }}
      />
    </form>
  );
};

export default ExpenseForm;

const formStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignContent: "flex-start",
  alignItems: "start",
  justifyItems: "left",
  justifyContent: "space-evenly",
  marginLeft: "180px",
};
// const necessities = [
//   "Transportation",
//   "Groceries and other essentials",
//   "Bills",
// ];
// const wants = [
//   "Travel expenses",
//   "Movie, concert and event tickets",
//   "Dining out",
// ];
