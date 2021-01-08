const path = require('path');
const fs = require('fs');

const index = path.resolve('./dist/developer-blog/index.html');

fs.readFile(index, 'utf8', (err, data) => {
    if (!err) {
        var t = data.replace('</head>', '\n</head>').replace('<script ', '\n<script ');

        const elementArr = t.split('\n');
        const toReplace = elementArr.filter(c => c.indexOf('styles.') > -1)[0];

        const actualFileName = toReplace.split('"').filter(c => c.indexOf('styles.') > -1)[0];
        const filePath = path.resolve(`./dist/developer-blog/${actualFileName}`);

        fs.readFile(filePath, 'utf8', (err, d) => {
            if (!err) {
                let css = data.replace(toReplace, `<style>${d}</style>`);
                fs.writeFile(index, css, 'utf8', () => null);
            }
        });
    }
});