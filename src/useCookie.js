import { useEffect } from 'react';

export const useYandexMetrika = (counterId, consentGiven) => {
  useEffect(() => {
    if (!consentGiven) return;

// Загружаем скрипт Яндекс.Метрики
const yandexMetrikaScript = document.createElement('script');
yandexMetrikaScript.type = 'text/javascript';
yandexMetrikaScript.text = `
  (function(m,e,t,r,i,k,a){
    m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments) };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) { 
      if (document.scripts[j].src === r) { return; }
    }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(103270854, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  });
`;
document.head.appendChild(yandexMetrikaScript);

// 2. Добавляем <noscript> (для случаев, когда JavaScript отключен)
const yandexMetrikaNoScript = document.createElement('noscript');
yandexMetrikaNoScript.innerHTML = `
  <div>
    <img src="https://mc.yandex.ru/watch/103270854" style="position:absolute; left:-9999px;" alt="" />
  </div>
`;
document.body.appendChild(yandexMetrikaNoScript);

return () => {
  document.head.removeChild(yandexMetrikaNoScript);
};
  }, [counterId, consentGiven]);
};