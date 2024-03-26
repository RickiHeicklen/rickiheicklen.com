const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5",
                      "Item 6", "Item 7", "Item 8", "Item 9", "Item 10",
                      "Item 11", "Item 12", "Item 13", "Item 14", "Item 15",
                      "Item 16", "Item 17", "Item 18", "Item 19", "Item 20",
                      "Item 21", "Item 22", "Item 23", "Item 24", "Item 25"];
let items = [...initialItems];

function generateBoard() {
  const board = document.getElementById('bingoBoard');
  board.innerHTML = '';
  let displayItems = [...items];

  if (items.length > 25) {
    // If more than 25 items, select 25 randomly without replacement
    displayItems = [];
    let tempItems = [...items];
    for (let i = 0; i < 25; i++) {
      const randomIndex = Math.floor(Math.random() * tempItems.length);
      displayItems.push(tempItems[randomIndex]);
      tempItems.splice(randomIndex, 1); // Remove the selected item
    }
  }

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.textContent = displayItems[i] || ''; // Use empty string if no item
    cell.className = 'bingo-cell';
    board.appendChild(cell);
  }
}

function updateItemsList() {
  const list = document.getElementById('itemsList');
  list.innerHTML = '';
  items.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.textContent = item;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.onclick = () => {
      items.splice(index, 1);
      updateItemsList();
      generateBoard();
    };
    itemElement.appendChild(removeBtn);
    list.appendChild(itemElement);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

document.getElementById('shuffleItems').addEventListener('click', () => {
  shuffleArray(items);
  generateBoard();
});

document.getElementById('randomizeBoard').addEventListener('click', () => {
  shuffleArray(initialItems);
  items = [...initialItems];
  updateItemsList();
  generateBoard();
});

document.getElementById('addItem').addEventListener('click', () => {
  const newItem = document.getElementById('newItem').value.trim();
  if (newItem && !items.includes(newItem)) {
    items.push(newItem);
    document.getElementById('newItem').value = ''; // Clear input field
    updateItemsList();
    generateBoard();
  }
});

// Initial setup
generateBoard();
updateItemsList();