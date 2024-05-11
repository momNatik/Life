onload = init;

const width = 100;
const height = 50;

let table;

function init() {
  createMatrix();
  runLife();
}

function runLife() {
  initMatrix();
  const timerId = setInterval(runIteration, 300);
}

function runIteration() {
  const buffer = [width * height];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sum =
        getPointValue(x - 1, y) +
        getPointValue(x + 1, y) +
        getPointValue(x, y - 1) +
        getPointValue(x, y + 1) +
        getPointValue(x - 1, y - 1) +
        getPointValue(x + 1, y - 1) +
        getPointValue(x - 1, y + 1) +
        getPointValue(x + 1, y + 1);

      const cell = getPoint(x, y);

      buffer[y * width + x] = cell;

      if (cell) {
        if (sum != 2 && sum != 3) {
          buffer[y * width + x] = false;
        }
      } else {
        if (sum == 3) {
          buffer[y * width + x] = true;
        }
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = buffer[y * width + x];
      setPoint(x, y, value);
    }
  }
}

function getPointValue(x, y) {
  const a = (x + width) % width;
  const b = (y + height) % height;

  const f = getPoint(a, b);
  return f ? 1 : 0;
}

function initMatrix() {
  const count = width * height * 0.25;
  for (let j = 0; j < count; j++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    setPoint(x, y, true);
  }
}

function createMatrix() {
  const container = document.getElementById("container");

  table = document.createElement("table");
  table.cellPadding = 0;
  table.cellSpacing = 0;

  container.appendChild(table);

  for (let j = 0; j < height; j++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);

    for (let i = 0; i < width; i++) {
      const td = document.createElement("td");
      tr.appendChild(td);
    }
  }
}

function setPoint(x, y, f) {
  const cell = getCell(x, y);

  cell.className = f ? "exists" : "empty";
}

function getPoint(x, y) {
  const cell = getCell(x, y);

  return cell.className == "exists";
}

function getCell(x, y) {
  const tr = table.childNodes[y];
  const td = tr.childNodes[x];
  return td;
}
