// storage
let sheetDB = [];
for (let i = 0; i < rows; i++) {
  let sheetRow = [];
  for (let j = 0; j < cols; j++) {
    let cellProp = {
      //default values
      bold: false,
      italic: false,
      underline: false,
      alignment: 'left',
      fontFamily: 'monospace',
      fontSize: 12,
      textColor: '#000000',
      bgColor: '#000000',
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

// Selectors for cell properties
