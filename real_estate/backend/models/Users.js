const mongoose = require('mongoose');
const { Schema } = mongoose;
const forge = require('node-forge');

// Define a function to generate a key pair
function generateKeyPair() {
  const keys = forge.pki.rsa.generateKeyPair(2048);
  return {
    privateKey: forge.pki.privateKeyToPem(keys.privateKey),
    publicKey: forge.pki.publicKeyToPem(keys.publicKey),
  };
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  publicKey: {
    type: String, // Store the user's public key
    required: true,
  },
  privateKey: {
    type: String, // Store the user's private key (safeguard this securely)
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to generate public and private keys when creating a new user
UserSchema.pre('save', function (next) {
  if (!this.publicKey || !this.privateKey) {
    const keyPair = generateKeyPair();
    this.publicKey = keyPair.publicKey;
    this.privateKey = keyPair.privateKey;
  }
  next();
});

module.exports = mongoose.model('user', UserSchema);
