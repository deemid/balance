import Account, { IAccount } from './models/account';

const seed = async () => {
  const accounts = await Account.find();
  if (accounts.length === 0) {
    const newAccount: IAccount = {
      balance: 0,
      reservedBalance: 0,
      virtualBalance: 0,
      availableBalance: 0,
    };

    Account.create(newAccount);
  }
};

export default seed;
