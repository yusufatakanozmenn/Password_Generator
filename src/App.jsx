import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  const [password, setpassword] = useState("");

  // UseRef hook -------------------------------------------

  const passwordref = useRef(null);

  const copyPassword = useCallback(() => {
    passwordref.current?.select();
    passwordref.current.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*(){}[]~?><";

    for (let i = 1; i <= length; i++) {
      let chara = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(chara);
    }

    setpassword(pass);
  }, [length, number, char, setpassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-400 text-black">
          <h1 className="text-4xl text-center m-4">Password Generator</h1>

          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-3"
              placeholder="Password"
              readOnly
              ref={passwordref}
            />

            <button
              onClick={copyPassword}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col items-center text-sm gap-y-4">
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  checked={number}
                  id="numberInput"
                  onChange={() => {
                    setnumber((prev) => !prev);
                  }}
                />
                <label htmlFor="numberInput">Numbers</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  checked={char}
                  id="charInput"
                  onChange={() => {
                    setchar((prev) => !prev);
                  }}
                />
                <label htmlFor="charInput">Characters</label>
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <label htmlFor="length">Length:</label>
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />
              <input
                type="number"
                id="manualLength"
                min={6}
                max={20}
                value={length}
                className="border rounded px-2 py-1"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 6 && value <= 20) {
                    setlength(value);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
