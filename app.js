const { readCommandLineArguments } = require("./lib/commadLine");
const { setPassword, getPassword, deletePassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
require("dotenv").config();

const { connect, close } = require("./lib/database");

// Connection URL
// const url =
//   "mongodb+srv://bela:j2OP3IPKjbtOnKc9@cluster0.ezugy.mongodb.net/password-manager?retryWrites=true&w=majority";

// Use connect method to connect to the Server
// MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
//   assert.equal(null, err);
//   const db = client.db("passwords-manager");
//   db.collection("passwords")
//     .insertOne({
//       name: "test",
//       value: "blblb",
//     })
//     .then(function (result) {
//       // process result
//     });
//   // client.close();
// });

async function run() {
  console.log("Connecting to database...");
  await connect(
    `mongodb+srv://${process.env.MONGODB_PASSWORD}@cluster0.ezugy.mongodb.net/passwords-manager?retryWrites=true&w=majority`,
    "passwords-manager"
  );
  console.log("Connected to database 🎉");

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

  if (passwordName === "delete") {
    const passwordToDelete = newPasswordValue;
    await deletePassword(passwordToDelete);
    console.log(`Password ${newPasswordValue} deleted`);
  } else if (newPasswordValue) {
    await setPassword(passwordName, newPasswordValue);
    console.log(`Password ${passwordName} set 🎉`);
  } else {
    const newPasswordValue = await getPassword(passwordName);
    console.log(`Your password is ${newPasswordValue} 🎉`);
  }
  await close();
}

run();
