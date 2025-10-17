const xml2js = require('xml2js');

function safeGet(obj, pathArray) {
  return pathArray.reduce((acc, k) => (acc && acc[k] !== undefined) ? acc[k] : null, obj);
}

// parse string xml to JS object
async function parseXmlString(xmlString) {
  const parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true, mergeAttrs: true });
  return parser.parseStringPromise(xmlString);
}

function extractReport(parsed) {
  // try to locate main nodes
  // top-level might be INProfileResponse
  const root = parsed.INProfileResponse || parsed;
  const cais = safeGet(root, ['CAIS_Account', 'CAIS_Summary']) || root.CAIS_Summary || root.CAIS_Summary;
  const scoreBlock = safeGet(root, ['SCORE']) || root.SCORE;
  const holder = safeGet(root, ['CAIS_Account', 'CAIS_Account_DETAILS', 'CAIS_Holder_Details'])
              || safeGet(root, ['CAIS_Account', 'CAIS_Account_DETAILS', 'CAIS_Holder_Details'])
              || safeGet(root, ['CAIS_Account', 'CAIS_Account_DETAILS', 0, 'CAIS_Holder_Details'])
              || safeGet(root, ['CAIS_Account', 'CAIS_Account_DETAILS', 'CAIS_Holder_Details'])
              || safeGet(root, ['CAIS_Account_DETAILS', 'CAIS_Holder_Details'])
              || safeGet(root, ['CAIS_Holder_Details']);

  const phone = safeGet(root, ['CAIS_Account', 'CAIS_Account_DETAILS', 'CAIS_Holder_Phone_Details', 'Telephone_Number'])
             || safeGet(root, ['CAIS_Holder_Phone_Details', 'Telephone_Number'])
             || safeGet(root, ['MobilePhoneNumber']);

  const pan = safeGet(holder, ['Income_TAX_PAN']) || safeGet(root, ['CAIS_Account', 'CAIS_Account_DETAILS', 'CAIS_Holder_ID_Details', 'Income_TAX_PAN']);

  const name = (safeGet(holder, ['First_Name_Non_Normalized']) || safeGet(holder, ['First_Name']) || '') + ' ' + (safeGet(holder, ['Surname_Non_Normalized']) || safeGet(holder, ['Last_Name']) || '');

  const score = parseInt(safeGet(scoreBlock, ['BureauScore']) || safeGet(root, ['SCORE', 'BureauScore']) || '0');

  // summary block
  const summary = safeGet(root, ['CAIS_Account', 'CAIS_Summary']) || safeGet(root, ['CAIS_Summary']) || {};
  const totalAccounts = parseInt(safeGet(summary, ['Credit_Account', 'CreditAccountTotal']) || '0');
  const activeAccounts = parseInt(safeGet(summary, ['Credit_Account', 'CreditAccountActive']) || '0');
  const closedAccounts = parseInt(safeGet(summary, ['Credit_Account', 'CreditAccountClosed']) || '0');

  const totals = safeGet(summary, ['Total_Outstanding_Balance']) || {};
  const secured = parseInt(safeGet(totals, ['Outstanding_Balance_Secured']) || '0');
  const unsecured = parseInt(safeGet(totals, ['Outstanding_Balance_UnSecured']) || '0');
  const currentAll = parseInt(safeGet(totals, ['Outstanding_Balance_All']) || '0');

  // build account details list (iterate CAIS_Account_DETAILS nodes)
  let accounts = [];
  const accountDetails = safeGet(root, ['CAIS_Account', 'CAIS_Account_DETAILS']) || safeGet(root, ['CAIS_Account_DETAILS']) || [];
  const normalizedAccountDetails = Array.isArray(accountDetails) ? accountDetails : (accountDetails ? [accountDetails] : []);

  normalizedAccountDetails.forEach(acc => {
    if (!acc) return;
    const holderDetails = safeGet(acc, ['CAIS_Holder_Details']) || {};
    const phoneDetails = safeGet(acc, ['CAIS_Holder_Phone_Details']) || {};
    const history = [];

    const historyRaw = acc.CAIS_Account_History;
    if (historyRaw) {
      const entries = Array.isArray(historyRaw) ? historyRaw : [historyRaw];
      entries.forEach(h => {
        history.push({
          year: parseInt(h.Year||0),
          month: parseInt(h.Month||0),
          daysPastDue: parseInt(h.Days_Past_Due||0),
          assetClassification: h.Asset_Classification || ''
        });
      });
    }

    accounts.push({
      subscriberName: acc.Subscriber_Name || acc.subscriberName || '',
      accountNumber: acc.Account_Number || acc.accountNumber || '',
      portfolioType: acc.Portfolio_Type || '',
      accountType: acc.Account_Type || '',
      openDate: acc.Open_Date || '',
      creditLimit: parseInt(acc.Credit_Limit_Amount || 0),
      currentBalance: parseInt(acc.Current_Balance || 0),
      amountPastDue: parseInt(acc.Amount_Past_Due || 0),
      paymentHistoryProfile: acc.Payment_History_Profile || '',
      accountHistory: history
    });
  });

  // addresses: gather available address lines
  const addr = safeGet(root, ['CAIS_Account', 'CAIS_Account_DETAILS', 'CAIS_Holder_Address_Details']) || safeGet(root, ['CAIS_Holder_Address_Details']) || {};
  const addresses = [];
  if (addr) {
    const lines = [
      addr.First_Line_Of_Address_non_normalized || addr.First_Line_Of_Address || addr.FirstLine || '',
      addr.Second_Line_Of_Address_non_normalized || '',
      addr.Third_Line_Of_Address_non_normalized || '',
      addr.City_non_normalized || addr.City || '',
      addr.ZIP_Postal_Code_non_normalized || addr.ZIP_Postal_Code || addr.ZIP || ''
    ].filter(Boolean);
    if (lines.length) addresses.push(lines.join(', '));
  }

  return {
    name: name.trim(),
    mobilePhone: phone || '',
    pan: pan || '',
    dateOfBirth: safeGet(holder, ['Date_of_birth']) || safeGet(root, ['Date_Of_Birth_Applicant']) || '',
    creditScore: score || 0,
    totalAccounts,
    activeAccounts,
    closedAccounts,
    currentBalanceAmount: currentAll,
    securedAmount: secured,
    unsecuredAmount: unsecured,
    last7DaysEnquiries: parseInt(safeGet(root, ['TotalCAPS_Summary', 'TotalCAPSLast7Days']) || 0),
    creditAccounts: accounts,
    addresses,
  };
}

module.exports = { parseXmlString, extractReport };
