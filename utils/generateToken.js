const generateToken = (pyload, expiresIn = "15d") =>
  jwt.sign(pyload, config.JWT_SECRET_KEY, { expiresIn });

export default generateToken;
