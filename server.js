require("dotenv").config();
const express = require("express");

const { getPassword, setPassword } = require("./lib/passwords");
const { connect } = require("./lib/database");

const app = express();
app.use(express.json());
const port = 3000;

app.get("/api/passwords/:name", async (request, response) => {
  const { name } = request.params;
  try {
    const passwordValue = await getPassword(name);
    if (!passwordValue) {
      response
        .status(404)
        .send("Could not find the password you have specified");
      return;
    }
    response.send(passwordValue);
  } catch (error) {
    console.log(error);
    response.status(500).send("An internal error occured");
  }
});

app.post("/api/passwords", async (request, response) => {
  const password = request.body;

  try {
    await setPassword(password.name, password.value);
    response.send(`Successfully set ${password.name} `);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

async function run() {
  console.log("Connecting to database...");
  await connect(
    `mongodb+srv://${process.env.MONGODB_PASSWORD}@cluster0.ezugy.mongodb.net/passwords-manager?retryWrites=true&w=majority`,
    "passwords-manager"
  );
  console.log("Connected to database.");

  app.listen(port, () => {
    console.log(`Password-Manager API listening alt http://localhost:${port}`);
  });
}
run();
