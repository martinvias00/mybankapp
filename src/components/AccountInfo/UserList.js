import React, { useState, useEffect } from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
import method from "../../localStorageManager";
const UserList = ({ OnlistView, setOnlistView, accounts2 }) => {
  const [accounts, setaccounts] = useState(() => method.getLocalaccounts());
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setresult] = useState([]);

  useEffect(() => {
    setaccounts(() => method.getLocalaccounts());
  }, [accounts2]);
  // ====

  useEffect(() => {
    if (searchTerm === "") {
      setaccounts(method.getLocalaccounts());
    } else {
      const results = accounts.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setresult(results);
    }
  }, [searchTerm, accounts]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const renderHeader = () => {
    let headerElement = [
      "id",
      "name",
      "username",
      "email",
      "accountNo",
      "balance",
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  // ====
  const renderBody = () => {
    return (
      accounts &&
      accounts.map(({ id, name, username, email, accountNo, balance }) => {
        return (
          <tr key={id}>
            <td>
              <input checked={id} type="checkbox" />
            </td>
            <td>{id}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{accountNo}</td>
            <td>{balance}</td>
          </tr>
        );
      })
    );
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          marginLeft: 20,
        }}
      >
        <button
          onClick={(e) => {
            setOnlistView("form");
            e.preventDefault();
          }}
          style={{
            width: "100px",
            height: "50px",
            alignSelf: "left",
            border: "1px gray solid",
          }}
        >
          Form
        </button>
        <button
          onClick={(e) => {
            setOnlistView("list");
            e.preventDefault();
          }}
          style={{
            width: "100px",
            height: "50px",
            alignSelf: "left",
            border: "1px gray solid",
          }}
        >
          List
        </button>
      </div>

      <div
        className="dashboardContainer"
        style={{
          width: "96.8%",
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "center",
          justifySelf: "center",
          marginLeft: "20px",
          borderRadius: "10px",

          height: "100%",
        }}
      >
        <h1 id="title">Accounts</h1>
        <input
          type="text"
          placeholder=" Search"
          value={searchTerm}
          onChange={handleChange}
          style={{
            width: "250px",
            height: "35px",
            alignSelf: "center",
            marginBottom: "20px",
            border: "1px green solid",
          }}
        />

        {searchTerm && result.length === 0 ? (
          <h1>No matches found. Try a different search...</h1>
        ) : (
          <table
            id="accounts"
            style={{
              borderRadius: "10px",
            }}
          >
            <thead>
              <tr>
                <th key={"c"}>
                  <AiOutlineCheckSquare />
                </th>
                {renderHeader()}
              </tr>
            </thead>
            <tbody>{renderBody()}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
