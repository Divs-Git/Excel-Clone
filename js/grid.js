let rows = 100;
let cols = 26;

let addressColumnContainer = document.querySelector(
  '.address-column-container'
);
let addressRowContainer = document.querySelector('.address-row-container');
let cellsContainer = document.querySelector('.cells-container');
let addressBar = document.querySelector('.address-bar');

for (let i = 0; i < rows; i++) {
  let addressCol = document.createElement('div');
  addressCol.setAttribute('class', 'address-col');
  addressCol.innerText = i + 1;
  addressColumnContainer.appendChild(addressCol);
}

for (let i = 0; i < cols; i++) {
  let addressRow = document.createElement('div');
  addressRow.setAttribute('class', 'address-row');
  addressRow.innerText = String.fromCharCode(65 + i); // number to Alphabet conversion
  addressRowContainer.appendChild(addressRow);
}

for (let i = 0; i < rows; i++) {
  let rowContainer = document.createElement('div');
  rowContainer.setAttribute('class', 'row-container');
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement('div');
    cell.setAttribute('class', 'cell');
    cell.setAttribute('contentEditable', true);

    // Attributes for cell identification and its storage
    cell.setAttribute('rid', i);
    cell.setAttribute('cid', j);

    cell.setAttribute('spellcheck', false);
    rowContainer.appendChild(cell);
    addEventListenerAddressBarDisplay(cell, i, j);
  }
  cellsContainer.appendChild(rowContainer);
}

function addEventListenerAddressBarDisplay(cell, i, j) {
  cell.addEventListener('click', (e) => {
    let rowID = i + 1;
    let colID = String.fromCharCode(65 + j);
    addressBar.value = `${colID}${rowID}`;
  });
}

// default selected cell
let firstCell = document.querySelector('.cell');
firstCell.click();
