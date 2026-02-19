// ─────────────────────────────────────────────────────────────────────────────
// VOLTA NYC — Google Apps Script
// Deploy this as a Web App (see README for instructions).
// It handles two form types:
//   type: "application" → writes to the Applications sheet + saves resume to Drive
//   type: "inquiry"     → writes to the Inquiries sheet + sends email
// ─────────────────────────────────────────────────────────────────────────────

var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';  // ← paste your Sheet ID
var RESUME_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE'; // ← paste your Drive folder ID
var NOTIFY_EMAIL = 'volta.newyork@gmail.com';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.type === 'application') {
      return handleApplication(data);
    } else if (data.type === 'inquiry') {
      return handleInquiry(data);
    } else {
      return jsonResponse({ error: 'Unknown form type' }, 400);
    }
  } catch (err) {
    Logger.log('Error: ' + err.toString());
    return jsonResponse({ error: err.toString() }, 500);
  }
}

// ── Student Application ───────────────────────────────────────────────────
function handleApplication(data) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName('Applications') || ss.insertSheet('Applications');

  // Add headers if this is a new sheet (first row is empty)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Name', 'Email', 'School', 'Year', 'Track',
      'Skills', 'Why Volta', 'Availability', 'Resume Link', 'Status'
    ]);
    // Style the header row
    sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#C4F135');
  }

  // Save resume to Drive if provided
  var resumeLink = '';
  if (data.resumeBase64 && data.resumeName) {
    try {
      var folder = DriveApp.getFolderById(RESUME_FOLDER_ID);
      var decoded = Utilities.base64Decode(data.resumeBase64);
      var blob = Utilities.newBlob(decoded, 'application/octet-stream', data.resumeName);
      var file = folder.createFile(blob);
      file.setName(data.name + ' — ' + data.resumeName);
      resumeLink = file.getUrl();
    } catch (err) {
      Logger.log('Resume save error: ' + err.toString());
      resumeLink = 'Error saving resume: ' + err.toString();
    }
  }

  // Append the row
  sheet.appendRow([
    new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.schoolFinal || data.school || '',
    data.year || '',
    data.track || '',
    data.skills || '',
    data.why || '',
    data.availability || '',
    resumeLink,
    'New', // default status — update manually to: Interview Scheduled / Accepted / Rejected
  ]);

  // Send confirmation email to applicant
  if (data.email) {
    MailApp.sendEmail({
      to: data.email,
      subject: 'Volta NYC — Application Received',
      body:
        'Hi ' + (data.name || 'there') + ',\n\n' +
        'We received your application to Volta NYC. We review on a rolling basis and will reach out to schedule a short interview within 1–2 weeks.\n\n' +
        'In the meantime, feel free to reply to this email with any questions.\n\n' +
        '— Volta NYC\n' +
        'volta.newyork@gmail.com\n' +
        'nyc.voltanpo.org',
    });
  }

  // Notify the team
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New Volta Application: ' + (data.name || 'Unknown'),
    body:
      'New application received.\n\n' +
      'Name: ' + data.name + '\n' +
      'Email: ' + data.email + '\n' +
      'School: ' + (data.schoolFinal || data.school) + '\n' +
      'Year: ' + data.year + '\n' +
      'Track: ' + data.track + '\n\n' +
      'View in Sheets: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID,
  });

  return jsonResponse({ success: true });
}

// ── Business / BID Inquiry ────────────────────────────────────────────────
function handleInquiry(data) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName('Inquiries') || ss.insertSheet('Inquiries');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Org Name', 'Contact Name', 'Email', 'Phone',
      'Type', 'Neighborhood', 'Services Requested', 'Message', 'Status'
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#C4F135');
  }

  sheet.appendRow([
    new Date().toISOString(),
    data.orgName || '',
    data.contactName || '',
    data.email || '',
    data.phone || '',
    data.type || '',
    data.neighborhood || '',
    data.services || '',
    data.message || '',
    'New',
  ]);

  // Notify team by email
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New Partner Inquiry: ' + (data.orgName || 'Unknown'),
    body:
      'New inquiry from nyc.voltanpo.org\n\n' +
      'Organization: ' + data.orgName + '\n' +
      'Contact: ' + data.contactName + '\n' +
      'Email: ' + data.email + '\n' +
      'Phone: ' + (data.phone || 'Not provided') + '\n' +
      'Type: ' + data.type + '\n' +
      'Neighborhood: ' + (data.neighborhood || 'Not provided') + '\n' +
      'Services: ' + data.services + '\n\n' +
      'Message:\n' + (data.message || 'None') + '\n\n' +
      'View in Sheets: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID,
  });

  // Auto-reply to the inquirer
  if (data.email) {
    MailApp.sendEmail({
      to: data.email,
      subject: 'Volta NYC — We\'ll be in touch',
      body:
        'Hi ' + (data.contactName || 'there') + ',\n\n' +
        'Thanks for reaching out to Volta NYC. We\'ve received your message and will follow up within 2–3 business days to schedule an intro call.\n\n' +
        'In the meantime, you can see our current work at nyc.voltanpo.org/showcase.\n\n' +
        '— Volta NYC\n' +
        'volta.newyork@gmail.com',
    });
  }

  return jsonResponse({ success: true });
}

// ── Helpers ───────────────────────────────────────────────────────────────
function jsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// Run this once manually to create the spreadsheet structure
function setup() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log('Connected to: ' + ss.getName());
  Logger.log('Setup complete. Deploy as web app to start receiving submissions.');
}
