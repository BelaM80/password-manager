const { readCommandLineArguments } = require("./lib/commadLine");
const { setPassword, getPassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url =
  "mongodb+srv://bela:j2OP3IPKjbtOnKc9@cluster0.ezugy.mongodb.net/password-manager?retryWrites=true&w=majority";

// Use connect method to connect to the Server
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
  assert.equal(null, err);
  const db = client.db("passwords-manager");
  db.collection("passwords")
    .insertOne({
      name: "test",
      value: "blblb",
    })
    .then(function (result) {
      // process result
    });
  // client.close();
});

async function run() {
  const masterPassword = await askForMasterPassword();

  if (!isMasterPasswordCorrect(masterPassword)) {
    console.log("That´s not the right password. Try again!");
    run();
    return;
  }

  const [passwordName, newPasswordValue] = readCommandLineArguments();
  if (!passwordName) {
    console.log("Missing password name");
    return process.exit(9);
  }

  if (newPasswordValue) {
    await setPassword(passwordName, newPasswordValue);
    console.log(`Password ${passwordName} set 🎉`);
  } else {
    const newPasswordValue = await getPassword(passwordName);
    console.log(`Your password is ${newPasswordValue} 🎉`);
  }
}

run();
