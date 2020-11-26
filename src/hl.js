setTimeout(function () {
    hljs.configure({
        languages: ['javascript', 'typescript']
    });

    Array.from(document.querySelectorAll('pre')).forEach(block => {
        hljs.highlightBlock(block);
    });
}, 300);