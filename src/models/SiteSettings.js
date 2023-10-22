const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  logoUrl: { type: String },
  primaryColor: { type: String },
  secondaryColor: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  // Add more settings fields as needed
});

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

module.exports = SiteSettings;
