import { useState, useEffect } from "react";
import { LoginContainerStyle, loginStyle } from "./css/CSS";
import Input from "./Input";
import Loading2 from "./Loading/Loading2";
import method from "../localStorageManager";
const Login = ({ setcurrfunc, setuserState, onRegister, setonRegister }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [newUser, setnewUser] = useState("");
  const [complete] = useState(false);
  const [usernameError, setusernameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const users = method.getLocaluser();
  useEffect(() => {
    setonRegister(onRegister);
  }, [onRegister, setonRegister]);
  function handleClick(e) {
    e.preventDefault();
    const newobjects = users.filter((key) => key.username === username);

    if (newobjects.length !== 0) {
      setusernameError("");

      if (newobjects[0].password === password) {
        setnewUser(newobjects[0]);
        setcurrfunc(newobjects[0]);
        setpasswordError("");
      } else if (password === "") {
        setpasswordError("! Enter password");
      } else {
        setpasswordError("! Wrong password. Try again");
      }
    } else {
      setusernameError("! Enter a valid username");
    }
  }
  useEffect(() => {
    setuserState(newUser);
  }, [newUser, setuserState]);
  function handlesignup(e) {
    setonRegister(!onRegister);
    e.preventDefault();
  }

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
          Sign in to Bank
        </span>
        <div className="LoginContainer" style={LoginContainerStyle}>
          <form className="loginForm" style={loginStyle}>
            {/* <fieldset style={fieldsetStyle}> */}
            <Input
              text={"Username"}
              name={"Username"}
              type="text"
              value={username}
              setState={setusername}
              errorMessage={usernameError}
              inputStyle={{ borderColor: "#c9c9c9" }}
            />
            <Input
              text={"Password"}
              name={"password"}
              type="password"
              value={password}
              setState={setpassword}
              errorMessage={passwordError}
              inputStyle={{ borderColor: "#c9c9c9" }}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
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
                  onClick={(e) => handlesignup(e)}
                >
                  Sign up
                </button>
              </div>

              <button
                className="Loginbtn"
                onClick={(e) => {
                  handleClick(e);
                }}
                style={BtnStyle}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
const BtnStyle = {
  width: "70px",
  height: "35px",
  borderRadius: "4px",
  backgroundColor: "green",
  color: "white",
  fontWeight: "bold",
  flex: 1,
};
