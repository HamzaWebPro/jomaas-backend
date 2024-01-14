const AdminCredential = require("../models/adminCredentialSchema");

async function login(req, res) {
  const { secretKey, branchName } = req.body;

  try {
    if (!secretKey) {
      return res.json({ error: "Secret key is required" });
    }
    if (!branchName) {
      return res.json({ error: "Branch name is not defined" });
    }

    // Find the admin credentials in the database
    const adminRecord = await AdminCredential.findOne({
      secretKey,
      branchName,
    }).exec();

    if (adminRecord) {
      // Authentication successful
      res.json({
        message: "Login successful",
        data: {
          branchName: adminRecord.branchName,
        },
      });
    } else {
      // Authentication failed
      res.json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.json({ message: "Internal server error" });
  }
}

module.exports = login;
