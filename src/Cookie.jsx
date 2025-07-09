import React, { useState, useEffect } from 'react';

const CookieConsentBanner = ({ onAccept }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Проверяем, не давал ли пользователь уже согласие
    const consentGiven = localStorage.getItem('ym_cookie_consent') === 'true';
    if (!consentGiven) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ym_cookie_consent', 'true');
    onAccept();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px',
      backgroundColor: '#f5f5f5',
      borderTop: '1px solid #ddd',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        Мы используем Яндекс.Метрику для анализа посещаемости сайта. Продолжая использовать сайт, 
        вы соглашаетесь с использованием файлов cookie.
      </div>
      <button 
        onClick={handleAccept}
        style={{
          padding: '8px 16px',
          backgroundColor: '#0066ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Принять
      </button>
    </div>
  );
};

export default CookieConsentBanner;