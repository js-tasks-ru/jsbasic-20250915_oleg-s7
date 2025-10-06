function highlight(table) {
  for (let row of table.tBodies[0].rows) {
    let ageCell = row.cells[1];
    let genderCell = row.cells[2];
    let statusCell = row.cells[3];

    if (statusCell.hasAttribute('data-available')) {
      if (statusCell.dataset.available === "true") {
        row.classList.add('available');
      } else if (statusCell.dataset.available === "false") {
        row.classList.add('unavailable');
      }
    } else {
      row.hidden = true;
    }

    if (genderCell.textContent === 'm') {
      row.classList.add('male');
    } else if (genderCell.textContent === 'f') {
      row.classList.add('female');
    }

    if (Number(ageCell.textContent) < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
