import CryptoJS from "crypto-js";

/**
 * Encrypts a string using AES (Advanced Encryption Standard).
 * @param {string} value - The string to encrypt.
 * @returns {string} The encrypted string.
 */
export const StringEncryption = (value) => {
  return CryptoJS.AES.encrypt(value, process.env.REACT_APP_CRYPTO_SECRET).toString()
}

