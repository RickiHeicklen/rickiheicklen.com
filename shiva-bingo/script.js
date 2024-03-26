const initialItems = [
  "Someone nobody knows comes, does not introduce self",
  "Someone talks for 3+ minutes about their own dead relative",
  "Zoom shiva visitor is accidentally not on mute",
  "What's the grammar for Hamakom Yenachem to [one person / all women]?",
  "Two shiva visitors are exes of each other",
  "\"How did he die?\"",
  "Someone asks where the food is",
  "Yahrzeit candle goes out",
  "Somebody corrects an avel about Hilchot Aveilut",
  "\"Was he in pain?\"",
  "Someone clearly doesn't actually know who died",
  "Food delivery that the aveilim can't eat",
  "Shiva gift from shiva.com",
  "\"Are you going to be saying Kaddish even though you're a woman?\""
];
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