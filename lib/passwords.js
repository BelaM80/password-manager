const fs = require("fs").promises;
const CryptoJS = require("crypto-js");
const PasswordPrompt = require("inquirer/lib/prompts/password");
const { collection } = require("./database");
const { readMasterPassword } = require("./masterPassword");

// async function readPasswordSafe() {
//   const passwordSafeJSON = await fs.readFile("./db.json", "utf8");
//   const passwordSafe = JSON.parse(passwordSafeJSON);
//   return passwordSafe;
// }

// async function writePasswordSafe(passwordSafe) {
//   await fs.writeFile("./db.json", JSON.stringify(passwordSafe, null, 2));
// }

async function getPassword(passwordName) {
  // const passwordSafe = await readPasswordSafe();
  const password = await collection("passwords").findOne({
    name: passwordName,
  });
  if (!passwordName) {
    return null;
  }
  const decryptedValue = CryptoJS.AES.decrypt(
    password.value,
    await readMasterPassword()
  );

  return decryptedValue.toString(CryptoJS.enc.Utf8);
}

async function setPassword(passwordName, newPasswordValue) {
  const encryptedValue = CryptoJS.AES.encrypt(
    newPasswordValue,
    await readMasterPassword()
  ).toString();
  const filter = { name: passwordName };
  const update = { $set: { value: encryptedValue } };

  await collection("passwords").updateOne(filter, update, { upsert: true });
}

async function deletePassword(passwordName) {
  const filter = { name: passwordName };

  await collection("passwords").deleteOne(filter);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
exports.deletePassword = deletePassword;
