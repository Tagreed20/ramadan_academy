import React, { useState } from 'react';
import './MathPage.css';

function MathAdditionPage({ studentName, onNext, addPoints, markSectionComplete }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [levelComplete, setLevelComplete] = useState(false);
  const [allLevelsComplete, setAllLevelsComplete] = useState(false);

  const levels = [
    {
      title: 'المستوى الأول - سهل',
      example: {
        num1: 2.5,
        num2: 1.3,
        explanation: '2.5 + 1.3 = ؟\nنضع الفاصلة تحت الفاصلة ثم نجمع:\n2.5\n+ 1.3\n------\n3.8'
      },
      exercises: [
        { num1: 1.2, num2: 2.3, answer: 3.5 },
        { num1: 3.4, num2: 2.1, answer: 5.5 },
        { num1: 1.5, num2: 1.5, answer: 3.0 }
      ]
    },
    {
      title: 'المستوى الثاني - متوسط',
      example: {
        num1: 5.25,
        num2: 3.75,
        explanation: '5.25 + 3.75 = ؟\nنضع الفاصلة تحت الفاصلة ثم نجمع:\n5.25\n+ 3.75\n------\n9.00'
      },
      exercises: [
        { num1: 4.35, num2: 2.15, answer: 6.5 },
        { num1: 7.25, num2: 1.75, answer: 9.0 },
        { num1: 3.45, num2: 2.55, answer: 6.0 }
      ]
    },
    {
      title: 'المستوى الثالث - متقدم',
      example: {
        num1: 12.375,
        num2: 8.625,
        explanation: '12.375 + 8.625 = ؟\nنضع الفاصلة تحت الفاصلة ثم نجمع:\n12.375\n+ 8.625\n------\n21.000'
      },
      exercises: [
        { num1: 15.25, num2: 7.85, answer: 23.1 },
        { num1: 10.125, num2: 5.375, answer: 15.5 },
        { num1: 8.75, num2: 6.25, answer: 15.0 }
      ]
    }
  ];

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(0);

  const currentLevelData = levels[currentLevel];
  const currentExercise = currentLevelData.exercises[exerciseIndex];

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      alert('من فضلك أدخلي الإجابة');
      return;
    }

    const userNum = parseFloat(userAnswer);
    const correctAnswer = currentExercise.answer;
    const isCorrect = Math.abs(userNum - correctAnswer) < 0.01;

    if (isCorrect) {
      setFeedbackType('correct');
      setFeedbackMessage(`🎉 إجابة صحيحة! ${currentExercise.num1} + ${currentExercise.num2} = ${correctAnswer}`);
      addPoints(20);
      setCompletedExercises(completedExercises + 1);
    } else {
      setFeedbackType('incorrect');
      setFeedbackMessage(`❌ الإجابة غير صحيحة. الإجابة الصحيحة هي: ${correctAnswer}`);
    }

    setShowFeedback(true);
    setUserAnswer('');

    setTimeout(() => {
      if (exerciseIndex < currentLevelData.exercises.length - 1) {
        setExerciseIndex(exerciseIndex + 1);
        setShowFeedback(false);
      } else {
        setLevelComplete(true);
      }
    }, 2000);
  };

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setExerciseIndex(0);
      setLevelComplete(false);
      setShowFeedback(false);
      setUserAnswer('');
    } else {
      setAllLevelsComplete(true);
      markSectionComplete();
    }
  };

  const handleContinue = () => {
    onNext();
  };

  if (allLevelsComplete) {
    return (
      <div className="math-page fade-in">
        <div className="completion-card card">
          <div className="completion-icon">🏆</div>
          <h2>تم إكمال قسم جمع الكسور العشرية!</h2>
          <p>مبروك يا {studentName}! لقد أتممتِ جميع المستويات بنجاح!</p>
          
          <div className="completion-stats">
            <div className="stat">
              <span className="stat-label">المستويات المكتملة</span>
              <span className="stat-value">{levels.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">التمارين المكتملة</span>
              <span className="stat-value">{completedExercises}</span>
            </div>
            <div className="stat">
              <span className="stat-label">النقاط المكتسبة</span>
              <span className="stat-value">{completedExercises * 20}</span>
            </div>
          </div>

          <button className="btn btn-secondary" onClick={handleContinue}>
            انتقلي إلى طرح الكسور العشرية ➖
          </button>
        </div>
      </div>
    );
  }

  if (levelComplete) {
    return (
      <div className="math-page fade-in">
        <div className="level-complete-card card">
          <div className="completion-icon">⭐</div>
          <h2>تم إكمال {currentLevelData.title}!</h2>
          <p>أحسنتِ يا {studentName}! لقد أكملتِ هذا المستوى بنجاح!</p>
          
          {currentLevel < levels.length - 1 ? (
            <>
              <p className="next-level-message">هل أنتِ مستعدة للمستوى التالي؟</p>
              <button className="btn btn-secondary" onClick={handleNextLevel}>
                انتقلي إلى المستوى التالي ⬆️
              </button>
            </>
          ) : (
            <>
              <p className="next-level-message">تم إكمال جميع المستويات! هيا بنا إلى القسم التالي!</p>
              <button className="btn btn-secondary" onClick={handleNextLevel}>
                انتقلي إلى طرح الكسور العشرية ➖
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  const progress = ((exerciseIndex + 1) / currentLevelData.exercises.length) * 100;

  return (
    <div className="math-page fade-in">
      <div className="math-header">
        <h1>➕ جمع الكسور العشرية</h1>
        <div className="level-info">
          <span className="level-badge">{currentLevelData.title}</span>
          <span>التمرين {exerciseIndex + 1} من {currentLevelData.exercises.length}</span>
        </div>
      </div>

      <div className="example-section card">
        <h2>📚 مثال محلول:</h2>
        <div className="example-content">
          <div className="example-problem">
            <span className="num">{currentLevelData.example.num1}</span>
            <span className="operator">+</span>
            <span className="num">{currentLevelData.example.num2}</span>
            <span className="equals">=</span>
            <span className="question">؟</span>
          </div>
          <div className="example-explanation">
            <pre>{currentLevelData.example.explanation}</pre>
          </div>
        </div>
      </div>

      <div className="exercise-section card">
        <h2>🎯 حلي التمرين التالي:</h2>
        
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="exercise-problem">
          <span className="num">{currentExercise.num1}</span>
          <span className="operator">+</span>
          <span className="num">{currentExercise.num2}</span>
          <span className="equals">=</span>
          <input
            type="number"
            step="0.01"
            placeholder="أدخلي الإجابة"
            value={userAnswer}
            onChange={handleAnswerChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="answer-input"
            disabled={showFeedback}
          />
        </div>

        <button 
          className="btn btn-primary submit-button"
          onClick={handleSubmit}
          disabled={showFeedback}
        >
          تحقق من الإجابة ✓
        </button>

        {showFeedback && (
          <div className={`feedback ${feedbackType} fade-in`}>
            <p>{feedbackMessage}</p>
          </div>
        )}
      </div>

      <div className="tips-section card">
        <h3>💡 نصائح مهمة:</h3>
        <ul>
          <li>ضعي الفاصلة تحت الفاصلة دائماً</li>
          <li>أضيفي الأصفار إذا لزم الأمر لتساوي عدد المنازل العشرية</li>
          <li>اجمعي كما تجمعين الأعداد الصحيحة</li>
          <li>ضعي الفاصلة في النتيجة تحت الفاصلات</li>
        </ul>
      </div>
    </div>
  );
}

export default MathAdditionPage;
