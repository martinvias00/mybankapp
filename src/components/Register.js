import Input from "./Input";
import { useState } from "react";
import method from "../localStorageManager";
import Loading2 from "./Loading/Loading2";

const Register = ({ onRegister, setonRegister }) => {
  const [users] = useState(method.getLocaluser());
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [email, setemail] = useState("");
  const [nameError, setnameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [complete, setcomplete] = useState(undefined);
  function handleSubmit() {
    const old = users;
    const newAccount = {
      id: users.length + 1,
      name: FirstName + " " + LastName,
      email: email,
      username: email.split("@")[0],
      password: Password,
    };
    if (!ifError(newAccount)) {
      old.push(newAccount);
      method.setLocaluser(old);
      setcomplete(true);
      setTimeout(() => {
        setonRegister(false);
      }, 2000);
    }
  }
  const ifError = ({ email }) => {
    let errorcount = 0;
    if (FirstName === "" || LastName === "") {
      setnameError("! Enter first and last names");
      errorcount++;
    } else {
      setnameError("");
    }
    if (email === "") {
      setemailError("! Enter email address");
      errorcount++;
    } else if (users.find((user) => user.email === email)) {
      setemailError("! That email is taken. Try another.");
      errorcount++;
    } else if (/[!#$%^&*()_+]+/.test(email)) {
      setemailError(
        "! Sorry, only letters(a-z), numbers(0-9),and perids(.)are allowed."
      );
      errorcount++;
    } else {
      setemailError("");
    }
    if (Password !== confirm) {
      setpasswordError("! Those passwords didn’t match. Try again.");
      errorcount++;
    } else if (Password === "" || confirm === "") {
      setpasswordError("! Enter password");
      errorcount++;
    } else {
      setpasswordError("");
    }
    if (errorcount > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <header style={{ height: "100px" }}></header>
      <div
        style={{
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: "1px gray solid",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        {complete ? <Loading2 /> : null}
        <span
          style={{
            fontSize: "2em",
            paddingBottom: "10px",
          }}
        >
          Create your Account
        </span>
        <form
          className="register"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          style={{
            width: "430px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Input
              text={"First name"}
              name={"FirstName"}
              placeholder={"First name"}
              type="text"
              value={FirstName}
              setState={setFirstName}
              errorMessage={nameError}
            />
            <Input
              text={"Last name"}
              name={"Last name"}
              placeholder={"Last name"}
              type="text"
              value={LastName}
              setState={setLastName}
              errorMessage={nameError}
            />
          </div>
          <Input
            text={"Email"}
            name={"Email"}
            type="email"
            placeholder={"Email"}
            value={email}
            setState={setemail}
            inputStyle={{ width: "430px", height: "30px" }}
            errorMessage={emailError}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Input
              text={"Password"}
              name={"Password"}
              type="password"
              placeholder={"Password"}
              value={Password}
              setState={setPassword}
              errorMessage={passwordError}
            />
            <Input
              text="Confirm"
              name={"Confirm"}
              type="password"
              placeholder={"Confirm"}
              value={confirm}
              setState={setconfirm}
              errorMessage={passwordError}
            />
          </div>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ width: "50%" }}>
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  resize: "none",
                  outline: "none",
                  color: "green",
                  fontWeight: "bold",
                }}
                onClick={() => setonRegister(!onRegister)}
              >
                Sign in instead
              </button>
            </div>

            <button
              type="submit"
              style={{
                width: "70px",
                height: "35px",
                borderRadius: "4px",
                backgroundColor: "green",
                color: "white",
                fontWeight: "bold",
                flex: 1,
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <footer
        style={{ width: "430px", display: "flex", justifyContent: "center" }}
      >
        <h5 style={{ flex: 1, textAlign: "left" }}>English</h5>
        <ul
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <li style={liFooterStyle}>Help</li>
          <li style={liFooterStyle}>Privacy</li>
          <li style={liFooterStyle}>Terms</li>
        </ul>
      </footer>
    </div>
  );
};

export default Register;
const liFooterStyle = {
  listStyleType: "none",
};
