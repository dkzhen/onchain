function isValidEvmAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function formatBalanceETH(number) {
  return parseFloat(number).toFixed(2);
}

function randomAddress() {
  return `0x${crypto
    .getRandomValues(new Uint8Array(20))
    .reduce((acc, byte) => acc + byte.toString(16).padStart(2, "0"), "")}`;
}

export { isValidEvmAddress, formatBalanceETH, randomAddress };
