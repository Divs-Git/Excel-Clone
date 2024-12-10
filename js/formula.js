let formulaBar = document.querySelector('.formula-bar');

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener('blur', (event) => {
      // gives previous selected cell address
      let address = addressBar.value;
      let [activeCell, cellProp] = getActiveCellAndCellProp(address);
      let enteredData = activeCell.innerText;

      cellProp.value = enteredData;
    });
  }
}

// Formula bar value entry
formulaBar.addEventListener('keydown', (event) => {
  let inputFormula = formulaBar.value;
  if (event.key === 'Enter' && inputFormula) {
    let evaluatedValue = evaluateFormula(inputFormula);

    // To update UI and Cell prop in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula);
  }
});

function evaluateFormula(formula) {
  let encodedFormula = formula.split(' ');
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      console.log(encodedFormula[i]);
      let [cell, cellProp] = getActiveCellAndCellProp(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }

  let decodedFormula = encodedFormula.join(' ');
  return eval(decodedFormula);
}

function setCellUIAndCellProp(evaluatedValue, formula) {
  let address = addressBar.value;
  let [cell, cellProp] = getActiveCellAndCellProp(address);

  // UI Update
  cell.innerText = evaluatedValue;

  // DB Update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
