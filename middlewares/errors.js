function handleErrors(err, req, res, next) {
  res.status(500).send("Internal error");
}

exports.handleErrors = handleErrors;
