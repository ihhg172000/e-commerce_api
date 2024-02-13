const addUserIdToBody = (req, res, next) => {
  req.body.userId = req.user._id;
  next();
};

export default addUserIdToBody;
