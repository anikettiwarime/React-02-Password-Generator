import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);

  const [isNumbersAllowed, setIsNumbersAllowed] = useState(false);
  const [isSymbolsAllowed, setIsSymbolsAllowed] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumbersAllowed) str += "0123456789";
    if (isSymbolsAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }

    setPassword(pass);
  }, [length, isNumbersAllowed, isSymbolsAllowed, setPassword]);

  const passRef = useRef(null);

  const copyGeneratedPassword = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [isNumbersAllowed, isSymbolsAllowed, length, generatePassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
            className="outline-none px-3 py-0.5 bg-blue-700 text-white shrink-0"
            onClick={copyGeneratedPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              min={8}
              max={32}
              type="range"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-white">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              id="numberInput"
              type="checkbox"
              defaultChecked={isNumbersAllowed}
              onChange={() => {
                setIsNumbersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              id="numberInput"
              type="checkbox"
              defaultChecked={isSymbolsAllowed}
              onChange={() => {
                setIsSymbolsAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
