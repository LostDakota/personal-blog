const path = require('path');
const fs = require('fs');

const f = path.resolve('./dist/developer-blog/index.html');

fs.readFile(f, 'utf8', (err, data) => {
    if (!err) {
        var result = data.replace(/href="styles./g, `media="print" onload="this.media='all'" href="styles.`);

        fs.writeFile(f, result, 'utf8', () => null);
    }
})