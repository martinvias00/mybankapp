import { useState, useEffect } from "react";
const Input = ({
  text,
  name,
  type,
  value,
  setState,
  isdiable,
  errorMessage,
  list,
  hasAlist,
  inputStyle,
  placeholder,
}) => {
  const [borderInputColor, setborderInputColor] = useState("#4caf50");
  useEffect(() => {
    if (errorMessage !== "") {
      setborderInputColor("red");
      document.querySelector(".errorSpan").classList.add("animated");
    }
    return () => {
      setborderInputColor("#4caf50");
    };
  }, [errorMessage]);
  const fieldsetStyle = {
    width: "fit-content",
    height: 80,
    display: "flex",
    flexDirection: "column",
  };
  const labelStyle = {
    border: "0",
    display: "block",
    fontSize: "1.2em",
    textAlign: "left",
    float: "left",
  };
  const inputStyleLocal = {
    width: "200px",
    height: "30px",
    borderRadius: "10px",
    ...inputStyle,
    border: `2px ${borderInputColor} solid`,
  };

  const errorStyle = {
    display: "block",
    color: "red",
    fontSize: ".7em",
    position: "relative",
    textAlign: "left",
    top: -2,
  };

  return (
    <fieldset style={fieldsetStyle}>
      {hasAlist === true && (
        <datalist id={name}>
          {list.map((item) => {
            return (
              <option value={item} name={name}>
                {item}
              </option>
            );
          })}
        </datalist>
      )}

      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setState(e.target.value);
        }}
        disabled={isdiable}
        style={inputStyleLocal}
        list={name}
      ></input>
      <label htmlFor={name} style={labelStyle}>
        {text}
      </label>
      <span className="errorSpan" style={errorStyle}>
        {errorMessage}
      </span>
    </fieldset>
  );
};

export default Input;
