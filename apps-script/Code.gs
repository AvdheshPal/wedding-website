/**
 * Wedding RSVP -> Google Sheet
 * Paste this whole file into Extensions > Apps Script (see SETUP-RSVP.md).
 * Each RSVP becomes one new row in a tab called "RSVP".
 */
var SHEET_NAME = 'RSVP';
var HEADERS = ['Received (IST)', 'Name', 'Guests', 'Attendance', 'Message'];
var STATUS = { attending: 'Attending', declined: 'Unable to attend', undecided: 'Not sure yet' };

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return ok_();                       // spam trap: bots fill this hidden field

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a'),
      safe_(p.name),
      Number(p.guests) || '',
      STATUS[p.status] || safe_(p.status),
      safe_(p.message)
    ]);
  } finally {
    lock.releaseLock();
  }
  return ok_();
}

function doGet() { return ContentService.createTextOutput('RSVP endpoint is running.'); }

// Stops a guest typing "=SOMETHING()" from running as a formula in your sheet.
function safe_(v) {
  v = String(v == null ? '' : v).slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
function ok_() { return ContentService.createTextOutput('ok'); }
