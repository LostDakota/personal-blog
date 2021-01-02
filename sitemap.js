const puppet = require('puppeteer');
const fs = require('fs');
const fsPath = require('fs-path');

let scrape = async (url = 'https://mika.house') => {
    const browser = await puppet.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: 'networkidle2'
    });
    
    const results = await page.$$eval('a', as => as.map(a => a.href));

    browser.close();

    return results.filter(link => link.indexOf('mika.house') !== -1);
}

let generate = async link => {
    const browser = await puppet.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.goto(link, {
        waitUntil: 'networkidle2'
    });
    
    const result = await page.content();

    browser.close();

    let basePath = link.replace("https://mika.house/", "");
    let path = basePath.length > 0 ? `${basePath}/` : '';
    let name = `static/${path}index.html`;
    fsPath.writeFile(name, result, (err) => {
        console.log(`wrote ${name}`);
        if(err) return err;
        return true;
    });
}

let distinct = (value, index, self) => self.indexOf(value) === index;

(() => {
    let results = [];
    scrape('https://mika.house/blog').then(data => {
                data.forEach(d => {
                    if(!results.includes(d)){
                        results.push(d);
                    }
                });
                fs.writeFile('./src/sitemap.xml', sitemapBuilder(results), (err) => {
                    if(err) return err;
                    return true;     
                });
            });
})();

exports.static = () => {
       scrape('https://mika.house/blog')
        .then(data => {
            for(const link of data.filter(distinct)) {
                generate(link);
            }
        });
}

let sitemapBuilder = links => {
    var map = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    links.forEach(link => map += `<url><loc>${link}</loc><priority>0.5</priority></url>\n`);

    map += '</urlset>';

    return map;
}