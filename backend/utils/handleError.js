const handleError = (res, error) => {
  res.status(500).send({ "Server error": error.message });
};
module.exports = handleError;
