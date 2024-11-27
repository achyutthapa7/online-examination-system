const handleError = (res, error) => {
  console.error(`The error is: ${error.message}`);
  res.status(500).send({ "Server error": error.message });
};
module.exports = handleError;
