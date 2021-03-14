var mongoose = require("mongoose");
const crypto = require("crypto");
var uuid = require('uuid')
const uuidv1 = require("uuid/v1")
const bcrypt = require('bcryptjs');
const { has } = require("lodash");

var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastName: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    userinfo: {
      type: String,
      trim: true
    },
    encry_password: {
      type: String,
      required: true
    },
    salt:String,
    role: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

// userSchema
//   .virtual("password")
//   .set(function(password) {
//     this._password = password;
//     // this.salt ="a secret";
//     // this.encry_password = this.securePassword(password);
//     bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt , (err,hash) =>{
//       if(err) throw err;
//       this.encry_password = hash;
//       console.log(hash)
//     }))
//   })
//   .get(function() {
//     return this._password;
//   });

// userSchema.method = {
//   authenticate: function(plainpassword) {
//     console.log(this.salt)
//     return this.securePassword(plainpassword) === this.encry_password;
//   },

//   securePassword: function(plainpassword) {
//     if (!plainpassword) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(plainpassword)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   }
// };

// userSchema.virtual("password")
//   .set(function(password){
//     this._password = password;
//     this.salt=uuidv1();
//     this.encry_password = securePassword(password)
//   })
//   .get(function(){
//     return this._password
//   })

// userSchema.method = {
// authenticate :function(plainpassword){
//   return this.securePassword === this.encry_password
// },

//   securePassword: function(plainpassword){
//     if(!plainpassword) return "";
//     try{
//       return crypto
//         .createHmac("sha256", ths.salt)
//         .update(plainpassword)
//         .digest("hex")
        
//     }
//     catch(err){
//       return "";

//     }
//   }
// }

module.exports = mongoose.model("User", userSchema);
