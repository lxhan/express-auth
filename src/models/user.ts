import { model, Document, Schema } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { UserSchema as User } from '../types/user';
import { BCRYPT_SALT_LENGTH } from '../config';

const UserSchema = new Schema(
  {
    email: String,
    password: String,
    name: String,
  },
  { timestamps: true }
);

UserSchema.pre<Document & User>('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, BCRYPT_SALT_LENGTH);
  }
});

UserSchema.methods.comparePassword = function (password: string) {
  compare(password, this.password);
};

export default model<Document & User>('user', UserSchema);
