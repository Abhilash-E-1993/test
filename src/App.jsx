import { useState, useEffect, useCallback,useRef} from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [chars, setChars] = useState(false);
  const [password, setPassword] = useState("");

  const inputRef = useRef(null);


  // Function to Generate Password
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) str += "0123456789";
    if (chars) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [length, numbers, chars]); // ✅ Removed `setPassword`

  // Effect to Call generatePassword when Dependencies Change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]); // ✅ Added `generatePassword` in dependencies

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="bg-amber-500 text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Password Generator
        </h2>

        {/* Password Input & Copy Button */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-4 text-black rounded-md outline-none"
            placeholder="Generated Password"
            ref={inputRef}
           
            readOnly
          />
          <button
           
            className="text-black bg-amber-50 px-3 py-1 rounded-md font-medium"
            onClick={() => {
              inputRef.current.select();
              navigator.clipboard.writeText(password);
            }}
          >
            Copy
          </button>
        </div>

        {/* Length Slider */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="font-medium text-sm">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="cursor-pointer w-full"
          />
        </div>

        {/* Options for Numbers & Special Characters */}
        <div className="flex justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            Include Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={chars}
              onChange={() => setChars(!chars)}
            />
            Include Symbols
          </label>
        </div>
      </div>
    </div>
  );
}
