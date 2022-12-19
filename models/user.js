import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: () => 'Почта должна быть вида a@b.c',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((document) => {
      if (!document) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, document.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          const user = document.toObject();
          delete user.password;
          return user;
        });
    });
};

export default mongoose.model('user', userSchema);
