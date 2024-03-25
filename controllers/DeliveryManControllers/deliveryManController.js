// const DeliveryMan = require("../../models/deliveryManModel/deliveryManSchema");

// // Controller function to save a DeliveryMan item
// const createDeliveryMan = async (req, res) => {
//   const { name, phone, branch } = req.body;
//   const deliveryMan = new DeliveryMan({ name, phone, branch }) 
//   deliveryMan.save()
//     .then(() => res.json({ message: "Your DeliveryMan Item Successfully Created!!" }))
//     .catch(error => res.json({ message: "Error creating DeliveryMan. Please try again." }))
// };
// // 
// // Read DeliveryMan items
// const getDeliveryMen = async (req, res) => {
//   DeliveryMan.find()
//     .then(deliveryMen => res.json(deliveryMen))
//     .catch(error => res.json({ message: "Error fetching DeliveryMen. Please try again." }));
// };

// // Update or edit DeliveryMan
// const updateDeliveryMan = async (req, res) => {
//   const { id, updatedDeliveryMan } = req.body;
//   DeliveryMan.findByIdAndUpdate(id, updatedDeliveryMan, { new: true })
//     .then(() => res.json({ message: "Your DeliveryMan Item Successfully Updated!!" }))
//     .catch(error => res.json({ message: "Error updating DeliveryMan. Please try again." }));
// };

// // Delete DeliveryMan
// const deleteDeliveryMan = async (req, res) => {
//   const { id } = req.body;
//   DeliveryMan.findByIdAndDelete(id)
//     .then(() => res.json({ message: "Your DeliveryMan Item Successfully Deleted!!" }))
//     .catch(error => res.json({ message: "Error deleting DeliveryMan. Please try again." }));
// };


// module.exports = {
//   createDeliveryMan,
//   getDeliveryMen,
//   updateDeliveryMan,
//   deleteDeliveryMan,
// };
