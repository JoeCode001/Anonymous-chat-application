import { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaUser, FaChevronLeft, FaCopy, FaCheck } from 'react-icons/fa';
import apiClient from '../api/apiClient';
import formatTimeAgo from '../components/formatTimeAgo';
function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [view, setView] = useState('messageList'); // messageList or messageDetail
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await apiClient.get('/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);
  
  // Mock messages data (would normally come from an API)
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hey, I really like your content! Keep it up!", read: false, timestamp: "2 hours ago" },
//     { id: 2, text: "Have you ever thought about trying something new? I think you'd be great at it.", read: true, timestamp: "5 hours ago" },
//     { id: 3, text: "I've been following your journey for a while now. It's inspiring to see how far you've come!", read: true, timestamp: "1 day ago" },
//     { id: 4, text: "Quick question - what's your favorite book? I'm looking for recommendations.", read: false, timestamp: "2 days ago" },
//   ]);
  
  // Generate user's unique link
  const uniqueLink = "https://anonymous-chat.example/user/username123";
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const viewMessage = (message) => {
    // Mark message as read
    const updatedMessages = messages.map(msg => 
      msg.id === message.id ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    setSelectedMessage(message);
    setView('messageDetail');
  };
  
  const backToList = () => {
    setView('messageList');
    setSelectedMessage(null);
  };
  
  const copyShareLink = () => {
    navigator.clipboard.writeText(uniqueLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  // Colors based on theme
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-50';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const navBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  
  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Navigation Bar */}
      <div className={`p-4 ${navBgColor} shadow-md flex items-center justify-between`}>
        {view === 'messageList' ? (
          <h1 className="text-xl font-bold text-purple-600">Anonymous Messages</h1>
        ) : (
          <button 
            onClick={backToList}
            className="text-purple-600 flex items-center"
          >
            <FaChevronLeft size={16} className="mr-2" />
            Back to Messages
          </button>
        )}
        
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-purple-600 mr-2"
          >
            {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
      </div>
      
      {/* Share Link Section */}
      <div className={`p-4 ${cardBgColor} border-b ${borderColor} flex items-center justify-between`}>
        <div className="flex-1 truncate mr-2">
          <div className="text-sm text-gray-500">Share your link to receive messages:</div>
          <div className="truncate">{uniqueLink}</div>
        </div>
        <button
          onClick={copyShareLink}
          className="p-2 rounded-md bg-purple-600 text-white flex items-center"
        >
          {isCopied ? <FaCheck size={16} /> : <FaCopy size={16} />}
          <span className="ml-2">{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto p-4">
        {view === 'messageList' ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Your Messages</h2>
            
            {messages.length === 0 ? (
              <div className={`p-6 ${cardBgColor} rounded-lg text-center shadow-sm border ${borderColor}`}>
                <p>You don't have any messages yet. Share your link to start receiving anonymous messages!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    onClick={() => viewMessage(message)}
                    className={`p-4 ${cardBgColor} rounded-lg shadow-sm cursor-pointer border ${borderColor} flex items-center transition-all hover:shadow-md`}
                  >
                    <div className="rounded-full bg-purple-600 p-3 mr-4">
                      <FaUser size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-medium">Anonymous</div>
                        <div className="text-sm text-gray-500">{formatTimeAgo(message.created_at)}</div>
                      </div>
                      <div className="text-sm truncate mt-1">
                        You Just Received a new Message
                      </div>
                    </div>
                    {!message.read && (
                      <div className="w-3 h-3 rounded-full bg-purple-600 ml-2"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // Message Detail View
          <div className={`p-6 ${cardBgColor} rounded-lg shadow-sm border ${borderColor}`}>
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-purple-600 p-3 mr-4">
                <FaUser size={24} className="text-white" />
              </div>
              <div>
                <div className="font-medium">Anonymous</div>
                <div className="text-sm text-gray-500">{formatTimeAgo(selectedMessage?.created_at)}</div>
              </div>
            </div>
            <div className="py-4 text-lg">
              {selectedMessage?.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;