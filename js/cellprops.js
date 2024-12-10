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
      fontColor: '#000000',
      BGColor: '#000000',
      value: '',
      formula: '',
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

// Functions to get interacted cell
function getActiveCellAndCellProp(address) {
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

// Funtion on cell click
let allCells = document.querySelectorAll('.cell');
for (let i = 0; i < allCells.length; i++) {
  attachCellProperties(allCells[i]);
}
function attachCellProperties(cell) {
  cell.addEventListener('click', () => {
    let address = addressBar.value;
    let [rid, cid] = decodeCellAddress(address);
    let cellProp = sheetDB[rid][cid];

    // apply cell property
    cell.style.fontWeight = cellProp.bold ? 'bold' : 'normal';
    cell.style.fontStyle = cellProp.italic ? 'italic' : 'normal';
    cell.style.textDecoration = cellProp.underline ? 'underline' : 'normal';
    cell.style.fontSize = cellProp.fontSize + 'px';
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor =
      cellProp.BGColor === '#000000' ? 'transparancy' : cellProp.BGColor;
    cell.style.textAlign = cellProp.alignment;

    // Apply props property
    bold.style.backgroundColor = cellProp.bold
      ? activeColorProp
      : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic
      ? activeColorProp
      : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline
      ? activeColorProp
      : inactiveColorProp;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    fontColor.value = cellProp.fontColor;
    BGColor.value = cellProp.BGColor;
    switch (cellProp.alignment) {
      case 'left':
        leftAlignment.style.backgroundColor = activeColorProp;
        centerAlignment.style.backgroundColor = inactiveColorProp;
        rightAlignment.style.backgroundColor = inactiveColorProp;
        break;

      case 'center':
        leftAlignment.style.backgroundColor = inactiveColorProp;
        centerAlignment.style.backgroundColor = activeColorProp;
        rightAlignment.style.backgroundColor = inactiveColorProp;
        break;

      case 'right':
        leftAlignment.style.backgroundColor = inactiveColorProp;
        centerAlignment.style.backgroundColor = inactiveColorProp;
        rightAlignment.style.backgroundColor = activeColorProp;
        break;
    }
  });
}

// Application of two way binding
// Event Listeners for property
bold.addEventListener('click', (event) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCellAndCellProp(address);

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
  let [cell, cellProp] = getActiveCellAndCellProp(address);

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
  let [cell, cellProp] = getActiveCellAndCellProp(address);

  // Modifications
  // Data Change
  cellProp.underline = !cellProp.underline;

  // UI Change
  cell.style.textDecoration = cellProp.underline ? 'underline' : 'normal';
  underline.style.backgroundColor = cellProp.underline
    ? activeColorProp
    : inactiveColorProp;
});

fontSize.addEventListener('change', (event) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCellAndCellProp(address);

  cellProp.fontSize = fontSize.value; // Data Change

  // UI Change
  cell.style.fontSize = cellProp.fontSize + 'px';
  fontSize.value = cellProp.fontSize;
});

fontFamily.addEventListener('change', (event) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCellAndCellProp(address);

  cellProp.fontFamily = fontFamily.value; // Data Change

  // UI Change
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener('change', (event) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCellAndCellProp(address);

  cellProp.fontColor = fontColor.value; // Data Change

  // UI Change
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
});

BGColor.addEventListener('change', (event) => {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCellAndCellProp(address);

  cellProp.BGColor = BGColor.value; // Data Change

  // UI Change
  cell.style.backgroundColor = cellProp.BGColor;
  BGColor.value = cellProp.BGColor;
});

alignment.forEach((element) => {
  element.addEventListener('click', (event) => {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndCellProp(address);

    let alignValue = event.target.classList[0];
    cellProp.alignment = alignValue; // Data Chnage
    cell.style.textAlign = cellProp.alignment;
    switch (alignValue) {
      case 'left':
        leftAlignment.style.backgroundColor = activeColorProp;
        centerAlignment.style.backgroundColor = inactiveColorProp;
        rightAlignment.style.backgroundColor = inactiveColorProp;
        break;

      case 'center':
        leftAlignment.style.backgroundColor = inactiveColorProp;
        centerAlignment.style.backgroundColor = activeColorProp;
        rightAlignment.style.backgroundColor = inactiveColorProp;
        break;

      case 'right':
        leftAlignment.style.backgroundColor = inactiveColorProp;
        centerAlignment.style.backgroundColor = inactiveColorProp;
        rightAlignment.style.backgroundColor = activeColorProp;
        break;
    }
  });
});
