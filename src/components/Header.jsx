import React, { useState } from 'react';
import './Header.css';

function Header({ darkMode, onToggleDarkMode, studentName, totalPoints, currentPage, onNavigate }) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleToggleDarkMode = () => {
    onToggleDarkMode();
    const message = !darkMode ? 'ليلة رمضانية هادئة مليئة بالإنجاز 🌙' : 'صباح مشرق مليء بالطموح ☀️';
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <h1 className="site-title">🕌 أكاديمية ليالي رمضان الرقمية</h1>
          </div>

          <div className="header-center">
            {studentName && (
              <div className="student-info">
                <span className="student-name">👋 مرحباً {studentName}</span>
                <span className="points-display">⭐ {totalPoints} نقطة</span>
              </div>
            )}
          </div>

          <div className="header-right">
            <button 
              className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
              onClick={handleToggleDarkMode}
              title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {currentPage !== 'home' && (
          <div className="progress-section">
            <div className="progress-info">
              <span className="progress-label">تقدمك في الرحلة</span>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${calculateProgress(currentPage)}%` }}
                ></div>
              </div>
              <span className="progress-percentage">{calculateProgress(currentPage)}%</span>
            </div>
          </div>
        )}
      </header>

      {showNotification && (
        <div className="notification">
          {notificationMessage}
        </div>
      )}

      {darkMode && (
        <>
          <div className="moon"></div>
          <div className="lantern-glow"></div>
          <StarsBackground />
        </>
      )}
    </>
  );
}

function calculateProgress(currentPage) {
  const pages = ['home', 'reading', 'addition', 'subtraction', 'zakah', 'nightOfPower', 'certificate'];
  const currentIndex = pages.indexOf(currentPage);
  return Math.round((currentIndex / (pages.length - 1)) * 100);
}

function StarsBackground() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div className="stars-background">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Header;
