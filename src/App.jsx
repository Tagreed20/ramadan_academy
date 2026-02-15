import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ReadingPage from './pages/ReadingPage';
import MathAdditionPage from './pages/MathAdditionPage';
import MathSubtractionPage from './pages/MathSubtractionPage';
import ZakahChallenge from './pages/ZakahChallenge';
import NightOfPowerChallenge from './pages/NightOfPowerChallenge';
import CertificatePage from './pages/CertificatePage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [studentName, setStudentName] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [completedSections, setCompletedSections] = useState([]);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Load student data from localStorage
  useEffect(() => {
    const savedStudentName = localStorage.getItem('studentName');
    const savedPoints = localStorage.getItem('totalPoints');
    const savedAchievements = localStorage.getItem('achievements');
    const savedCompletedSections = localStorage.getItem('completedSections');

    if (savedStudentName) setStudentName(savedStudentName);
    if (savedPoints) setTotalPoints(parseInt(savedPoints));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedCompletedSections) setCompletedSections(JSON.parse(savedCompletedSections));
  }, []);

  // Save student data to localStorage
  useEffect(() => {
    localStorage.setItem('studentName', studentName);
    localStorage.setItem('totalPoints', totalPoints.toString());
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('completedSections', JSON.stringify(completedSections));
  }, [studentName, totalPoints, achievements, completedSections]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Show notification
    const message = newDarkMode ? 'ليلة رمضانية هادئة مليئة بالإنجاز 🌙' : 'صباح مشرق مليء بالطموح ☀️';
    showNotification(message);
  };

  const showNotification = (message) => {
    // This will be implemented in a notification component
    console.log(message);
  };

  const addPoints = (points) => {
    setTotalPoints(prev => prev + points);
  };

  const addAchievement = (achievement) => {
    if (!achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement]);
    }
  };

  const markSectionComplete = (section) => {
    if (!completedSections.includes(section)) {
      setCompletedSections(prev => [...prev, section]);
    }
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage 
          onStart={() => navigateTo('reading')}
          setStudentName={setStudentName}
          studentName={studentName}
          totalPoints={totalPoints}
          completedSections={completedSections}
        />;
      case 'reading':
        return <ReadingPage 
          studentName={studentName}
          onNext={() => navigateTo('addition')}
          addPoints={addPoints}
          markSectionComplete={() => markSectionComplete('reading')}
        />;
      case 'addition':
        return <MathAdditionPage 
          studentName={studentName}
          onNext={() => navigateTo('subtraction')}
          addPoints={addPoints}
          markSectionComplete={() => markSectionComplete('addition')}
        />;
      case 'subtraction':
        return <MathSubtractionPage 
          studentName={studentName}
          onNext={() => navigateTo('zakah')}
          addPoints={addPoints}
          markSectionComplete={() => markSectionComplete('subtraction')}
        />;
      case 'zakah':
        return <ZakahChallenge 
          studentName={studentName}
          onNext={() => navigateTo('nightOfPower')}
          addPoints={addPoints}
          addAchievement={addAchievement}
          markSectionComplete={() => markSectionComplete('zakah')}
        />;
      case 'nightOfPower':
        return <NightOfPowerChallenge 
          studentName={studentName}
          onNext={() => navigateTo('certificate')}
          addPoints={addPoints}
          addAchievement={addAchievement}
          markSectionComplete={() => markSectionComplete('nightOfPower')}
        />;
      case 'certificate':
        return <CertificatePage 
          studentName={studentName}
          totalPoints={totalPoints}
          achievements={achievements}
          onRestart={() => {
            setCurrentPage('home');
            setStudentName('');
            setTotalPoints(0);
            setAchievements([]);
            setCompletedSections([]);
          }}
        />;
      default:
        return <HomePage 
          onStart={() => navigateTo('reading')}
          setStudentName={setStudentName}
          studentName={studentName}
          totalPoints={totalPoints}
          completedSections={completedSections}
        />;
    }
  };

  return (
    <div className="app">
      <Header 
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        studentName={studentName}
        totalPoints={totalPoints}
        currentPage={currentPage}
        onNavigate={navigateTo}
      />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
