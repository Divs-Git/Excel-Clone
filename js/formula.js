let formulaBar = document.querySelector('.formula-bar');

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener('blur', (event) => {
      // gives previous selected cell address
      let address = addressBar.value;
      let [activeCell, cellProp] = getActiveCellAndCellProp(address);
      let enteredData = activeCell.innerText;

      // update check for hardcoded value in cells
      if (enteredData === cellProp.value) {
        return;
      }
      cellProp.value = enteredData;

      // If data modified update: remove Parent child relation, formula empty, update children with new(modified) values
      removeChildFromParent(cellProp.formula);
      cellProp.formula = '';
      updateChildernCell(address);
    });
  }
}

// Formula bar value entry
formulaBar.addEventListener('keydown', (event) => {
  let inputFormula = formulaBar.value;
  if (event.key === 'Enter' && inputFormula) {
    let address = addressBar.value;
    let [cell, cellProp] = getActiveCellAndCellProp(address);

    //  if change in formula, break old parent-child relationship, evaluate new formula, add new parent-child relationship
    if (inputFormula !== cellProp.formula) {
      removeChildFromParent(cellProp.formula);
    }

    let evaluatedValue = evaluateFormula(inputFormula);
    // To update UI and Cell prop in DB
    setCellUIAndCellProp(evaluatedValue, inputFormula, address);
    addChildToParent(inputFormula);
    updateChildernCell(address);
  }
});

// Recursive call for formula values to be synced up
function addChildToParent(formula) {
  let childAddress = addressBar.value;
  let encodedFormula = formula.split(' ');
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getActiveCellAndCellProp(
        encodedFormula[i]
      );
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(oldFormula) {
  let childAddress = addressBar.value;
  let encodedFormula = oldFormula.split(' ');
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = getActiveCellAndCellProp(
        encodedFormula[i]
      );
      let idx = parentCellProp.children.indexOf(childAddress);
      parentCellProp.children.splice(idx, 1);
    }
  }
}

function updateChildernCell(parentAddress) {
  let [parentCell, parentCellProp] = getActiveCellAndCellProp(parentAddress);
  let childrens = parentCellProp.children;

  for (let i = 0; i < childrens.length; i++) {
    let childAddress = childrens[i];
    let [childCell, childCellProp] = getActiveCellAndCellProp(childAddress);
    let childFormula = childCellProp.formula;
    let evaluatedValue = evaluateFormula(childFormula);

    setCellUIAndCellProp(evaluatedValue, childFormula, childAddress);
    // recusrive call to update all childrens
    updateChildernCell(childAddress);
  }
}

// Evaluation of formula
function evaluateFormula(formula) {
  let encodedFormula = formula.split(' ');
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [cell, cellProp] = getActiveCellAndCellProp(encodedFormula[i]);
      encodedFormula[i] = cellProp.value;
    }
  }

  let decodedFormula = encodedFormula.join(' ');
  return eval(decodedFormula);
}

// passing address to evaluate parent and childs accordingly
function setCellUIAndCellProp(evaluatedValue, formula, address) {
  let [cell, cellProp] = getActiveCellAndCellProp(address);

  // UI Update
  cell.innerText = evaluatedValue;

  // DB Update
  cellProp.value = evaluatedValue;
  cellProp.formula = formula;
}
