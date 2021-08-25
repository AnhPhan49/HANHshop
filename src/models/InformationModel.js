const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InformationSchema = new Schema(
  {
    phone: [
      {
        type: String,
      },
    ],
    email: String,
    facebook:String,
    tax_code: String,
    address: [
      {
        type: String,
      },
    ],
    description: String,
    logo: {
      url: String,
      id_logo: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Information", InformationSchema);
