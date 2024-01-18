import { IUser, IUserDocument } from '../interface/index';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema<IUserDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    strict: 'throw'
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.method('checkPassword', async function(formPassword) {
    return await bcrypt.compare(formPassword, this.password);
});

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;