/* eslint-disable max-len */
// import { Document } from 'mongoose';
// import Account, { IAccount } from './models/account';
import Account from './models/account';

const updateBalance = (property: 'balance' | 'reservedBalance' | 'virtualBalance', defaultAmount?: number) => async (_parent: {}, args: { id: string; amount: number }) => {
  const { id, amount } = args;
  const account = await Account.findById(id);
  if (!account) {
    throw new Error('Account Not Found');
  }

  account[property] = defaultAmount !== undefined ? defaultAmount : amount;
  await account.save();

  return account;
};

const resolvers = {
  Query: {
    account: async (_parent: {}, args: { id: string }) => {
      const account = await Account.findById(args.id);
      return account;
    },
  },
  Mutation: {
    updateBalance: updateBalance('balance'),
    createReservedBalance: async (_parent: {}, args: { id: string; amount: number }) => {
      const { id, amount } = args;
      const account = await Account.findById(id);
      if (!account) {
        throw new Error('Account Not Found');
      }

      if (amount > account.balance) {
        throw new Error('Amount is greater than current balance');
      }

      account.balance -= amount;
      account.reservedBalance += amount;
      await account.save();

      return account;
    },
    updateReservedBalance: updateBalance('reservedBalance'),
    releaseReservedBalance: async (_parent: {}, args: { id: string }) => {
      const { id } = args;
      const account = await Account.findById(id);
      if (!account) {
        throw new Error('Account Not Found');
      }

      account.balance += account.reservedBalance;
      account.reservedBalance = 0;
      await account.save();

      return account;
    },
    updateVirtualBalance: updateBalance('virtualBalance'),
    cancelVirtualBalance: updateBalance('virtualBalance', 0),
    commitVirtualBalance: async (_parent: {}, args: { id: string }) => {
      const { id } = args;
      const account = await Account.findById(id);
      if (!account) {
        throw new Error('Account Not Found');
      }

      account.balance += account.virtualBalance;
      account.virtualBalance = 0;
      await account.save();

      return account;
    },
  },
};

export default resolvers;
// context: { xRequestId: string }
