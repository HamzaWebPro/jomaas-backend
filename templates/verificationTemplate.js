const verificationTemplate = (verificationToken) => {
  return `<p>Please click the following link to verify your account: <a href="https://jomaas-order.vercel.app/verify?token=${verificationToken}"> Verify Account </a> </p>`;
};

module.exports = verificationTemplate;
