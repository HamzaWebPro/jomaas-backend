const notFoundMiddleware = (req, res) =>
  res.status(500).send({ error: "Requested URL Was Not Found" });

module.exports = notFoundMiddleware;
