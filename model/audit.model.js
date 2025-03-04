const { Schema, model } = require('mongoose');

const auditSchema = Schema(require('../auditoria/audit.interface.ts'));

module.exports = model('Audit', auditSchema);