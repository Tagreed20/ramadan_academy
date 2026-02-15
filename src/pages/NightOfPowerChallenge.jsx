import React, { useState, useEffect } from 'react';
import './ChallengePage.css';

function NightOfPowerChallenge({ studentName, onNext, addPoints, addAchievement, markSectionComplete }) {
  const [timeLeft, setTimeLeft] = useState(90);
  const [userAnswers, setUserAnswers] = useState({ reading: '', math: '' });
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [challengeComplete, setChallengeComplete] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !challengeComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !challengeComplete) {
      setChallengeComplete(true);
      setFeedbackMessage('انتهى الوقت! 😢');
      setFeedbackType('incorrect');
    }
  }, [timeLeft, challengeComplete]);

  const handleAnswerChange = (e, field) => {
    setUserAnswers({
      ...userAnswers,
      [field]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!userAnswers.reading.trim() || !userAnswers.math.trim()) {
      setFeedbackMessage('من فضلك أجيبي على جميع الأسئلة');
      setFeedbackType('incorrect');
      setShowFeedback(true);
      return;
    }

    const readingCorrect = userAnswers.reading.toLowerCase().includes('الطموح') || 
                          userAnswers.reading.toLowerCase().includes('الإصرار') ||
                          userAnswers.reading.toLowerCase().includes('الحب');
    
    const mathCorrect = Math.abs(parseFloat(userAnswers.math) - 8.5) < 0.01;

    if (readingCorrect && mathCorrect) {
      setFeedbackType('correct');
      setFeedbackMessage('🎉 إجابات صحيحة! أحسنتِ يا نجمة رمضان!');
      addPoints(50);
      addAchievement('نجمة رمضان الذهبية');
      setChallengeComplete(true);
      markSectionComplete();
    } else {
      setFeedbackType('incorrect');
      let errorMsg = '❌ ';
      if (!readingCorrect) errorMsg += 'الإجابة على السؤال القرائي غير صحيحة. ';
      if (!mathCorrect) errorMsg += 'الإجابة على السؤال الرياضي غير صحيحة (الإجابة الصحيحة: 8.5).';
      setFeedbackMessage(errorMsg);
    }

    setShowFeedback(true);
  };

  if (challengeComplete) {
    return (
      <div className="challenge-page fade-in">
        <div className="completion-card card">
          <div className="completion-icon">✨</div>
          <h2>تم إكمال تحدي ليلة القدر!</h2>
          <p>مبروك يا {studentName}! لقد أتممتِ التحدي بنجاح!</p>
          
          <div className="achievement-badge">
            <div className="badge-icon">⭐</div>
            <p className="badge-text">نجمة رمضان الذهبية</p>
          </div>

          <p className="completion-message">
            لقد أكملتِ جميع أقسام الرحلة بنجاح! هيا بنا لاستقبال شهادتك الرقمية! 🎓
          </p>

          <button className="btn btn-secondary" onClick={() => onNext()}>
            احصلي على شهادتك الرقمية 🎓
          </button>
        </div>
      </div>
    );
  }

  const progress = 50;

  return (
    <div className="challenge-page fade-in">
      <div className="challenge-header">
        <h1>🌙 تحدي ليلة القدر</h1>
        <div className="challenge-info">
          <div className="timer">
            <span className={`time ${timeLeft < 30 ? 'warning' : ''}`}>⏱️ {timeLeft}s</span>
          </div>
        </div>
      </div>

      <div className="challenge-context card">
        <h2>📖 السياق:</h2>
        <p>في ليلة القدر، تأملت فاطمة في رحلتها التعليمية هذا الشهر.</p>
        <p className="bold-text">هذا التحدي يجمع بين الفهم القرائي والعمليات الحسابية!</p>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="step-section card">
        <h2>❓ السؤال الأول - الفهم القرائي:</h2>
        <p className="step-question">
          "تعلمت فاطمة أن الرياضيات ليست مجرد أرقام، بل هي لغة تعبر عن قيم الحياة. 
          من خلال حساب الزكاة والعطاء، اكتشفت أن كل رقم له معنى وقيمة. 
          ما الشعور الذي عاشته فاطمة من خلال هذه الرحلة؟"
        </p>

        <textarea
          placeholder="أجيبي بجملة أو جملتين..."
          value={userAnswers.reading}
          onChange={(e) => handleAnswerChange(e, 'reading')}
          className="step-input"
          disabled={showFeedback}
          rows="4"
        />

        <div className="hint-box">
          <p><strong>💡 تلميح:</strong> ابحثي عن الكلمات التي تعبر عن المشاعر الإيجابية</p>
        </div>
      </div>

      <div className="step-section card">
        <h2>❓ السؤال الثاني - الرياضيات:</h2>
        <p className="step-question">
          جمعت فاطمة نقاطها من جميع الأقسام:
          من الفهم القرائي: 3.5 نقطة
          من جمع الكسور: 2.75 نقطة
          من طرح الكسور: 2.25 نقطة
          ما مجموع نقاطها؟
        </p>

        <div className="input-group">
          <input
            type="number"
            step="0.01"
            placeholder="أدخلي الإجابة"
            value={userAnswers.math}
            onChange={(e) => handleAnswerChange(e, 'math')}
            className="step-input"
            disabled={showFeedback}
          />
        </div>

        <div className="hint-box">
          <p><strong>💡 تلميح:</strong> اجمعي: 3.5 + 2.75 + 2.25 = ؟</p>
        </div>
      </div>

      <div className="submit-section card">
        <button 
          className="btn btn-primary submit-button"
          onClick={handleSubmit}
          disabled={showFeedback}
        >
          تحقق من الإجابات ✓
        </button>

        {showFeedback && (
          <div className={`feedback ${feedbackType} fade-in`}>
            <p>{feedbackMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NightOfPowerChallenge;
