import React, { useState } from 'react';
import './MathPage.css';

function MathSubtractionPage({ studentName, onNext, addPoints, markSectionComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [draggedItems, setDraggedItems] = useState({});
  const [sectionComplete, setSectionComplete] = useState(false);

  const questions = [
    {
      type: 'direct',
      title: 'المستوى الأول - سهل',
      example: {
        num1: 5.7,
        num2: 2.3,
        explanation: '5.7 - 2.3 = ؟\nنضع الفاصلة تحت الفاصلة ثم نطرح:\n5.7\n- 2.3\n------\n3.4'
      },
      problem: { num1: 6.8, num2: 3.2, answer: 3.6 },
      story: 'لديك 6.8 لتر من عصير التمر، استخدمتِ 3.2 لتر. كم لتراً بقي؟'
    },
    {
      type: 'direct',
      title: 'المستوى الثاني - متوسط',
      example: {
        num1: 8.45,
        num2: 3.25,
        explanation: '8.45 - 3.25 = ؟\nنضع الفاصلة تحت الفاصلة ثم نطرح:\n8.45\n- 3.25\n------\n5.20'
      },
      problem: { num1: 9.75, num2: 4.35, answer: 5.4 },
      story: 'كان لديك 9.75 كيلو من الحلويات، وزعتِ 4.35 كيلو. كم كيلو بقي؟'
    },
    {
      type: 'drag',
      title: 'المستوى الثالث - متقدم (سحب وإفلات)',
      problem: { num1: 15.5, num2: 7.25, answer: 8.25 },
      story: 'كان لديك 15.5 ريال، أنفقتِ 7.25 ريال. كم ريالاً بقي لديك؟',
      dragOptions: ['8.25', '22.75', '8.75', '7.25', '10.5']
    }
  ];

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      alert('من فضلك أدخلي الإجابة');
      return;
    }

    const question = questions[currentQuestion];
    const userNum = parseFloat(userAnswer);
    const correctAnswer = question.problem.answer;
    const isCorrect = Math.abs(userNum - correctAnswer) < 0.01;

    if (isCorrect) {
      setFeedbackType('correct');
      setFeedbackMessage(`🎉 إجابة صحيحة! ${question.problem.num1} - ${question.problem.num2} = ${correctAnswer}`);
      addPoints(25);
    } else {
      setFeedbackType('incorrect');
      setFeedbackMessage(`❌ الإجابة غير صحيحة. الإجابة الصحيحة هي: ${correctAnswer}`);
    }

    setShowFeedback(true);
    setUserAnswer('');

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
      } else {
        setSectionComplete(true);
        markSectionComplete();
      }
    }, 2000);
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItem = e.dataTransfer.getData('text/plain');
    const question = questions[currentQuestion];
    const correctAnswer = question.problem.answer.toString();
    const isCorrect = droppedItem === correctAnswer;

    if (isCorrect) {
      setFeedbackType('correct');
      setFeedbackMessage(`🎉 إجابة صحيحة! ${question.problem.num1} - ${question.problem.num2} = ${correctAnswer}`);
      addPoints(25);
    } else {
      setFeedbackType('incorrect');
      setFeedbackMessage(`❌ الإجابة غير صحيحة. الإجابة الصحيحة هي: ${correctAnswer}`);
    }

    setShowFeedback(true);
    setDraggedItems({ ...draggedItems, [currentQuestion]: droppedItem });

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
        setDraggedItems({});
      } else {
        setSectionComplete(true);
        markSectionComplete();
      }
    }, 2000);
  };

  if (sectionComplete) {
    return (
      <div className="math-page fade-in">
        <div className="completion-card card">
          <div className="completion-icon">🏆</div>
          <h2>تم إكمال قسم طرح الكسور العشرية!</h2>
          <p>مبروك يا {studentName}! لقد أتممتِ جميع التمارين بنجاح!</p>
          
          <div className="completion-stats">
            <div className="stat">
              <span className="stat-label">التمارين المكتملة</span>
              <span className="stat-value">{questions.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">النقاط المكتسبة</span>
              <span className="stat-value">{questions.length * 25}</span>
            </div>
          </div>

          <button className="btn btn-secondary" onClick={() => onNext()}>
            انتقلي إلى تحدي زكاة الخير 💰
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="math-page fade-in">
      <div className="math-header">
        <h1>➖ طرح الكسور العشرية</h1>
        <div className="level-info">
          <span className="level-badge">{question.title}</span>
          <span>التمرين {currentQuestion + 1} من {questions.length}</span>
        </div>
      </div>

      {question.type === 'direct' && (
        <>
          <div className="example-section card">
            <h2>📚 مثال محلول:</h2>
            <div className="example-content">
              <div className="example-problem">
                <span className="num">{question.example.num1}</span>
                <span className="operator">-</span>
                <span className="num">{question.example.num2}</span>
                <span className="equals">=</span>
                <span className="question">؟</span>
              </div>
              <div className="example-explanation">
                <pre>{question.example.explanation}</pre>
              </div>
            </div>
          </div>

          <div className="exercise-section card">
            <h2>🎯 حلي التمرين التالي:</h2>
            <p className="story-text">{question.story}</p>
            
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="exercise-problem">
              <span className="num">{question.problem.num1}</span>
              <span className="operator">-</span>
              <span className="num">{question.problem.num2}</span>
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
        </>
      )}

      {question.type === 'drag' && (
        <div className="exercise-section card">
          <h2>🎯 اسحبي الإجابة الصحيحة:</h2>
          <p className="story-text">{question.story}</p>
          
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="exercise-problem">
            <span className="num">{question.problem.num1}</span>
            <span className="operator">-</span>
            <span className="num">{question.problem.num2}</span>
            <span className="equals">=</span>
            <span className="question">؟</span>
          </div>

          <div className="drag-drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
            <p>اسحبي الإجابة الصحيحة هنا</p>
          </div>

          <div className="drag-options">
            {question.dragOptions.map((option, index) => (
              <div
                key={index}
                className="drag-item"
                draggable
                onDragStart={(e) => handleDragStart(e, option)}
              >
                {option}
              </div>
            ))}
          </div>

          {showFeedback && (
            <div className={`feedback ${feedbackType} fade-in`}>
              <p>{feedbackMessage}</p>
            </div>
          )}
        </div>
      )}

      <div className="tips-section card">
        <h3>💡 نصائح مهمة:</h3>
        <ul>
          <li>ضعي الفاصلة تحت الفاصلة دائماً</li>
          <li>اطرحي من اليمين إلى اليسار</li>
          <li>إذا لم تستطيعي الطرح، استعيري من المنزلة السابقة</li>
          <li>ضعي الفاصلة في النتيجة تحت الفاصلات</li>
        </ul>
      </div>
    </div>
  );
}

export default MathSubtractionPage;
