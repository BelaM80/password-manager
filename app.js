// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';

// const message, nonce, path, privateKey; // ...
// const hashDigest = sha256(nonce + message);
// const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));

const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
  {
    type: "password",
    name: "masterPassword",
    message: "What is the super secret master password?",
    mask: "*",
  },
];

const passwordSafe = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

async function validateAccess() {
  const args = process.argv.slice(2);
  const passwordName = args[0];
  const newPasswordValue = args[1];
  const { masterPassword } = await inquirer.prompt(questions);
  const password = passwordSafe[passwordName];

  if ((await masterPassword) !== passwordSafe.master) {
    console.error("Your password is invalid!");
    validateAccess();
    return;
  }

  if (newPasswordValue) {
    passwordSafe[passwordName] = newPasswordValue;
    fs.writeFileSync("./db.json", JSON.stringify(passwordSafe, null, 2));
  } else {
    console.log(`You want to know the password of '${passwordName}'`);

    if (password) {
      console.log(`Password ist ${password}`);
    } else {
      console.log("Unknown password");
    }
  }
}

validateAccess();
