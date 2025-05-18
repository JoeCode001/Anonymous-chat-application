import { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaPaperPlane, FaUserSecret, FaLink, FaInbox } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HomePage() {
  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };
  
  // Apply dark mode class to document body when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Navigation Bar */}
      <nav className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md flex justify-between items-center`}>
        <div className="flex items-center">
          <FaUserSecret className={`text-2xl ${darkMode ? 'text-purple-400' : 'text-purple-600'} mr-2`} />
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Anonymous Message Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to="/dashboard" 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-purple-400 hover:bg-gray-600' : 'bg-gray-200 text-purple-600 hover:bg-gray-300'}`}
            aria-label="Inbox"
          >
            <FaInbox className="text-lg" />
          </Link>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-purple-400 hover:bg-gray-600' : 'bg-gray-200 text-purple-600 hover:bg-gray-300'}`}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center py-12">
          <div className={`text-6xl mb-6 flex justify-center ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            <FaUserSecret />
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Anonymous Message Portal
          </h2>
          <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Receive messages anonymously through your personal shareable link
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link to="/register" className={`px-6 py-3 rounded-full font-bold text-white ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} transition-colors duration-200 flex items-center`}>
              Create Account
            </Link>
            <Link to="/login" className={`px-6 py-3 rounded-full font-bold ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors duration-200 flex items-center`}>
              Login
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 grid md:grid-cols-3 gap-8">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}>
            <div className={`text-3xl mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>
              <FaUserSecret />
            </div>
            <h3 className="text-xl font-bold mb-2">Stay Anonymous</h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Receive messages from anyone without knowing who sent them.
            </p>
          </div>
          
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}>
            <div className={`text-3xl mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>
              <FaLink />
            </div>
            <h3 className="text-xl font-bold mb-2">Shareable Link</h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Get your unique link and share it anywhere to receive messages.
            </p>
          </div>
          
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}>
            <div className={`text-3xl mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>
              <FaInbox />
            </div>
            <h3 className="text-xl font-bold mb-2">Organized Inbox</h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Read and manage your messages with our clean, intuitive interface.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className={`p-8 rounded-lg mt-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Ready to receive anonymous messages?
          </h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Share your unique link on social media, in your bio, or with friends to start receiving anonymous messages.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/register" className={`px-6 py-3 rounded-full font-bold text-white ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} transition-colors duration-200 flex items-center justify-center`}>
              Create Account
            </Link>
            <Link to="/login" className={`px-6 py-3 rounded-full font-bold ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-colors duration-200 flex items-center justify-center`}>
              Login
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`p-6 mt-12 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} shadow-inner`}>
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Anonymous Message Portal. All rights reserved.</p>

          <div className="mt-4 text-sm">
            Created by <a href="https://Joecode.vercel.app" target="_blank" rel="noopener noreferrer" className={`font-medium ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>JoeCode</a>
          </div>
        </div>
      </footer>
    </div>
  );
}