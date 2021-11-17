import "./Loading.css";
import { useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { DiReact } from "react-icons/di";
const Loading2 = () => {
  const [state, setstate] = useState(true);

  setTimeout(() => {
    setstate(false);
  }, 1000);

  return (
    <div v-show="show" className="overlay">
      <div className="dialog">
        {state ? (
          <DiReact
            style={{ color: "green", fontSize: "8em", fontWeight: "bold" }}
          />
        ) : (
          <GiConfirmed
            style={{ color: "green", fontSize: "8em", fontWeight: "bold" }}
          />
        )}
      </div>
    </div>
  );
};

export default Loading2;
