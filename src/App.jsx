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
  }, [password, length]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*(){}[]~?><";

    for (let i = 1; i <= length; i++) {
      let chara = Math.floor(Math.random() * str.length);
      pass += str.charAt(chara);
    }

    setpassword(pass);
  }, [length, number, char]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-4 bg-white text-black">
          <h1 className="text-3xl text-center mb-6 font-bold text-gray-800">
            Password Generator
          </h1>

          <div className="flex shadow rounded-lg overflow-hidden mb-6 border border-gray-300">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-3 text-gray-600"
              placeholder="Generated Password"
              readOnly
              ref={passwordref}
            />
            <button
              onClick={copyPassword}
              className="outline-none bg-blue-400 text-white px-4 py-2 transition-colors duration-200 hover:bg-blue-700"
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col items-center text-sm gap-y-4">
            <div className="flex items-center gap-x-4 mb-4">
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={number}
                  id="numberInput"
                  onChange={() => {
                    setnumber((prev) => !prev);
                  }}
                />
                <label htmlFor="numberInput" className="text-gray-700">
                  Numbers
                </label>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={char}
                  id="charInput"
                  onChange={() => {
                    setchar((prev) => !prev);
                  }}
                />
                <label htmlFor="charInput" className="text-gray-700">
                  Characters
                </label>
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <label htmlFor="length" className="text-gray-700">
                Length:
              </label>
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
                className="border rounded px-2 py-1 text-gray-700"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 6 && value <= 20) {
                    setlength(value);
                  }
                }}
              />
            </div>

            <button
              onClick={passwordGenerator}
              className="mt-4 bg-green-700 text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-green-500"
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
