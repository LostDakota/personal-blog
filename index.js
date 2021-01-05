const path = require('path');
const fs = require('fs');

const index = path.resolve('./dist/developer-blog/index.html');
const worker = path.resolve('./dist/developer-blog/service-worker.js');
let scripts = [];

fs.readFile(index, 'utf8', (err, data) => {
    if (!err) {
        var t = data.replace('</head>', '\n</head>').replace('<script ', '\n<script ');

        const elementArr = t.split('\n');
        const toReplace = elementArr.filter(c => c.indexOf('styles.') > -1)[0];

        let sources = elementArr.filter(c => c.indexOf('</script>') > -1).filter(c => c.indexOf('src') > -1);

        sources.forEach(source => {
            scripts = source.split('"').filter(c => c.indexOf('.js') > -1).map(c => `"${c}"`);
        });
        loadScripts();

        const actualFileName = toReplace.split('"').filter(c => c.indexOf('styles.') > -1)[0];
        const filePath = path.resolve(`./dist/developer-blog/${actualFileName}`);

        fs.readFile(filePath, 'utf8', (err, d) => {
            if (!err) {
                let butt = data.replace(toReplace, `<style>${d}</style>`);
                fs.writeFile(index, butt, 'utf8', () => null);
            }
        });
    }
});

const loadScripts = () => {
    fs.readFile(worker, 'utf8', (err, data) => {
        if (!err) {
            let file = data.replace(`$scriptReplacement`, `[${scripts.toString()}];`);
            fs.writeFile(worker, file, () => null);
        }
    })
}