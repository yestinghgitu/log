import AptosClient from '@aptos-labs/ts-sdk';

async function fetchTransactionLogs(networkName, startBlock, endBlock) {
    const network = networkName === 'mainnet' ? Network.MAINNET : Network.TESTNET;
    const client = new AptosClient(network);

    try {
        for (let blockHeight = startBlock; blockHeight <= endBlock; blockHeight++) {
            const block = await client.getBlock(blockHeight);
            const transactions = block.transactions;

            for (const transaction of transactions) {
                const { sender, receiver, amount, success } = transaction;

                if (success) {
                    const moduleAddress = transaction.payload.function.module_address;
                    const functionName = transaction.payload.function.function_name;

                    if (moduleAddress === '0x1::token' && functionName === 'transfers') {
                        // Token transfer transaction
                        console.log('Token Transfer:', {
                            sender,
                            receiver,
                            amount,
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error(`Error fetching block ${blockHeight}:`, error);
    }
}

const networkName = 'mainnet';
const startBlock = 20633950;
const endBlock = 20633990;
const SenderFilter = '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97';
const receiverFilter = '0x388C818CA8B9251b393131C08a736A67ccB19297';
fetchTransactionLogs(networkName, startBlock, endBlock);
fetchTransactionLogs(networkName, startBlock, endBlock);

fetchTransactionLogs(networkName, startBlock, endBlock, senderFilter, receiverFilter);