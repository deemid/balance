import mongoose, { Schema, Document } from 'mongoose';
import { v4 } from 'uuid';
import uniqueValidator from 'mongoose-unique-validator';

export type IAccount = {
  balance: number;
  reservedBalance: number;
  virtualBalance: number;
  availableBalance: number;
}

const AccountSchema: Schema = new Schema({
  _id: { type: String, default: v4 },
  balance: { type: Number, default: 0 },
  reservedBalance: { type: Number, default: 0 },
  virtualBalance: { type: Number, default: 0 },
  availableBalance: { type: Number, default: 0 },
});

AccountSchema.plugin(uniqueValidator);

export default mongoose.model<IAccount & Document>('Account', AccountSchema);
