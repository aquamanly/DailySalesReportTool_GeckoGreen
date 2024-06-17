//format to currency
function formatToCurrency(number) {
    // Use Number.prototype.toFixed(2) to format the number with 2 decimal places
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number);
  }       
  
  document.querySelector('input').addEventListener('change', function() {
              var reader = new FileReader();
              reader.onload = function() {
                  var arrayBuffer = this.result,
                      array = new Uint8Array(arrayBuffer),
                      binaryString = String.fromCharCode.apply(null, array);
              
  
                  /* Call XLSX */
                  var workbook = XLSX.read(binaryString, {
                      type: "binary"
                  });
  
                  /* DO SOMETHING WITH workbook HERE */
                  var first_sheet_name = workbook.SheetNames[0];
                  /* Get worksheet */
                  var worksheet = workbook.Sheets[first_sheet_name];
                 
  
                  var data = XLSX.utils.sheet_to_json(worksheet, {
                      raw: true
                  });
                 
  const tableBody = document.getElementById('tableData');
  
  // Function to create a table row element with data
  function createTableRow(salesRep, unitsSold, revenueSold, isTopEarner) {
    const tableRow = document.createElement('tr');
    const repCell = document.createElement('td');
    const unitsCell = document.createElement('td');
    const revenueCell = document.createElement('td');
    repCell.textContent = salesRep;
    unitsCell.textContent = unitsSold;
    revenueCell.id= revenueSold;
    revenueCell.textContent = formatToCurrency(revenueSold);
    tableRow.classList.add(isTopEarner ? 'table-success' : 'bro');  // Add class conditionally
    tableRow.appendChild(repCell);
    tableRow.appendChild(unitsCell);
    tableRow.appendChild(revenueCell);
    return tableRow;
  }
  
  // Sort the data by NetAfterDiscount in descending order (highest to lowest)
  data.sort((a, b) => b.NetAfterDiscount - a.NetAfterDiscount);
  
  // Calculate the threshold for top 10% earners
  const threshold = Math.floor(data.length * 0.1);
  
  // Create table rows from filtered data
  const filteredData = data.map((item, index) => ({
    GroupBy: item.GroupBy,
    Num: item.Num,
    NetAfterDiscount: item.NetAfterDiscount,
    isTopEarner: index < threshold  // Flag for top earners
  }));
  
  filteredData.forEach(item => {
    const tableRow = createTableRow(item.GroupBy, item.Num, item.NetAfterDiscount, item.isTopEarner);
    tableBody.appendChild(tableRow);
  });
              }
              reader.readAsArrayBuffer(this.files[0]);
            //getThirdColumnValues("tableData");
            console.log("dude");
          });
  
  //Total things
  function getThirdColumnValues(tableId) {
     var totals = 0;
      console.log("that taste of burger");
    var table = document.getElementById("tableData");
  console.log("there are "+table.rows.length +" rows");
   
  // Iterate over the rows in the table
  for (var i = 0; i < table.rows.length; i++) {
    // Get a reference to the current row
    var row = table.rows[i];
  
    // Iterate over the cells in the row
   // for (var j = 0; j < row.cells.length; j++) {
      // Get a reference to the current cell
      var cell = row.cells[2];
    
        totals += parseFloat(cell.id);
      // Do something with the cell, such as accessing its content or modifying its attributes
      console.log(parseFloat(cell.id));
    //}
  }
    console.log(formatToCurrency(totals));
    addTotalRow("tableData", formatToCurrency(totals));
    }
  
  
  //Add the row of totals
  
  function addTotalRow(tableId, totalSum) {
    // Get a reference to the table element
    const table = document.getElementById(tableId);
  
    // Check if the table exists
    if (table) {
      // Create a new table row element
      const newRow = document.createElement("tr");
  
      // Create a new table cell element
      const newCella = document.createElement("td");
      
      const newCellb = document.createElement("td");
          const newCellC = document.createElement("td");
  
      // Set the text content of the cell to "Total"
      newCella.textContent = "Total is ";
      newCellb.textContent = "Total is ";
      newCellC.textContent = "Total is "+ totalSum;
       newCellC.style.textAlign = "right";
  
      // Add the cell to the new row
      newRow.appendChild(newCellC);
  
      // Get the table body element (assuming the table has a body)
      const tableBody = table.querySelector("tbody");
  
      // If there's no tbody, add the row directly to the table
      if (!tableBody) {
        //table.appendChild(newRow);
      } else {
        // Append the new row to the table body
        //tableBody.appendChild(newRow);
      }
      const content1 = " ";
  const content2 = " ";
  const content3 = "The total is: "+ totalSum;
  
  addThreeCellsRow("tableData", content1, content2, content3);
    } else {
      console.error("Table element with id '" + tableId + "' not found!");
    }
  }
  
  function addThreeCellsRow(tableId, cellContent1, cellContent2, cellContent3) {
    // Get the table element
    const table = document.getElementById(tableId);
  
    // Check if the table exists
    if (table) {
      // Get the last row (assuming you want to add after the last existing row)
      const lastRow = table.querySelector('tr:last-child');
  
      // Check if there's a last row
      if (lastRow) {
        // Create a new row element
        const newRow = document.createElement("tr");
  
        // Create and populate 3 cells
        const cell1 = document.createElement("td");
        cell1.textContent = cellContent1;
        newRow.appendChild(cell1);
  
        const cell2 = document.createElement("td");
        cell2.textContent = cellContent2;
        newRow.appendChild(cell2);
  
        const cell3 = document.createElement("td");
        cell3.textContent = cellContent3;
        newRow.appendChild(cell3);
  
        // Append the new row with 3 cells to the table
        table.appendChild(newRow);
      } else {
        console.warn("Table has no rows. Cannot add a new row.");
      }
    } else {
      console.error("Table element with id '" + tableId + "' not found!");
    }
  }
  
  // Example usage: Assuming you have existing data for the cells
  const content1 = "Value 1";
  const content2 = "Value 2";
  const content3 = "Value 3";
  
  addThreeCellsRow("tableData", content1, content2, content3); // Replace "myTable" with your actual table ID
  
  //yesterdays date
  
  function getYesterdayDate(excludeSunday = true) {
    const today = new Date();
    let yesterday = new Date(today.getTime() - (1000 * 60 * 60 * 24));
  
    // Check if yesterday is Sunday
    if (excludeSunday && yesterday.getDay() === 0) {
      yesterday.setDate(yesterday.getDate() - 1); // Go back another day (Saturday)
    }
  
    const dd = yesterday.getDate().toString().padStart(2, '0');
    const mm = (yesterday.getMonth() + 1).toString().padStart(2, '0'); // Jan is 0
    const yyyy = yesterday.getFullYear();
  
    return `${mm}/${dd}/${yyyy}`;
  }
  
  const yesterday = getYesterdayDate();
  console.log(yesterday); // Output: mm/dd/yyyy format, excluding Sunday
  document.getElementById("date").innerHTML = yesterday;