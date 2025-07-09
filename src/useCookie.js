import { useEffect } from 'react';

export const useYandexMetrika = (counterId, consentGiven) => {
  useEffect(() => {
    if (!consentGiven) return;

// Загружаем скрипт Яндекс.Метрики
const script = document.createElement('script');
script.src = `https://mc.yandex.ru/metrika/tag.js`;
script.async = true;

script.onload = () => {
  window.ym = window.ym || function(){(window.ym.q = window.ym.q || []).push(arguments)};
  window.ym(counterId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  });
};

document.head.appendChild(script);

return () => {
  document.head.removeChild(script);
};
  }, [counterId, consentGiven]);
};