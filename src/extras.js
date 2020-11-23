(function () {
  let body = document.querySelector('body');
  let script = document.createElement('script');
  script.src = "https://www.googletagmanager.com/gtag/js?id=UA-124651312-1";
  body.appendChild(script);
})();

setTimeout(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());

  gtag('config', 'UA-124651312-1');
}, 100);

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker
    .register('/service-worker.js');
}