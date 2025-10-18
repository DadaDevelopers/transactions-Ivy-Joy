// decodeTx.js
const bitcoin = require('bitcoinjs-lib');

// The transaction hex from your assignment
const txHex = "0200000000010131811cd355c357e0e01437d9bcf690df824e9ff785012b6115dfae3d8e8b36c10100000000fdffffff0220a107000000000016001485d78eb795bd9c8a21afefc8b6fdaedf718368094c08100000000000160014840ab165c9c2555d4a31b9208ad806f89d2535e20247304402207bce86d430b58bb6b79e8c1bbecdf67a530eff3bc61581a1399e0b28a741c0ee0220303d5ce926c60bf15577f2e407f28a2ef8fe8453abd4048b716e97dbb1e3a85c01210260828bc77486a55e3bc6032ccbeda915d9494eda17b4a54dbe3b24506d40e4ff43030e00";

// Decode it
const tx = bitcoin.Transaction.fromHex(txHex);

console.log("Transaction Details:");
console.log("===========================");
console.log("Version:", tx.version);
console.log("Locktime:", tx.locktime);
console.log("Number of inputs:", tx.ins.length);
console.log("Number of outputs:", tx.outs.length);

console.log("\nInputs:");
tx.ins.forEach((input, index) => {
  const txid = Buffer.from(input.hash).reverse().toString('hex');
  console.log(`  Input ${index}:`);
  console.log(`    TXID: ${txid}`);
  console.log(`    VOUT: ${input.index}`);
  console.log(`    ScriptSig: ${input.script.toString('hex') || '(empty)'}`);
  console.log(`    Sequence: ${input.sequence}`);
});

console.log("\nOutputs:");
tx.outs.forEach((out, index) => {
  console.log(`  Output ${index}:`);
  console.log(`    Value (satoshis): ${out.value}`);
  console.log(`    ScriptPubKey: ${out.script.toString('hex')}`);
});

console.log("\nWitness Data (for SegWit):");
tx.ins.forEach((input, index) => {
  if (input.witness && input.witness.length > 0) {
    console.log(`  Input ${index}:`);
    input.witness.forEach((w, i) => {
      console.log(`    Item ${i}: ${w.toString('hex')}`);
    });
  }
});
