const { parseXmlString, extractReport } = require('../services/xmlParser.service');
const CreditReport = require('../models/CreditReport');

exports.uploadXml = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: 'No file uploaded' });

    const xmlFile = req.files[0];
    const xmlString = xmlFile.buffer.toString('utf8');

    const parsed = await parseXmlString(xmlString);
    const data = extractReport(parsed);

    const doc = new CreditReport({ ...data, sourceFilename: xmlFile.originalname, rawXml: xmlString });
    await doc.save();

    return res.status(201).json({ id: doc._id, message: 'Report created' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to parse and save XML', detail: err.message });
  }
};

exports.listReports = async (req, res) => {
  try {
    const list = await CreditReport.find({}, 'name creditScore totalAccounts parsedAt').sort({ parsedAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const r = await CreditReport.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Not found' });
    res.json(r);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
