const path = require('path');
const fs = require('fs');

const index = path.resolve('./dist/developer-blog/index.html');

fs.readFile(index, 'utf8', (err, data) => {
    if (!err) {
        var t = data.replace('</head>', '\n</head>');

        const elementArr = t.split('\n');
        const toReplace = elementArr.filter(c => c.indexOf('styles.') > -1)[0];

        const actualFileName = toReplace.split('"').filter(c => c.indexOf('styles.') > -1)[0];
        const filePath = path.resolve(`./dist/developer-blog/${actualFileName}`);
        fs.readFile(filePath, 'utf8', (err, d) => {
            if(!err) {
                let butt = data.replace(toReplace, `<style>${d}</style>`).replace(/\n/g, '').replace(/\r/g, '');
                fs.writeFile(index, butt, 'utf8', () => null);
            }
        });        
    }
})