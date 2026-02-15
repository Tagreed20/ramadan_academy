import React, { useState } from 'react';
import './ReadingPage.css';

function ReadingPage({ studentName, onNext, addPoints, markSectionComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [sectionComplete, setSectionComplete] = useState(false);

  const readingText = `
    في ليلة من ليالي رمضان الجميلة، جلست فاطمة مع والديها لتجهيز الإفطار.
    قالت الأم: "يا فاطمة، نحتاج إلى 2.5 لتر من عصير البرتقال و1.75 لتر من عصير الرمان."
    فكرت فاطمة قليلاً وقالت: "إذاً نحتاج إلى 4.25 لتر من العصير معاً!"
    ابتسمت الأم وأضافت: "أحسنتِ يا فاطمة! والآن نحتاج إلى 3.5 كيلو من التمر و2.25 كيلو من الحلويات."
    حسبت فاطمة بسرعة: "إذاً المجموع 5.75 كيلو!"
    فرحت الأم بذكاء ابنتها وقالت: "أنتِ ستصبحين معلمة رياضيات ماهرة يا فاطمة!"
  `;

  const questions = [
    {
      type: 'vocabulary',
      question: 'ما معنى كلمة "تجهيز" في النص؟',
      options: [
        'الاستعداد والتحضير',
        'الأكل والشرب',
        'اللعب والمرح',
        'النوم والراحة'
      ],
      correctAnswer: 0,
      points: 10
    },
    {
      type: 'multipleChoice',
      question: 'كم لتراً من العصير تحتاج فاطمة وأمها معاً؟',
      options: [
        '2.5 لتر',
        '1.75 لتر',
        '4.25 لتر',
        '3.5 لتر'
      ],
      correctAnswer: 2,
      points: 15
    },
    {
      type: 'inference',
      question: 'لماذا فرحت الأم بإجابة فاطمة؟',
      options: [
        'لأن فاطمة أكلت كثيراً',
        'لأن فاطمة أجابت بسرعة وبشكل صحيح',
        'لأن الإفطار جاهز',
        'لأن الوقت تأخر'
      ],
      correctAnswer: 1,
      points: 15
    },
    {
      type: 'ordering',
      question: 'رتبي أحداث القصة من الأول إلى الآخر:',
      options: [
        'جلست فاطمة مع والديها - حسبت فاطمة كمية التمر والحلويات - فرحت الأم',
        'حسبت فاطمة كمية التمر والحلويات - جلست فاطمة مع والديها - فرحت الأم',
        'فرحت الأم - جلست فاطمة مع والديها - حسبت فاطمة كمية التمر والحلويات'
      ],
      correctAnswer: 0,
      points: 15
    },
    {
      type: 'causeEffect',
      question: 'ما السبب والنتيجة في الجملة: "أحسنتِ يا فاطمة، إذاً ستصبحين معلمة رياضيات ماهرة"؟',
      options: [
        'السبب: ذكاء فاطمة | النتيجة: ستصبح معلمة رياضيات',
        'السبب: فرح الأم | النتيجة: ستصبح فاطمة معلمة',
        'السبب: الإفطار جاهز | النتيجة: ستصبح فاطمة معلمة',
        'السبب: الوقت تأخر | النتيجة: ستصبح فاطمة معلمة'
      ],
      correctAnswer: 0,
      points: 15
    }
  ];

  const handleAnswer = (optionIndex) => {
    const question = questions[currentQuestion];
    const isCorrect = optionIndex === question.correctAnswer;

    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });

    if (isCorrect) {
      setFeedbackType('correct');
      setFeedbackMessage('🎉 إجابة صحيحة! أحسنتِ!');
      addPoints(question.points);
    } else {
      setFeedbackType('incorrect');
      setFeedbackMessage(`❌ الإجابة غير صحيحة. الإجابة الصحيحة هي: ${question.options[question.correctAnswer]}`);
    }

    setShowFeedback(true);
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

  const handleContinue = () => {
    if (sectionComplete) {
      onNext();
    }
  };

  if (sectionComplete) {
    return (
      <div className="reading-page fade-in">
        <div className="completion-card card">
          <div className="completion-icon">🎊</div>
          <h2>تم إكمال قسم الفهم القرائي!</h2>
          <p>مبروك يا {studentName}! لقد أجبتِ على جميع الأسئلة بنجاح!</p>
          
          <div className="completion-stats">
            <div className="stat">
              <span className="stat-label">عدد الأسئلة</span>
              <span className="stat-value">{questions.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">النقاط المكتسبة</span>
              <span className="stat-value">{Object.keys(answers).length > 0 ? Object.keys(answers).length * 15 : 0}</span>
            </div>
          </div>

          <button className="btn btn-secondary" onClick={handleContinue}>
            انتقلي إلى جمع الكسور العشرية ➕
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="reading-page fade-in">
      <div className="reading-header">
        <h1>📖 رحلة الأرقام في ليالي رمضان</h1>
        <div className="progress-info">
          <span>السؤال {currentQuestion + 1} من {questions.length}</span>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="reading-content card">
        <div className="story-section">
          <h2>📚 القصة:</h2>
          <p className="story-text">{readingText}</p>
        </div>

        <div className="vocabulary-section">
          <h3>📝 المفردات الجديدة:</h3>
          <ul className="vocabulary-list">
            <li><strong>تجهيز:</strong> الاستعداد والتحضير</li>
            <li><strong>كسور عشرية:</strong> أجزاء من الأعداد الصحيحة</li>
            <li><strong>الإفطار:</strong> الطعام الذي يتناوله الصائم عند غروب الشمس</li>
          </ul>
        </div>
      </div>

      <div className="question-section card">
        <h2>❓ {question.question}</h2>
        
        <div className="options-grid">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${answers[currentQuestion] === index ? 'selected' : ''}`}
              onClick={() => handleAnswer(index)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback ${feedbackType} fade-in`}>
            <p>{feedbackMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadingPage;
