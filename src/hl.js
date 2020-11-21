addEventListener('load', () => {
    hljs.configure({
        languages: ['javascript', 'typescript']
    });

    document.querySelectorAll('pre').forEach(block => {
        hljs.highlightBlock(block);
    });
});