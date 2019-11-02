(function() {
    hljs.configure({
        languages: ['javascript']
    });

    document.querySelectorAll('pre').forEach(block => {
        hljs.highlightBlock(block);
    });
})();