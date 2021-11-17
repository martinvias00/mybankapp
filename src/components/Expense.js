import React, { useState, useEffect } from "react";
import method from "../localStorageManager";
import Input from "./Input";
import ExpenseView from "./Expense/ExpenseView";
const Expense = ({ accounts, transacs }) => {
  const borderInputColor = "#4caf50";

  const corporateExpense = [
    "petty cash",
    "loan",
    "workforce pay",
    "nececities",
  ];

  const [nameError, setnameError] = useState("");
  const [itemError, setitemError] = useState("");
  const [totalError, settotalError] = useState("");
  const [descError, setdescError] = useState("");
  const [purposeError, setpurposeError] = useState("");
  const [actionbtn, setactionbtn] = useState("bdgtExp");

  const [ename, setename] = useState("");
  const [eitem, seteitem] = useState("");
  const [eid, seteid] = useState("");
  const [edate, setedate] = useState(() => new Date().toDateString());
  const [edesc, setedesc] = useState("");
  const [epurpose, setpurpose] = useState("");
  const [etotal, settotal] = useState("");
  const [balance, setbalance] = useState(0);
  const [listOfItems, setlistOfItems] = useState(null);
  const [items, setitems] = useState({
    item: eitem,
    description: edesc,
    purpose: epurpose,
    total: etotal,
  });

  useEffect(() => {
    setitems({
      item: eitem,
      description: edesc,
      purpose: epurpose,
      total: etotal,
    });
  }, [eitem, edesc, epurpose, etotal]);
  const handledel = (id) => {
    const newitem = listOfItems.filter((itemx) => itemx.ItemID !== id);
    setlistOfItems(newitem);
  };
  const renderBody = () => {
    if (listOfItems !== null) {
      return listOfItems.map((temp, index) => {
        return (
          <tr key={index} id={temp.ItemID}>
            <td>{temp.item}</td>
            <td>{temp.description}</td>
            <td>{temp.purpose}</td>
            <td>{temp.total}</td>
            <td>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handledel(temp.ItemID);
                }}
                style={deleteStyle}
              >
                delete
              </button>
            </td>
          </tr>
        );
      });
    }
  };
  const handleAddExpenseItem = (e) => {
    e.preventDefault();
    const templist = listOfItems;
    if (eitem === "" && edesc === "" && epurpose === "" && etotal === "") {
      const err = "Empty Field";
      setitemError(err);
      setdescError(err);
      setpurposeError(err);
      settotalError(err);
    } else if (etotal === "") {
      const err = "Required field need total amount.";
      settotalError(err);
    } else {
      setitemError("");
      setdescError("");
      setpurposeError("");
      settotalError("");
      const ranId = `x${Math.floor(Math.random() * 1000 + 20)}x`;
      let newitem = { ...items, ItemID: ranId };
      if (listOfItems === null) {
        setlistOfItems([newitem]);
      } else {
        setlistOfItems([...templist, newitem]);
      }
    }
    seteitem("");
    setedesc("");
    setpurpose("");
    settotal("");
  };
  return (
    <div>
      <div className="ExpenseNavBtns">
        <button
          onClick={() => {
            setactionbtn("bdgtExp");
          }}
        >
          view
        </button>
        <button
          onClick={() => {
            setactionbtn("add");
          }}
        >
          Add
        </button>
      </div>
      {actionbtn === "add" && (
        <div className="ExpenseContainer">
          <div className="ExpenseHeadform">
            <Input
              type="text"
              text="Date"
              name="date"
              value={edate}
              setState={setedate}
              isdiable={false}
              errorMessage={""}
            />

            <span style={selectStyleWrapper}>
              <select
                required="---select an Account----"
                name="employeeid"
                onChange={(e) => {
                  const item = e.target.value.split(",");
                  setename(item[0]);
                  seteid(item[1]);
                  setbalance(item[2]);

                  e.preventDefault();
                }}
                style={
                  (selectStyle,
                  {
                    border: `2px ${borderInputColor} solid`,
                  })
                }
              >
                <option value="" disabled selected hidden>
                  Choose an Account...
                </option>
                {accounts.map((item) => (
                  <option
                    key={item.id}
                    value={[item.name, item.accountNo, item.balance]}
                  >
                    {item.accountNo} {item.name}
                  </option>
                ))}
              </select>
            </span>
            <Input
              type="text"
              text="name"
              name="name"
              value={ename}
              setState={setename}
              isdiable={false}
              errorMessage={nameError}
            />
            <Input
              type="text"
              text="Balance"
              name="Balance"
              value={balance}
              setState={setbalance}
              isdiable={false}
              errorMessage={""}
            />

            <Input
              type="text"
              text="Item"
              name="item"
              value={eitem}
              setState={seteitem}
              isdiable={false}
              errorMessage={itemError}
            />
            <Input
              type="text"
              text="Description"
              name="description"
              value={edesc}
              setState={setedesc}
              isdiable={false}
              errorMessage={descError}
            />
            <Input
              type="text"
              text="Purpose"
              name="purpose"
              value={epurpose}
              setState={setpurpose}
              isdiable={false}
              errorMessage={purposeError}
              list={corporateExpense}
              hasAlist={true}
            />
            <Input
              type="number"
              text="total"
              name={etotal}
              value={etotal}
              setState={settotal}
              isdiable={false}
              errorMessage={totalError}
              hasAlist={false}
            />
          </div>

          <table id="accounts" className="ItemTable" style={tableStyle}>
            <thead>
              <tr>
                {["item", "description", "purpose", "total", "actions"].map(
                  (key, index) => (
                    <th key={index}>{key.toUpperCase()}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>{renderBody()}</tbody>
          </table>
          <span className="addexpenseItemBtn" style={addStyleContainer}>
            <button
              onClick={(e) => {
                handleAddExpenseItem(e);
              }}
              style={addStyle}
            >
              +
            </button>
          </span>
          <div className="saveWrapper" style={{ alignSelf: "flex-start" }}>
            <button
              style={saveStyle}
              onClick={(e) => {
                e.preventDefault();

                if (ename === "" || eid === "") {
                  setnameError("Account name cant be Empty..");
                } else {
                  setnameError("");

                  listOfItems &&
                    listOfItems.forEach((temp) => {
                      let xvar = {
                        expenseno:
                          "xc" + (Math.random() * 450145 + 5454) + "kqx",
                        name: ename,
                        id: eid,
                        date: edate,
                        item: temp.item,
                        description: temp.description,
                        purpose: temp.purpose,
                        total: temp.total,
                      };
                      method.updateLocalexpense(xvar);
                      setlistOfItems(null);
                      setename("");
                      setbalance("");
                    });
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {actionbtn === "bdgtExp" && (
        <ExpenseView listOfItems={listOfItems} accounts={accounts} />
      )}
    </div>
  );
};

export default Expense;

const deleteStyle = {
  width: "50px",
  height: "30px",
  border: ".5px unset",
  borderRadius: "10px",
  color: "red",
  textAlign: "center",
};
const saveStyle = {
  width: "100px",
  height: "60px",
  borderRadius: "25px",

  border: ".5px #4caf50 unset",
  marginLeft: "10px",
};
const addStyle = {
  display: "block",
  backgroundColor: "#f5f5f5",
  mariginRight: "20px",
  width: "60px",
  height: "50px",
  border: ".5px #4caf50 unset",
  borderRadius: "50%",
  mariginTop: "5500px",
  fontSize: "2em",
  fontFamily: "fantasy",
  color: "#4caf50",
  borderColor: "#4caf50",
};
const addStyleContainer = {
  height: "50px",
  width: "100%",
  display: "flex",
  marginRight: "50px",
  justifyContent: "flex-end",
};
const tableStyle = {
  borderRadius: "10px",
  boxShadow: " -4px -3px 45px 21px rgba(0, 0, 0, 0.18)",
};
const selectStyle = {
  width: "200px",
  height: "40px",
  textAlign: "center",
  borderRadius: "10px",
};
const selectStyleWrapper = {
  height: "100%",
  width: "86%",
  display: "flex",
  justifyContent: "flex-end",
  justifyItems: "right",
  alignItems: "flex-end",
  marginBottom: "10px",
  paddingTop: "5px",
  paddingRight: "100px",
  border: "0px",
};
