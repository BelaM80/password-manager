import "./App.css";
import { useState } from "react";
import { getPassword } from "./api/passwords";

function App() {
  const [password, setPassword] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const doFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const newPassword = await getPassword(inputValue);
      setPassword(newPassword);
      console.log(inputValue);
      console.log(newPassword);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            doFetch();
            setInputValue("");
          }}
        >
          <input
            type="text"
            placeholder="enter passwordname"
            // required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">name</button>
        </form>
        <div>{password}</div>
      </header>
    </div>
  );
}

export default App;
