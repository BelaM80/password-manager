const fs = require("fs");

async function readPasswordSafe() {
  const passwordSafeJSON = await fs.readFileSync("./db.json", "utf8");
  const passwordSafe = JSON.parse(passwordSafeJSON);
  return passwordSafe;
}

async function writePasswordSafe(passwordSafe) {
  await fs.writeFileSync("./db.json", JSON.stringify(passwordSafe, null, 2));
}

async function getPassword(passwordName) {
  const passwordSafe = await readPasswordSafe();
  return passwordSafe[passwordName];
}

async function setPassword(passwordName, newPasswordValue) {
  const passwordSafe = await readPasswordSafe();
  passwordSafe[passwordName] = newPasswordValue;
  await writePasswordSafe(passwordSafe);
}

exports.getPassword = getPassword;
exports.setPassword = setPassword;
