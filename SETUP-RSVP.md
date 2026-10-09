# RSVP -> Google Sheet (free, one-time, ~5 minutes)

1. Go to https://sheets.google.com and create a **blank spreadsheet**. Name it "Wedding RSVPs".
2. Menu **Extensions > Apps Script**. Delete everything in the editor, paste the full contents of
   `apps-script/Code.gs`, and click the **Save** (disk) icon.
3. Click **Deploy > New deployment**. Click the gear next to "Select type" and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**. Google asks you to authorise: **Review permissions > choose your account >
   Advanced > "Go to project (unsafe)" > Allow**. (It is your own script; this warning is normal.)
4. Copy the **Web app URL** (starts with https://script.google.com/macros/s/...).
5. Open `js/config.js`, find `rsvp: { endpoint: "" }`, and paste the URL between the quotes:
   `rsvp: { endpoint: "https://script.google.com/macros/s/XXXX/exec" }`
6. Reload the site, submit a test RSVP, and check the "RSVP" tab in your sheet. Delete the test row.

If you ever edit the script, use **Deploy > Manage deployments > Edit > New version > Deploy**.
