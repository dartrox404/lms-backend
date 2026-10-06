exports.apiResponse = (txt, statusCode, res, data) => {
  return res.status(statusCode).json({ message: txt, context: data });
};

exports.apiResponseCount = (txt, statusCode, res, data) => {
  return res
    .status(statusCode)
    .json({ message: txt, count: data.length, context: data });
};
