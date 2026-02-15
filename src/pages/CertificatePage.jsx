import React, { useRef } from 'react';
import './CertificatePage.css';

function CertificatePage({ studentName, totalPoints, achievements, onRestart }) {
  const certificateRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const certificateHTML = certificateRef.current.innerHTML;
    printWindow.document.write(`
      <html>
        <head>
          <title>شهادة إكمال البرنامج</title>
          <style>
            body {
              direction: rtl;
              text-align: right;
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 20px;
            }
            .certificate {
              border: 5px solid #FFD700;
              padding: 40px;
              text-align: center;
              background: linear-gradient(135deg, #87CEEB 0%, #98FF98 100%);
              border-radius: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
          </style>
        </head>
        <body>
          ${certificateHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = () => {
    const qrText = `تم إكمال برنامج أكاديمية ليالي رمضان الرقمية
الطالبة: ${studentName}
النقاط: ${totalPoints}
الإنجازات: ${achievements.join(', ')}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'شهادة إكمال البرنامج',
        text: qrText
      });
    } else {
      alert('تم نسخ البيانات:\n' + qrText);
    }
  };

  return (
    <div className="certificate-page fade-in">
      <div className="certificate-container">
        <div className="certificate-wrapper" ref={certificateRef}>
          <div className="certificate">
            <div className="certificate-header">
              <div className="certificate-icon">🎓</div>
              <h1>شهادة إكمال البرنامج</h1>
              <p className="certificate-subtitle">أكاديمية ليالي رمضان الرقمية</p>
            </div>

            <div className="certificate-content">
              <p className="certificate-text">
                يشرفنا أن نشهد بأن الطالبة
              </p>
              
              <h2 className="student-name">{studentName}</h2>
              
              <p className="certificate-text">
                قد أكملت بنجاح برنامج أكاديمية ليالي رمضان الرقمية
              </p>

              <p className="certificate-text">
                وأتقنت مهارات الفهم القرائي وجمع وطرح الكسور العشرية
              </p>

              <div className="achievements-section">
                <h3>🏆 الإنجازات المكتسبة:</h3>
                <div className="achievements-list">
                  {achievements.length > 0 ? (
                    achievements.map((achievement, index) => (
                      <div key={index} className="achievement-item">
                        ⭐ {achievement}
                      </div>
                    ))
                  ) : (
                    <p>لم تكتسب إنجازات بعد</p>
                  )}
                </div>
              </div>

              <div className="points-section">
                <p className="points-text">
                  إجمالي النقاط المكتسبة: <span className="points-value">{totalPoints}</span>
                </p>
              </div>

              <div className="certificate-footer">
                <p className="date">
                  بتاريخ: {new Date().toLocaleDateString('ar-SA', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                
                <div className="seal">
                  <div className="seal-circle">
                    <p>أكاديمية ليالي</p>
                    <p>رمضان</p>
                    <p>الرقمية</p>
                  </div>
                </div>

                <p className="signature">
                  المعلمة: تغريد المطيري
                </p>
              </div>
            </div>

            <div className="qr-code">
              <p className="qr-label">QR Code</p>
              <div className="qr-placeholder">
                📱 مشاركة الشهادة
              </div>
            </div>
          </div>
        </div>

        <div className="certificate-actions">
          <button className="btn btn-primary" onClick={handlePrint}>
            🖨️ اطبعي الشهادة
          </button>
          <button className="btn btn-secondary" onClick={handleShare}>
            📤 شاركي الشهادة
          </button>
          <button className="btn btn-accent" onClick={onRestart}>
            🔄 ابدئي من جديد
          </button>
        </div>

        <div className="completion-message card">
          <h2>🌟 تهانينا يا {studentName}! 🌟</h2>
          <p>
            لقد أكملتِ رحلة رمضانية مليئة بالتعلم والإبداع!
          </p>
          <p>
            كما أتممنا رحلتنا مع الأرقام في رمضان، نستقبل عيد الفطر بقلوب مليئة بالفرح والإنجاز.
          </p>
          <p className="closing-message">
            نتمنى لك عيداً مباركاً وكل عام وأنتِ بألف خير! 🎉
          </p>
        </div>

        <div className="stats-summary card">
          <h2>📊 ملخص الإنجازات:</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-icon">📖</span>
              <span className="stat-name">الفهم القرائي</span>
              <span className="stat-badge">✓ مكتمل</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">➕</span>
              <span className="stat-name">جمع الكسور</span>
              <span className="stat-badge">✓ مكتمل</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">➖</span>
              <span className="stat-name">طرح الكسور</span>
              <span className="stat-badge">✓ مكتمل</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">💰</span>
              <span className="stat-name">زكاة الخير</span>
              <span className="stat-badge">✓ مكتمل</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">🌙</span>
              <span className="stat-name">ليلة القدر</span>
              <span className="stat-badge">✓ مكتمل</span>
            </div>
            <div className="stat-box">
              <span className="stat-icon">⭐</span>
              <span className="stat-name">النقاط الكلية</span>
              <span className="stat-badge">{totalPoints}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificatePage;
