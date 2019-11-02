window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-124651312-1');

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker
    .register('/service-worker.js');
}