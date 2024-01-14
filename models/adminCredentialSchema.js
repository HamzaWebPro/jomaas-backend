const mongoose = require('mongoose');

const adminCredentialSchema = new mongoose.Schema({
 
  secretKey: {
    type: String,
    required: true
  },
  branchName: {
    type: String,
    enum: ['Edmonton', 'Fort McMurray', 'Thickwood', 'Downtown', 'Beacon Hill', 'Timberlea'],
    required: true
  },
});

const AdminCredential = mongoose.model('AdminCredential', adminCredentialSchema);

module.exports = AdminCredential;