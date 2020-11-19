import "./App.css";
import { useState } from "react";
import { getPassword } from "./api/passwords";
import useAsync from "./hooks/useAsync";

function App() {
  const [inputValue, setInputValue] = useState("");

  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword(inputValue)
  );

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
          <button type="submit">Submit</button>
        </form>
        <div>{data}</div>
      </header>
    </div>
  );
}

export default App;
