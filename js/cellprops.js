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
      BGColor: '#000000',
    };
    sheetRow.push(cellProp);
  }
  sheetDB.push(sheetRow);
}

// Selectors for cell properties
let fontFamily = document.querySelector('.font-family-prop');
let fontSize = document.querySelector('.font-size-prop');
let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');
let alignment = document.querySelectorAll('.alignment');
let leftAlignment = alignment[0];
let centerAlignment = alignment[1];
let rightAlignment = alignment[2];
let fontColor = document.querySelector('.font-color-prop');
let BGColor = document.querySelector('.background-color-prop');

// Color Props
let activeColorProp = '#d1d8e0';
let inactiveColorProp = '#f1f2f6';

function getActiveCell(address) {
  let [rid, cid] = decodeCellAddress(address);

  // Access Cell and storage object
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
  let cellProp = sheetDB[rid][cid];
  return [cell, cellProp];
}

function decodeCellAddress(address) {
  // address -> "A1"
  let rid = Number(address.slice(1)) - 1; // "1" -> 0
  let cid = Number(address.charCodeAt(0)) - 65; // "A" -> 0
  return [rid, cid];
}

// Application of two way binding
// Event Listeners for property
bold.addEventListener('click', (event) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);

  // Modifications
  // Data Change
  cellProp.bold = !cellProp.bold;

  // UI Change
  cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal';
  bold.style.backgroundColor = cellProp.bold
    ? activeColorProp
    : inactiveColorProp;
});

italic.addEventListener('click', (event) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);

  // Modifications
  // Data Change
  cellProp.italic = !cellProp.italic;

  // UI Change
  cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
  italic.style.backgroundColor = cellProp.italic
    ? activeColorProp
    : inactiveColorProp;
});

underline.addEventListener('click', (event) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCell(address);

  // Modifications
  // Data Change
  cellProp.underline = !cellProp.underline;

  // UI Change
  cell.style.textDecoration = cellProp.underline ? 'underline' : 'normal';
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp;
});
