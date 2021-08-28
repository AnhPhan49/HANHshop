const AccountModel = require("../models/accountModel");

module.exports = async (req, res, next) => {
  let user = await AccountModel.findById(req.user.id);
  let userRole = user.role;

  if (userRole !== "admin" && userRole !== "manager") {
    return res.status(405).json({ message: "Tài khoản không có quyền admin" });
  }
  next();
};
