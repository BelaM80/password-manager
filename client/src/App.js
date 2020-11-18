import "./App.css";
import { useEffect, useState } from "react";
import { getPassword } from "./api/passwords";

function App() {
  const [password, setPassword] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doFetch = async () => {
      try {
        setLoading(true);
        setError(null);
        const newPassword = await getPassword(inputValue);
        setPassword(newPassword);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    doFetch();
  }, [inputValue]);

  return (
    <div className="App">
      <header>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getPassword(inputValue);
            setInputValue("");
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" onClick={(e) => setInputValue(e.target.value)}>
            name
          </button>
          <div>{inputValue && password}</div>
        </form>{" "}
      </header>
    </div>
  );
}

export default App;
