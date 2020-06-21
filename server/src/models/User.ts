import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';
import { generatePasswordHash } from '../utils';
import differenceInMinutes from 'date-fns/difference_in_minutes';

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

UserSchema.virtual('isOnline').get(function(this: any) {
  return differenceInMinutes(new Date().toISOString(), this.last_seen) < 5;
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', async function(next) {
  const user: any = this;

  if (!user.isModified('password')) {
    return next();
  }

  user.password = await generatePasswordHash(user.password);
  user.confirm_hash = await generatePasswordHash(new Date().toString());
});

//const UserModel = mongoose.model('User', UserSchema);

export default model('User', UserSchema);
