import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        uniq: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']  //^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$ 
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        uniq: true,
        trim: true,
        match: [/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, 'Please fill a valid phone number']
    }
},{
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// function validatePhoneNumber(input_str) {
//     var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  
//     return re.test(input_str);
// }

const User = mongoose.model('User', userSchema);

export default User;