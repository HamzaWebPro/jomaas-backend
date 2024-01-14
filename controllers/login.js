const AdminCredential = require("../models/adminCredentialSchema");

async function login(req, res) {
  const { secretKey, branchName } = req.body;

  try {
    if (!secretKey) {
      return res.status(400).json({ error: "Secret key is required" });
    }
    if (!branchName) {
      return res.status(400).json({ error: "Branch name is not defined" });
    }

    // Find the admin credentials in the database
    const adminRecord = await AdminCredential.findOne({
      secretKey,
      branchName,
    }).exec();

    if (adminRecord) {
      // Authentication successful
      res.status(200).json({
        message: "Login successful",
        data: {
          branchName: adminRecord.branchName,
        },
      });
    } else {
      // Authentication failed
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = login;
