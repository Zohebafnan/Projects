import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, X, Award, BookOpen, ArrowRight, Clock, Star } from 'lucide-react';

const subjects = ['Mathematics', 'Biology', 'Physics', 'Chemistry', 'History', 'Geography'];
const difficultyLevels = ['Easy', 'Medium', 'Hard'];

const quizData = {
  Mathematics: [
    { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4', difficulty: 'Easy' },
    { question: 'What is 10 * 5?', options: ['40', '50', '60', '70'], answer: '50', difficulty: 'Easy' },
    { question: 'What is the square root of 64?', options: ['6', '7', '8', '9'], answer: '8', difficulty: 'Medium' },
    { question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], answer: '30', difficulty: 'Medium' },
    { question: 'What is the value of π (pi) to two decimal places?', options: ['3.14', '3.15', '3.16', '3.17'], answer: '3.14', difficulty: 'Hard' },
  ],
  Biology: [
    { question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'], answer: 'Mitochondria', difficulty: 'Easy' },
    { question: 'Which of these is not a type of blood cell?', options: ['Red blood cells', 'White blood cells', 'Platelets', 'Stem cells'], answer: 'Stem cells', difficulty: 'Medium' },
    { question: 'What is the largest organ in the human body?', options: ['Brain', 'Liver', 'Skin', 'Heart'], answer: 'Skin', difficulty: 'Easy' },
    { question: 'Which of these is not a type of muscle tissue?', options: ['Cardiac', 'Smooth', 'Skeletal', 'Epithelial'], answer: 'Epithelial', difficulty: 'Hard' },
    { question: 'What is the process by which plants make their own food?', options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Digestion'], answer: 'Photosynthesis', difficulty: 'Medium' },
  ],
  Physics: [
    { question: 'What is the SI unit of force?', options: ['Watt', 'Joule', 'Newton', 'Pascal'], answer: 'Newton', difficulty: 'Easy' },
    { question: 'What is the speed of light in vacuum?', options: ['299,792 km/s', '300,000 km/s', '301,000 km/s', '298,000 km/s'], answer: '299,792 km/s', difficulty: 'Medium' },
    { question: 'What is the first law of thermodynamics about?', options: ['Energy conservation', 'Entropy', 'Temperature', 'Pressure'], answer: 'Energy conservation', difficulty: 'Hard' },
    { question: 'Which particle has a positive charge?', options: ['Electron', 'Proton', 'Neutron', 'Photon'], answer: 'Proton', difficulty: 'Easy' },
    { question: 'What is the unit of electrical resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], answer: 'Ohm', difficulty: 'Medium' },
  ],
  Chemistry: [
    { question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Fe', 'Cu'], answer: 'Au', difficulty: 'Easy' },
    { question: 'What is the pH of a neutral solution?', options: ['0', '7', '14', '10'], answer: '7', difficulty: 'Easy' },
    { question: 'What type of bond is formed between a metal and a non-metal?', options: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'], answer: 'Ionic', difficulty: 'Medium' },
    { question: 'What is the most abundant gas in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], answer: 'Nitrogen', difficulty: 'Medium' },
    { question: 'What is the atomic number of carbon?', options: ['4', '6', '8', '12'], answer: '6', difficulty: 'Hard' },
  ],
  History: [
    { question: 'In which year did World War II end?', options: ['1943', '1945', '1947', '1950'], answer: '1945', difficulty: 'Easy' },
    { question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'], answer: 'George Washington', difficulty: 'Easy' },
    { question: 'In which year did the French Revolution begin?', options: ['1769', '1779', '1789', '1799'], answer: '1789', difficulty: 'Medium' },
    { question: 'Who wrote the "I Have a Dream" speech?', options: ['Malcolm X', 'Martin Luther King Jr.', 'John F. Kennedy', 'Rosa Parks'], answer: 'Martin Luther King Jr.', difficulty: 'Medium' },
    { question: 'Which empire was ruled by the Incas?', options: ['Aztec', 'Mayan', 'Roman', 'Incan'], answer: 'Incan', difficulty: 'Hard' },
  ],
  Geography: [
    { question: 'What is the largest continent by land area?', options: ['Africa', 'North America', 'Asia', 'Europe'], answer: 'Asia', difficulty: 'Easy' },
    { question: 'Which river is the longest in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], answer: 'Nile', difficulty: 'Medium' },
    { question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], answer: 'Canberra', difficulty: 'Medium' },
    { question: 'Which mountain range runs along the border of France and Spain?', options: ['Alps', 'Pyrenees', 'Carpathians', 'Andes'], answer: 'Pyrenees', difficulty: 'Hard' },
    { question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific', difficulty: 'Easy' },
  ],
};

export function QuizApp() {
  const [step, setStep] = useState('name');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(60);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    let interval;
    if (step === 'quiz' && timer > 0 && !showResult) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !showResult) {
      setShowResult(true);
    }
    return () => clearInterval(interval);
  }, [step, timer, showResult]);

  const handleStartQuiz = () => {
    if (name.trim() !== '') {
      setStep('subject');
    }
  };

  const handleSubjectSelect = (selectedSubject) => {
    setSubject(selectedSubject);
    setStep('difficulty');
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setStep('quiz');
    setTimer(60); // Reset timer when starting the quiz
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuiz = quizData[subject].filter(q => q.difficulty === difficulty);
    if (currentQuiz[currentQuestion] && selectedAnswer === currentQuiz[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      updateLeaderboard();
    }
  };

  const updateLeaderboard = () => {
    const newLeaderboard = [...leaderboard, { name, score, subject, difficulty }];
    newLeaderboard.sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard.slice(0, 5)); // Keep top 5 scores
  };

  const handleRestart = () => {
    setStep('name');
    setName('');
    setSubject('');
    setDifficulty('');
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimer(60);
  };

  const renderProgressBar = () => {
    const currentQuiz = quizData[subject].filter(q => q.difficulty === difficulty);
    const progress = ((currentQuestion + 1) / currentQuiz.length) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };

  const students = [
    { name: "Zohaib Afnan", role: "160923737152" },
    { name: "Ibrahim Onaiz", role: "160923737129" },
    { name: "Amair mohd Khan", role: "160923737149" },
    { name: "Mohd Riyaz", role: "160923737135" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gray-100 p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Quiz Master</h1>
          <p className="text-gray-600">Test your knowledge!</p>
        </div>
        <div className="p-6">
          {step === 'name' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Quiz Master!</h2>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                onClick={handleStartQuiz}
                className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
              >
                Start Quiz <ChevronRight className="ml-2" size={20} />
              </button>
            </div>
          )}

          {step === 'subject' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose a subject, {name}!</h2>
              <div className="grid grid-cols-2 gap-4">
                {subjects.map((subj) => (
                  <button
                    key={subj}
                    onClick={() => handleSubjectSelect(subj)}
                    className="bg-blue-100 text-blue-800 p-3 rounded-lg hover:bg-blue-200 transition duration-300 flex items-center justify-center"
                  >
                    <BookOpen className="mr-2" size={20} /> {subj}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'difficulty' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select difficulty for {subject}</h2>
              <div className="space-y-3">
                {difficultyLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleDifficultySelect(level)}
                    className="w-full bg-yellow-100 text-yellow-800 p-3 rounded-lg hover:bg-yellow-200 transition duration-300 flex items-center justify-center"
                  >
                    <Star className="mr-2" size={20} /> {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'quiz' && !showResult && (() => {
            const currentQuiz = quizData[subject].filter(q => q.difficulty === difficulty);
            const currentQuestionData = currentQuiz[currentQuestion];

            return (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{subject} Quiz - {difficulty}</h2>
                {renderProgressBar()}
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-gray-600">Question {currentQuestion + 1} of {currentQuiz.length}</p>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-1" size={16} />
                    <span>{timer}s</span>
                  </div>
                </div>
                {currentQuestionData && (
                  <>
                    <p className="mb-4 text-lg font-medium text-gray-800">{currentQuestionData.question}</p>
                    <div className="space-y-3">
                      {currentQuestionData.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className="w-full bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition duration-300 text-left"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })()}

          {showResult && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Results</h2>
              <div className="mb-6">
                <Award className="mx-auto text-yellow-500" size={64} />
              </div>
              <p className="text-lg mb-4">
                Congratulations, {name}! You scored {score} out of {quizData[subject].filter(q => q.difficulty === difficulty).length} in {subject} ({difficulty}).
              </p>
              <div className="flex items-center justify-center mb-6">
                {[...Array(quizData[subject].filter(q => q.difficulty === difficulty).length)].map((_, index) => (
                  index < score ? (
                    <Check key={index} className="text-green-500 mr-1" size={24} />
                  ) : (
                    <X key={index} className="text-red-500 mr-1" size={24} />
                  )
                ))}
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Leaderboard</h3>
                <ul className="space-y-2">
                  {leaderboard.map((entry, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <span>{entry.name} - {entry.subject} ({entry.difficulty})</span>
                      <span className="font-bold">{entry.score}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={handleRestart}
                className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center mb-8"
              >
                Play Again <ArrowRight className="ml-2" size={20} />
              </button>

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Meet the Team</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {students.map((student, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-lg">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



