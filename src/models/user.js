
let mongoose = require('mongoose');
let bcrypt = require('bcryptjs')



let userSchema = mongoose.Schema({
    fullname:{type: String , required:true},
    username:{type: String, required: true, unique: true},
    bio:{type: String},
    password:{type: String , required: true },  
    profileimage:{type: String},
    createdate:{ type:Date , default: Date.now},
});


userSchema.pre('save' , function (next) {

    let user = this;
  
    if (!user.isModified("password")) {

        return next();

    }

    bcrypt.genSalt(10, function(err, salt) {

        if (err) {

            return next(err);

        }
      
        bcrypt.hash(user.password, salt, function(err, hashedpassword) {

            if (err) {
                
                return next(err);

            }

            user.password = hashedpassword;

            next();

        });

    });

});

userSchema.methods.checkPassword = function(guess, done) {

    bcrypt.compare(guess, this.password, function(err, isMatch) {

        done(err, isMatch);

    });

}

userSchema.statics.getAllUsers = async function() {

    const users = await this.find({});

    return users;
}

userSchema.statics.getUser = async function(userName) {

    const user = await this.findOne({ username: userName });

    return user;

}

userSchema.statics.getUserByEmail = async function(email) {

    const user = await this.findOne({email: email});

    return user;

}


userSchema.methods.displayName = function(){

    return  this.fullname;

} 

const User  = mongoose.model('User' , userSchema);

module.exports = User;