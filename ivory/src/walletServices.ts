import { AppDataSource } from "./data-source";
import { Wallet } from "./entity/User";


// Create a new wallet for a user
export async function createWallet(userId, amount) {
  const walletRepository = AppDataSource.getRepository(Wallet);
  const newWallet = walletRepository.create({
    user_id: userId,
    amount: amount,
  });
  return walletRepository.save(newWallet);
}

// Get wallet by ID
export async function getWalletById(id) {
  const walletRepository = AppDataSource.getRepository(Wallet);
  return walletRepository.findOne({ where: { id } });
}

// Get wallet by userID
export async function getWalletByUserId(user_id) {
    const walletRepository = AppDataSource.getRepository(Wallet);
    return walletRepository.findOne({ where: { user_id } });
  }

// Update wallet amount by ID
export async function updateWalletAmounById(id, newAmount) {
  const walletRepository = AppDataSource.getRepository(Wallet);
  const wallet = await walletRepository.findOne({ where: { id } });
  if (!wallet) {
    throw new Error("Wallet not found");
  }
  wallet.amount = newAmount;
  return walletRepository.save(wallet);
}

// Update wallet amount by userId
export async function updateWalletAmountByUserId(user_id, newAmount) {
    const walletRepository = AppDataSource.getRepository(Wallet);
    const wallet = await walletRepository.findOne({ where: { user_id } });
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    wallet.amount += newAmount;
    return walletRepository.save(wallet);
  }
  export async function updateWallerWithDrawByUserId(user_id, newAmount) {
    const walletRepository = AppDataSource.getRepository(Wallet);
    const wallet = await walletRepository.findOne({ where: { user_id } });
    if (!wallet) {
      throw new Error("Wallet not found");
    }
    wallet.amount -= newAmount;
    return walletRepository.save(wallet);
  }
  export async function walletTransferByUserId(id ,user_id, amount) {
    const recipientwalletRepository = AppDataSource.getRepository(Wallet);
    const recipientWallet = await recipientwalletRepository.findOne({ where: { user_id } });
    if (!recipientWallet) {
      throw new Error("Wallet not found");
    }

   
    recipientWallet.amount += amount;

    const senderWalletRepository = AppDataSource.getRepository(Wallet);

    const senderWallet = await senderWalletRepository.findOne({ where: { id } });
    if (!senderWallet) {
      throw new Error("Wallet not found");
    }
    senderWallet.amount -= amount;

    senderWalletRepository.save(senderWallet)
    return recipientwalletRepository.save(recipientWallet);
  }
  