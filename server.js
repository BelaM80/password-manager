require("dotenv").config();
const express = require("express");

const path = require("path");

const { getPassword, setPassword, deletePassword } = require("./lib/passwords");
const { connect } = require("./lib/database");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3600;

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

app.delete("/api/passwords/:name", async (request, response) => {
  try {
    const { name } = request.params;
    const result = await deletePassword(name);
    if (result.deletedCount === 0) {
      return response.status(404).send(`${name} not found`);
    }
    response.send(`Successfully deleted ${name}`);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send("An unexpected error occured. Please try again later!");
  }
});

app.use(express.static(path.join(__dirname, "client/build")));

app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "client/build", "index.html"));
});

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME);
  console.log("Connected to database.");

  app.listen(port, () => {
    console.log(`Password-Manager API listening at http://localhost:${port}`);
  });
}
run();
