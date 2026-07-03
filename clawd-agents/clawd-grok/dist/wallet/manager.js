import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { createPublicClient, formatEther, formatUnits, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { base, baseSepolia } from "viem/chains";
const WALLET_DIR = path.join(os.homedir(), ".clawd");
const WALLET_PATH = path.join(WALLET_DIR, "wallet.json");
const USDC_BY_CHAIN = {
    base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "base-sepolia": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
};
const ERC20_BALANCE_ABI = [
    {
        inputs: [{ name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
];
export class WalletManager {
    static exists() {
        return fs.existsSync(WALLET_PATH);
    }
    init(chain = "base-sepolia") {
        if (WalletManager.exists()) {
            const current = this.getStoredWallet();
            return { address: current.address, chain: current.chain, createdAt: current.createdAt };
        }
        const privateKey = generatePrivateKey();
        const account = privateKeyToAccount(privateKey);
        const createdAt = new Date().toISOString();
        const stored = { privateKey, address: account.address, chain, createdAt };
        fs.mkdirSync(WALLET_DIR, { recursive: true, mode: 0o700 });
        fs.writeFileSync(WALLET_PATH, JSON.stringify(stored, null, 2), { mode: 0o600 });
        return { address: stored.address, chain: stored.chain, createdAt: stored.createdAt };
    }
    getWalletData() {
        const stored = this.getStoredWallet();
        return { address: stored.address, chain: stored.chain, createdAt: stored.createdAt };
    }
    getStoredWallet() {
        if (!WalletManager.exists()) {
            throw new Error("No wallet found. Run `grok wallet init` first.");
        }
        const parsed = JSON.parse(fs.readFileSync(WALLET_PATH, "utf-8"));
        if (!parsed.privateKey || !parsed.address || !parsed.chain || !parsed.createdAt) {
            throw new Error("Wallet file is incomplete.");
        }
        if (parsed.chain !== "base" && parsed.chain !== "base-sepolia") {
            throw new Error(`Unsupported wallet chain: ${parsed.chain}`);
        }
        return parsed;
    }
    async getBalance() {
        const stored = this.getStoredWallet();
        const viemChain = stored.chain === "base" ? base : baseSepolia;
        const publicClient = createPublicClient({ chain: viemChain, transport: http() });
        const nativeBalance = await publicClient.getBalance({ address: stored.address });
        const usdcBalance = await publicClient.readContract({
            address: USDC_BY_CHAIN[stored.chain],
            abi: ERC20_BALANCE_ABI,
            functionName: "balanceOf",
            args: [stored.address],
        });
        return {
            address: stored.address,
            chain: stored.chain,
            nativeSymbol: "ETH",
            nativeBalance: formatEther(nativeBalance),
            usdcBalance: formatUnits(usdcBalance, 6),
        };
    }
}
//# sourceMappingURL=manager.js.map