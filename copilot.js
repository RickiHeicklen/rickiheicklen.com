function calculateDaysBetweenDates(begin, end) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const millisecondsBetweenDates = end - begin;
    const daysBetweenDates = millisecondsBetweenDates / millisecondsPerDay;
    return daysBetweenDates;
}

// find all images without alternate text
// and give them a red border
function process() {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
        if (!image.alt) {
            image.style.border = '5px solid red';
        }
    });
}

// Express server on port 3000
const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(3000, () => console.log('Server listening on port 3000'));

// Return the current time
app.get('/', (req, res) => {
    res.send(new Date());
});
