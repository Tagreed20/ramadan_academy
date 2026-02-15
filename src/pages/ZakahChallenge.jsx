import React, { useState, useEffect } from 'react';
import './ChallengePage.css';

function ZakahChallenge({ studentName, onNext, addPoints, addAchievement, markSectionComplete }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({ step1: '', step2: '', step3: '' });
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [leaderboard, setLeaderboard] = useState([
    { name: 'فاطمة', points: 85 },
    { name: 'نور', points: 80 },
    { name: 'ليلى', points: 75 },
    { name: 'سارة', points: 70 },
    { name: 'مريم', points: 65 }
  ]);

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

  const steps = [
    {
      title: 'الخطوة 1: تحويل النسبة المئوية إلى عدد عشري',
      question: 'حولي 2.5% إلى عدد عشري',
      hint: '2.5% تعني 2.5 ÷ 100',
      correctAnswer: '0.025',
      explanation: '2.5 ÷ 100 = 0.025'
    },
    {
      title: 'الخطوة 2: ضرب المبلغ في النسبة العشرية',
      question: 'اضربي 2500.50 × 0.025 = ؟',
      hint: 'اضربي العدد العشري في المبلغ',
      correctAnswer: '62.5125',
      explanation: '2500.50 × 0.025 = 62.5125'
    },
    {
      title: 'الخطوة 3: تقريب الناتج لأقرب هللة',
      question: 'قربي 62.5125 لأقرب هللة (منزلتان عشريتان)',
      hint: 'انظري للرقم الثالث بعد الفاصلة',
      correctAnswer: '62.51',
      explanation: 'نقرب 62.5125 إلى 62.51 ريال'
    }
  ];

  const handleAnswerChange = (e) => {
    const stepKey = `step${currentStep + 1}`;
    setUserAnswers({
      ...userAnswers,
      [stepKey]: e.target.value
    });
  };

  const handleSubmitStep = () => {
    const step = steps[currentStep];
    const stepKey = `step${currentStep + 1}`;
    const userAnswer = userAnswers[stepKey].trim();

    if (!userAnswer) {
      setFeedbackMessage('من فضلك أدخلي الإجابة');
      setFeedbackType('incorrect');
      setShowFeedback(true);
      return;
    }

    const isCorrect = Math.abs(parseFloat(userAnswer) - parseFloat(step.correctAnswer)) < 0.01;

    if (isCorrect) {
      setFeedbackType('correct');
      setFeedbackMessage(`🎉 صحيح! ${step.explanation}`);
      addPoints(30);

      setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          setShowFeedback(false);
        } else {
          setChallengeComplete(true);
          addAchievement('سفيرة العطاء الرمضاني');
          markSectionComplete();
          // Add to leaderboard
          const newLeaderboard = [...leaderboard];
          newLeaderboard.push({ name: studentName, points: 85 });
          newLeaderboard.sort((a, b) => b.points - a.points);
          setLeaderboard(newLeaderboard.slice(0, 5));
        }
      }, 2000);
    } else {
      setFeedbackType('incorrect');
      setFeedbackMessage(`❌ غير صحيح. ${step.hint}`);
    }

    setShowFeedback(true);
  };

  if (challengeComplete) {
    return (
      <div className="challenge-page fade-in">
        <div className="completion-card card">
          <div className="completion-icon">🏆</div>
          <h2>تم إكمال تحدي زكاة الخير!</h2>
          <p>مبروك يا {studentName}! لقد حسبتِ الزكاة بنجاح!</p>
          
          <div className="achievement-badge">
            <div className="badge-icon">👑</div>
            <p className="badge-text">سفيرة العطاء الرمضاني</p>
          </div>

          <div className="leaderboard-section">
            <h3>🏅 لوحة أفضل 5 نتائج</h3>
            <div className="leaderboard">
              {leaderboard.map((entry, index) => (
                <div key={index} className={`leaderboard-entry ${entry.name === studentName ? 'current' : ''}`}>
                  <span className="rank">{index + 1}</span>
                  <span className="name">{entry.name}</span>
                  <span className="points">{entry.points} ⭐</span>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-secondary" onClick={() => onNext()}>
            انتقلي إلى تحدي ليلة القدر 🌙
          </button>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="challenge-page fade-in">
      <div className="challenge-header">
        <h1>💰 تحدي زكاة الخير</h1>
        <div className="challenge-info">
          <div className="timer">
            <span className={`time ${timeLeft < 20 ? 'warning' : ''}`}>⏱️ {timeLeft}s</span>
          </div>
          <div className="step-counter">
            الخطوة {currentStep + 1} من {steps.length}
          </div>
        </div>
      </div>

      <div className="challenge-context card">
        <h2>📖 السياق:</h2>
        <p>قرأت فاطمة أن أسرة ادخرت 2500.50 ريال، ونسبة الزكاة 2.5%.</p>
        <p className="bold-text">المطلوب: احسبي الزكاة المستحقة على هذا المبلغ</p>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="step-section card">
        <h2>{step.title}</h2>
        <p className="step-question">{step.question}</p>

        <div className="input-group">
          <input
            type="number"
            step="0.01"
            placeholder="أدخلي الإجابة"
            value={userAnswers[`step${currentStep + 1}`]}
            onChange={handleAnswerChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitStep()}
            className="step-input"
            disabled={showFeedback}
          />
          <button 
            className="btn btn-primary"
            onClick={handleSubmitStep}
            disabled={showFeedback}
          >
            تحقق ✓
          </button>
        </div>

        {showFeedback && (
          <div className={`feedback ${feedbackType} fade-in`}>
            <p>{feedbackMessage}</p>
          </div>
        )}

        <div className="hint-box">
          <p><strong>💡 تلميح:</strong> {step.hint}</p>
        </div>
      </div>

      <div className="steps-progress">
        {steps.map((_, index) => (
          <div 
            key={index} 
            className={`step-dot ${index <= currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ZakahChallenge;
