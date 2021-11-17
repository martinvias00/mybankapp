import React, { useState } from "react";
import method from "../../localStorageManager";

const ExpenseTable = ({ accNo, expense, listOfItems }) => {
  const [expenses, setexpenses] = useState(() => method.getLocalexpense());

  const [editFormData, seteditFormData] = useState({
    expenseno: "",
    accountNo: "",
    name: "",
    date: "",
    item: "",
    description: "",
    purpose: "",
    total: 0,
  });
  const [Editexpenseno, setEditexpenseno] = useState(null);

  const handleEditForm = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    seteditFormData(newFormData);
  };

  const handleEditClick = (event, expense) => {
    event.preventDefault();
    setEditexpenseno(expense.expenseno);
    const formValues = {
      item: expense.item,
      description: expense.description,
      purpose: expense.purpose,
      total: expense.total,
    };
    seteditFormData(formValues);
  };
  const handleCancelClick = () => {
    setEditexpenseno(null);
  };
  const handleDeleteClick = (expensesno) => {
    const newExpense = [...expenses];
    const index = expenses.findIndex((temp) => temp.expenseno === expensesno);
    newExpense.splice(index, 1);
    setexpenses(newExpense);
  };
  return (
    <div>
      <form>
        <table
          id="accounts"
          className="ItemTable"
          style={{
            borderRadius: "10px",
            boxShadow: " -4px -3px 45px 21px rgba(0, 0, 0, 0.18)",
          }}
        >
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Purpose</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {console.log(expenses)}
            {expenses
              // .filter((temp) => temp.accountNo === accNo)
              .map((temp) => {
                return (
                  <>
                    {Editexpenseno === temp.expenseno ? (
                      <tr key={temp.expenseno}>
                        <td>
                          <input
                            type="text"
                            required="required"
                            placeholder="Enter a item..."
                            name="item"
                            value={editFormData.item}
                            onChange={() => handleEditForm}
                            style={InputStyle}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            required="required"
                            placeholder="Enter an description..."
                            name="description"
                            value={editFormData.description}
                            onChange={handleEditForm}
                            style={InputStyle}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="text"
                            required="required"
                            placeholder="Enter a purpose..."
                            name="purpose"
                            value={editFormData.purpose}
                            onChange={handleEditForm}
                            style={InputStyle}
                          ></input>
                        </td>
                        <td>
                          <input
                            type="number"
                            required="required"
                            placeholder="Enter an total..."
                            name="total"
                            value={editFormData.total}
                            onChange={handleEditForm}
                            style={InputStyle}
                          ></input>
                        </td>
                        <td>
                          <button
                            type="submit"
                            style={{
                              width: "50px",
                              height: "30px",
                              border: ".5px unset",
                              borderRadius: "10px",
                              color: "green",
                              textAlign: "center",
                            }}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelClick}
                            style={{
                              width: "50px",
                              height: "30px",
                              border: ".5px unset",
                              borderRadius: "10px",
                              color: "red",
                              textAlign: "center",
                            }}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={temp.expenseno}>
                        <td>{temp.item}</td>
                        <td>{temp.description}</td>
                        <td>{temp.purpose}</td>
                        <td>{temp.total}</td>
                        <td>
                          <button
                            type="button"
                            onClick={(event) => handleEditClick(event, temp)}
                            style={{
                              width: "50px",
                              height: "30px",
                              border: ".5px unset",
                              borderRadius: "10px",
                              color: "green",
                              textAlign: "center",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(temp.expenseno)}
                            style={{
                              width: "50px",
                              height: "30px",
                              border: ".5px unset",
                              borderRadius: "10px",
                              color: "red",
                              textAlign: "center",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ExpenseTable;

const InputStyle = {
  textAlign: "center",
  border: "none",
  backgroundColor: "transparent",
  resize: "none",
  outline: "none",
};
