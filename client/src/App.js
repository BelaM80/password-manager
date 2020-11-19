import "./App.css";
import { useState } from "react";
import { getPassword } from "./api/passwords";
import useAsync from "./hooks/useAsync";
import { useForm } from "react-hook-form";

function App() {
  const [inputValue, setInputValue] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const { data, loading, error, doFetch } = useAsync(() =>
    getPassword(inputValue)
  );

  const onSubmit = (data) => {
    console.log(data);
    doFetch();
  };

  return (
    <div className="App">
      <header>
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Passwordname"
            name="inputValue"
            ref={register}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            ref={register({ required: "PASSWORD REQUIRED", minLength: 8 })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <input type="submit" />
        </form>

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
