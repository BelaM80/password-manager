async function readMasterPassword() {
  return process.env.MASTER_PASSWORD;
}
exports.readMasterPassword = readMasterPassword;
