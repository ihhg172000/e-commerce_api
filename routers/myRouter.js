const { Router } = require("express");
const myAddressesRouter = require("./myAddressesRouter");

const router = Router();

router.use("/addresses", myAddressesRouter);

module.exports = router;
