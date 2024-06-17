# Daily Sales Report Application

This project is a web-based tool designed to create and manage daily sales reports. The application allows users to upload CSV files, convert the data into a table, perform calculations, and generate PDF reports. The interface is built using HTML, CSS, and JavaScript, and it leverages several libraries for enhanced functionality.

## Table of Contents
- [HTML Structure](#html-structure)
- [CSS Styling](#css-styling)
- [JavaScript Functionality](#javascript-functionality)
- [Libraries Used](#libraries-used)
- [How to Use](#how-to-use)

## HTML Structure

The HTML code sets up the basic structure of the application:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Daily Sales Report</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="//kendo.cdn.telerik.com/2016.3.914/js/kendo.all.min.js"></script>
</head>
<body>
  <input type="file" id="data" accept=".csv" />
  <h2>Let's Create a Daily Sales Report</h2>
  <div id="wildcard"></div>
  <textarea id="jsonData" rows="5" cols="50"></textarea>
  <br>
  <button onClick="getThirdColumnValues('tableData')">Calculate</button>
  <br>
  <button id="convertButton" onclick="readData()">Convert to Table</button>
  <input id="datePicker" type="date"/>
  <button onClick="changeDate()">Change The Date</button>
  <div id="tableContainer"></div>
  <div id="div1"></div>
  <button class="btn btn-primary" onclick="generatePDF()"><i class="fa fa-save"></i> Save as PDF</button>
  <div class="container" id="formConfirmation">
    <div id="boundaries" class="col-6">
      <table class="table table-striped table-hover caption-top" id="daily">
        <div id="date">06/14/2024</div>
        <caption>Gecko Green Daily Sales Report</caption>
        <thead>
          <tr>
            <th>Sales Rep</th>
            <th>Units Sold</th>
            <th>Revenue Sold</th>
          </tr>
        </thead>
        <tbody id="tableData">
        </tbody>
      </table>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

## CSS Styling

The CSS styles enhance the visual presentation of the application:

```css
.dude td:nth-child(3) {
  background-color: green !important;
}
#date {
  text-align: center;
}
caption {
    padding-top: 8px;
    padding-bottom: 8px;
    color: black !important;
    text-align: center !important;
}
#boundaries {
  margin-top: 15px;
  margin-left: 5px;
  border: 2px solid black;
}
```

## JavaScript Functionality

The JavaScript code provides the core functionality of the application:

1. **Format to Currency**: Formats numbers as currency.
2. **Change Date**: Updates the displayed date.
3. **CSV File Upload and Processing**: Reads and processes CSV files to generate table data.
4. **Generate PDF**: Converts the displayed report into a PDF file.
5. **Calculate Totals**: Computes the total revenue from the table data.

### Key Functions

```javascript
// Format numbers to currency
function formatToCurrency(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}

// Change the date displayed in the report
function changeDate() {
  const originalDate = document.getElementById('datePicker').value;
  const formattedDate = formatDate(originalDate);
  document.getElementById("date").innerHTML = formattedDate;
}

// Read and process CSV file to generate table data
document.querySelector('input').addEventListener('change', function() {
  var reader = new FileReader();
  reader.onload = function() {
    var arrayBuffer = this.result,
        array = new Uint8Array(arrayBuffer),
        binaryString = String.fromCharCode.apply(null, array);
    var workbook = XLSX.read(binaryString, { type: "binary" });
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    const tableBody = document.getElementById('tableData');
    data.sort((a, b) => b.NetAfterDiscount - a.NetAfterDiscount);
    const threshold = Math.floor(data.length * 0.1);
    const filteredData = data.map((item, index) => ({
      GroupBy: item.GroupBy,
      Num: item.Num,
      NetAfterDiscount: item.NetAfterDiscount,
      isTopEarner: index < threshold
    }));
    
    filteredData.forEach(item => {
      const tableRow = createTableRow(item.GroupBy, item.Num, item.NetAfterDiscount, item.isTopEarner);
      tableBody.appendChild(tableRow);
    });
  }
  reader.readAsArrayBuffer(this.files[0]);
});

// Generate PDF from the report
var generatePDF = function() {
  kendo.drawing.drawDOM("#formConfirmation", {
    paperSize: "Letter"
  }).then(function(group) {
    kendo.drawing.pdf.saveAs(group, document.getElementById("date").innerHTML + " Daily Sales Report.pdf");
  });
}

// Additional utility functions...
```

## Libraries Used

- **Bootstrap**: For responsive design and styling.
- **jQuery**: For DOM manipulation and event handling.
- **Kendo UI**: For drawing and exporting PDF documents.
- **SheetJS (XLSX)**: For reading and processing Excel files.

## How to Use

1. **Upload CSV File**: Click the "Choose File" button and select a CSV file containing the sales data.
2. **Convert to Table**: Click the "Convert to Table" button to process the CSV file and display the data in a table.
3. **Calculate Totals**: Click the "Calculate" button to compute the total revenue.
4. **Change the Date**: Select a date using the date picker and click the "Change The Date" button to update the report date.
5. **Generate PDF**: Click the "Save as PDF" button to generate and download a PDF version of the report.

By following these steps, you can create and manage daily sales reports efficiently.
