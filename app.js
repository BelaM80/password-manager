console.log("PW4U");

const args = process.argv.slice(2);
const passwordName = args[0];
console.log(`You want to know the password of '${passwordName}'`);

if (passwordName === "wifi") {
  console.log("Password is qwertz");
} else {
  console.log("Unknown password");
}
