import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import method from "./localStorageManager";
import Dashboardhome from "./components/Dashboardhome";
import Register from "./components/Register";
function App() {
  const [userState, setuserState] = useState(() => method.getLocalcurr());
  const [actionbtn, setactionbtn] = useState("home");
  const [onRegister, setonRegister] = useState(false);

  useEffect(() => {
    method.initLocaldata();
  }, []);

  return (
    <div className="App">
      {userState ? (
        // <Dialog  title="", description, confirm, cancel, iswarning  />
        <Dashboardhome
          method={method}
          userState={userState}
          actionbtn={actionbtn}
          setactionbtn={setactionbtn}
          setuserState={setuserState}
        />
      ) : onRegister === true ? (
        <Register onRegister={onRegister} setonRegister={setonRegister} />
      ) : (
        <Login
          setcurrfunc={method.setLocalcurr}
          getuser={method.getLocaluser}
          setuserState={setuserState}
          getLocalcurr={() => method.getLocalcurr()}
          onRegister={onRegister}
          setonRegister={setonRegister}
        />
      )}
    </div>
  );
}

export default App;
