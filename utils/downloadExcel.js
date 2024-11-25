import { utils, write } from "xlsx";

/**
 * Generates and sends an Excel file with sample data as a response
 * @param {Object} res - Express response object
 */
function downloadExcelFile(res) {
  // Sample data for the Excel spreadsheet
  const data = {
    Column1: Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
    Column2: Array.from({ length: 10 }, (_, i) => `Category ${(i % 3) + 1}`),
    Column3: Array.from({ length: 10 }, (_, i) => (i + 1) * 10),
    Column4: Array.from({ length: 10 }, (_, i) => `Type ${(i % 2) + 1}`),
    Column5: Array.from({ length: 10 }, (_, i) => `Description ${i + 1}`),
  };

  // Convert data object to an array of objects
  const rows = Array.from({ length: 10 }, (_, i) => ({
    Column1: data.Column1[i],
    Column2: data.Column2[i],
    Column3: data.Column3[i],
    Column4: data.Column4[i],
    Column5: data.Column5[i],
  }));

  // Create a new workbook and add the data to a sheet
  const workbook = utils.book_new();
  const worksheet = utils.json_to_sheet(rows);
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write workbook to buffer
  const buffer = write(workbook, { bookType: "xlsx", type: "buffer" });

  // Set headers to prompt a download in the browser
  res.setHeader("Content-Disposition", "attachment; filename=output.xlsx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

  // Send the buffer as the response
  res.send(buffer);
}

export default downloadExcelFile;
