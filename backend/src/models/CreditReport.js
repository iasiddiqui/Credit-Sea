const mongoose = require('mongoose');

const CreditAccountSchema = new mongoose.Schema({
  subscriberName: String,
  accountNumber: String,
  portfolioType: String,
  accountType: String,
  openDate: String,
  creditLimit: Number,
  currentBalance: Number,
  amountPastDue: Number,
  paymentHistoryProfile: String,
  accountHistory: [{ year: Number, month: Number, daysPastDue: Number, assetClassification: String }]
}, { _id: false });

const ReportSchema = new mongoose.Schema({
  sourceFilename: String,
  parsedAt: { type: Date, default: Date.now },
  name: String,
  mobilePhone: String,
  pan: String,
  dateOfBirth: String,
  creditScore: Number,
  totalAccounts: Number,
  activeAccounts: Number,
  closedAccounts: Number,
  currentBalanceAmount: Number,
  securedAmount: Number,
  unsecuredAmount: Number,
  last7DaysEnquiries: Number,
  addresses: [String],
  creditAccounts: [CreditAccountSchema],
  rawXml: String
});

module.exports = mongoose.model('CreditReport', ReportSchema);
