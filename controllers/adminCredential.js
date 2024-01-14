const AdminCredential = require("../models/adminCredentialSchema");

async function adminCredential(req, res) {
  const { secretKey, branchName } = req.body;
  if (!secretKey) {
    return res.json({ error: "Secret key is required" });
  }
  if (!branchName) {
    return res.json({ error: "Branch name is not define" });
  }
  let admincredential = new AdminCredential({
    secretKey,
    branchName,
  });

  await admincredential.save();

  return res.send({ error: "Branch Admin Succesfully Created!!" });
}

module.exports = {
  adminCredential,
};
