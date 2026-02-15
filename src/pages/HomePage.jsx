import React, { useState } from 'react';
import './HomePage.css';

function HomePage({ onStart, setStudentName, studentName, totalPoints, completedSections }) {
  const [inputName, setInputName] = useState(studentName);

  const handleStart = () => {
    if (inputName.trim()) {
      setStudentName(inputName.trim());
      onStart();
    } else {
      alert('من فضلك أدخلي اسمك لبدء الرحلة');
    }
  };

  const handleInputChange = (e) => {
    setInputName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="home-page fade-in">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">🌙 في ليالي رمضان الجميلة 🌙</h1>
          <p className="hero-subtitle">
            تنطلق الأرقام في رحلة مليئة بالخير والعطاء
          </p>
          <p className="hero-description">
            مرحباً بك في أكاديمية ليالي رمضان الرقمية، حيث نجمع بين الفهم القرائي ومهارات الرياضيات
            في رحلة تعليمية ممتعة وتفاعلية. استعدي للتعلم والإبداع! 📚✨
          </p>
        </div>

        <div className="decorative-elements">
          <div className="lantern lantern-1">🏮</div>
          <div className="lantern lantern-2">🏮</div>
          <div className="crescent">🌙</div>
          <div className="star star-1">⭐</div>
          <div className="star star-2">⭐</div>
          <div className="star star-3">⭐</div>
          <div className="date">🌙</div>
        </div>
      </div>

      <div className="welcome-card card">
        <h2>🎯 ابدئي رحلتك التعليمية</h2>
        <p>أدخلي اسمك لنبدأ معاً رحلة مليئة بالتعلم والمرح:</p>

        <div className="input-group">
          <input
            type="text"
            placeholder="أدخلي اسمك هنا..."
            value={inputName}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="name-input"
            maxLength="50"
          />
          <button 
            className="btn btn-secondary start-button"
            onClick={handleStart}
          >
            ابدئي الرحلة 🌙
          </button>
        </div>

        <p className="teacher-credit">
          إعداد: المعلمة تغريد المطيري 👩‍🏫
        </p>
      </div>

      {studentName && (
        <div className="progress-card card">
          <h2>📊 إحصائياتك</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">النقاط المكتسبة</span>
              <span className="stat-value">{totalPoints}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">الأقسام المكتملة</span>
              <span className="stat-value">{completedSections.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">نسبة الإنجاز</span>
              <span className="stat-value">{Math.round((completedSections.length / 6) * 100)}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="features-section">
        <h2>✨ ما ستتعلمينه في هذه الرحلة</h2>
        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon">📖</div>
            <h3>الفهم القرائي</h3>
            <p>قصة تفاعلية عن طفلة تساعد أسرتها في تجهيز إفطار رمضان باستخدام الكسور العشرية</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">➕</div>
            <h3>جمع الكسور العشرية</h3>
            <p>تمارين تدريجية مع أمثلة محلولة وتصحيح فوري لتعلم أفضل</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">➖</div>
            <h3>طرح الكسور العشرية</h3>
            <p>مسائل حياتية رمضانية مع نشاط سحب وإفلات للأرقام</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">💰</div>
            <h3>تحدي زكاة الخير</h3>
            <p>حساب الزكاة من مبلغ مالي مع مؤقت زمني ولوحة شرف</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">🌙</div>
            <h3>تحدي ليلة القدر</h3>
            <p>سؤال مركب يجمع بين الفهم القرائي والعمليات الحسابية</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">🎓</div>
            <h3>الشهادة الرقمية</h3>
            <p>احصلي على شهادة رقمية قابلة للطباعة ومشاركة مع ولي الأمر</p>
          </div>
        </div>
      </div>

      <div className="benefits-section card">
        <h2>🌟 فوائد البرنامج</h2>
        <ul className="benefits-list">
          <li>✅ تعلم تفاعلي وممتع يناسب المرحلة الابتدائية</li>
          <li>✅ نظام نقاط تراكمي يحفز على الاستمرار</li>
          <li>✅ شارات وإنجازات لتعزيز الثقة بالنفس</li>
          <li>✅ تصميم عصري احترافي وسهل الاستخدام</li>
          <li>✅ وضع ليلي ونهاري لراحة العينين</li>
          <li>✅ متوافق مع جميع الأجهزة والشاشات</li>
          <li>✅ تصحيح فوري وتغذية راجعة مفيدة</li>
          <li>✅ ربط التعليم بقيم رمضان والعطاء</li>
        </ul>
      </div>

      <div className="cta-section">
        <button 
          className="btn btn-primary large-button"
          onClick={handleStart}
        >
          🚀 ابدئي الآن وانطلقي في الرحلة
        </button>
      </div>
    </div>
  );
}

export default HomePage;
