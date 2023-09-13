import logo from "./logo.svg";
import "./App.css";
import {
  Client,
  AccountId,
  TransferTransaction,
  TokenSupplyType,
  PrivateKey,
  TokenCreateTransaction,
  TokenType,
  Hbar,
  TransactionReceiptQuery,
  TokenMintTransaction,
  Mnemonic,
  Wallet,
  LocalProvider,
  Provider,
  Signer,
  FileCreateTransaction,
  FileAppendTransaction,
  FileContentsQuery,
  FileInfoQuery,
  AccountCreateTransaction,
  AccountInfoQuery,
  TokenAssociateTransaction,
  TokenInfoQuery,
  NftId,
  AccountBalanceQuery,
  TokenNftInfoQuery
} from "@hashgraph/sdk";


function App() {
async function main() {
  /* const myAccountId = AccountId.fromString("0.0.1228");
  const operatorId = AccountId.fromString("0.0.1238");
  const operatorKey = PrivateKey.fromString(
      "3030020100300706052b8104000a04220420a1950bc0588663781a4159963ec83b3a7ceb18547fff6d37294a1eeea02bcf5c"
  ); */
  const myPrivateKey = PrivateKey.fromString("302e020100300506032b6570042204203981726b8bda6cd74bad38c1dd14c13fb94b42476477f85ba7987e2075f860ab");
  const testmyAccountId = AccountId.fromString("0.0.1420842");
  const testoperatorId = AccountId.fromString("0.0.2879225");
  const testoperatorKey = PrivateKey.fromString("302e020100300506032b6570042204205014313e2a6c63c6c16425c16b62c46c72ba49e11687b7f5ee3ed3f6682340f4");

  const myAccountId = AccountId.fromString("0.0.425551");
  /* const operatorId = AccountId.fromString("0.0.425553");
  const operatorKey = PrivateKey.fromString("3030020100300706052b8104000a04220420c57eda61e35954d24130dbdba089be3cfd386d336f5e7fe56f11d4b4990d9bfc"); */

  const operatorId = AccountId.fromString("0.0.950")
  const operatorKey = PrivateKey.fromStringED25519("302e020100300506032b65700422042091132178e72057a1d7528025956fe39b0b847f200ab59b2fdd367017f3087137")


  const nodes = { "34.106.137.14:80": new AccountId(8) }
  const client = Client.forNetwork(nodes).setOperator(operatorId, operatorKey);


  const CID = [
      "QmNPCiNA3Dsu3K5FxDPMG5Q3fZRwVTg14EXA92uqEeSRXn",
      "QmZ4dgAgt8owvnULxnKxNe8YqpavtVCXmc1Lt2XajFpJs9",
      "QmPzY5GxevjyfMUF5vEAjtyRoigzWp47MiKAtLBduLMC1T",
      "Qmd3kGgSrAwwSrhesYcY7K54f3qD7MDo38r7Po2dChtQx5",
      "QmWgkKz3ozgqtnvbCLeh7EaR1H8u5Sshx3ZJzxkcrT3jbw",
  ];
  let totalMetadata = [];

  for (let i = 0; i < 100; i++) {
      CID.forEach((metadata) => {
          totalMetadata.push(metadata);
      })
  }

  const supplyKey = PrivateKey.generateECDSA();
  const freezeKey = PrivateKey.generateECDSA();
  const wipeKey = PrivateKey.generateECDSA();
  console.log(`first`)
  let nftCreateTx = new TokenCreateTransaction()
      //.setNodeAccountIds([new AccountId(7), new AccountId(9), new AccountId(11)])
      .setTokenName("HIP-542 Example Collection")
      .setTokenSymbol("HIP-542")
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setMaxSupply(totalMetadata.length)
      .setTreasuryAccountId(operatorId)
      .setSupplyType(TokenSupplyType.Finite)
      .setAdminKey(operatorKey)
      .setFreezeKey(freezeKey)
      .setWipeKey(wipeKey)
      .setSupplyKey(supplyKey)
      .freezeWith(client);

  const initialSupply = nftCreateTx?.initialSupply || 0;

  let nftCreateTxSign = await nftCreateTx.sign(operatorKey);
  let nftCreateSubmit = await nftCreateTxSign.execute(client);
  let txId = nftCreateSubmit.transactionId.toString();
  let nftCreateRx = await nftCreateSubmit.getReceipt(client);
  let nftTokenId = nftCreateRx.tokenId;
  console.log(`Created NFT with token id: ${nftTokenId.toString()}`);
  console.log(`TXID: ${txId}`);
  
};

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <button onClick={() => main()}>Test</button>
      </header>
    </div>
  );
}

export default App;
