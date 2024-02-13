const addUserIdToQuery = (req, res, next) => {
  req.query.userId = req.user._id;
  next();
};

export default addUserIdToQuery;
