/**
 * Orienteering Web App Backend
 * Built for Google Apps Script
 */

function doGet(e) {
  const mode = e.parameter.mode || 'home';
  const banaId = e.parameter.banaId || '';
  
  const template = HtmlService.createTemplateFromFile('Index');
  template.mode = mode;
  template.banaId = banaId;
  
  return template.evaluate()
    .setTitle('Orienteering App')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Fetch available courses from the "Courses" sheet.
 * If sheet doesn't exist, returns sample data for demonstration.
 */
function getCourses() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Courses');
  
  if (!sheet) {
    // Create sample data if sheet doesn't exist
    sheet = ss.insertSheet('Courses');
    sheet.appendRow(['ID', 'Name', 'Data (JSON)']);
    const sampleTrack = [
      { name: 'Start', lat: 59.3293, lng: 18.0686, radius: 20 },
      { name: 'Control 1', lat: 59.3300, lng: 18.0700, radius: 15 },
      { name: 'Control 2', lat: 59.3310, lng: 18.0720, radius: 15 },
      { name: 'Goal', lat: 59.3320, lng: 18.0740, radius: 20 }
    ];
    sheet.appendRow(['sample_1', 'Stockholm City Run', JSON.stringify(sampleTrack)]);
  }
  
  const data = sheet.getDataRange().getValues();
  const courses = [];
  
  for (let i = 1; i < data.length; i++) {
    courses.push({
      id: data[i][0],
      name: data[i][1],
      track: JSON.parse(data[i][2])
    });
  }
  
  return courses;
}

/**
 * Save race results to the "Results" sheet.
 */
function saveResult(result) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Results');
  
  if (!sheet) {
    sheet = ss.insertSheet('Results');
    sheet.appendRow(['Timestamp', 'CourseID', 'User', 'Time', 'Distance (m)', 'Detour %', 'Splits JSON']);
  }
  
  sheet.appendRow([
    new Date(),
    result.courseId,
    result.userName,
    result.totalTime,
    result.totalDistance,
    result.detourPercent,
    JSON.stringify(result.splits)
  ]);
  
  return { success: true };
}

/**
 * Utility to include JS/CSS files in the HTML template
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
