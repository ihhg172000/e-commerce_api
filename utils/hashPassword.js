import bycrypt from "bcrypt";

const hashPassword = (password) => bycrypt.hash(password, 12);

export default hashPassword;
