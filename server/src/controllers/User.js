const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const { generatePasswordHash } = require('../utils');
const differenceInMinutes = require('date-fns/difference_in_minutes');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      validate: [isEmail, 'Invalid email'],
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.virtual('isOnline').get(function() {
  return differenceInMinutes(new Date().toISOString(), this.last_seen) < 5;
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  user.password = await generatePasswordHash(user.password);
  user.confirm_hash = await generatePasswordHash(new Date().toString());
});

module.exports = model('User', UserSchema);
