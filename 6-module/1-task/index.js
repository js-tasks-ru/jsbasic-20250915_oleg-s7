export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this._createTable();
  }

  _createTable() {
    const table = document.createElement('table');

    table.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    for (let row of this.rows) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      `;

      tr.querySelector('button').addEventListener('click', () => {
        tr.remove();
      });

      tbody.appendChild(tr);
    }

    return table;
  }
}