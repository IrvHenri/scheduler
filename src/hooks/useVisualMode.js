import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
      setHistory((prevHistory) => {
        let newArr = [...prevHistory];
        newArr.pop();
        return [...newArr, newMode];
      });
    } else {
      setMode(newMode);
      setHistory((prevHistory) => [...prevHistory, newMode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      // history.pop();
      setHistory((prevHistory) => {
        let newArr = [...prevHistory];
        newArr.pop();
        setMode(newArr[newArr.length - 1]);
        return newArr;
      });
    }
  };
  return { mode, transition, back };
}
