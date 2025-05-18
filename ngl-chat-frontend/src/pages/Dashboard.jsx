import { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaUser, FaChevronLeft, FaCopy, FaCheck, FaUserSecret, FaRedo } from 'react-icons/fa';
import apiClient from '../api/apiClient';
import formatTimeAgo from '../components/formatTimeAgo';
import LoadingSpinner from '../components/LoadingSpinner';
import useAuth from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState('messageList'); // messageList or messageDetail
    useEffect(() => {
        if (user.id == null) {
            navigate('/login');
        }


        fetchMessages();
    }, [user, navigate]);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get('/messages');

            const result = response.data;

            // Safely check if result is an array
            if (Array.isArray(result)) {
                setMessages(result);
            } else {
                setMessages([]); // If no messages or invalid data
            }

        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]); // Also handle error case safely
        } finally {
            setIsLoading(false);
        }
    };

    // Generate user's unique link
    const uniqueLink = `https://anonymous-chat-application-xi.vercel.app/user/${user.email}/${user.id}`;

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const viewMessage = async (message) => {
        if (!message) return;

        // Only update if it's not already read
        if (!message.is_read) {
            try {
                await apiClient.post(`/messages/${message.id}/read`); // Laravel route to mark as read

                // Optimistically update local state
                const updatedMessages = messages.map(msg =>
                    msg.id === message.id ? { ...msg, is_read: true } : msg
                );
                setMessages(updatedMessages);
            } catch (error) {
                console.error('Failed to mark message as read:', error);
            }
        }

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
                        

                        <div className="flex items-center justify-between ">
                        <h2 className="text-lg font-semibold mb-4">Your Messages</h2>
                            <button
                                onClick={fetchMessages}
                                disabled={isLoading}
                                className="ml-4 p-2 rounded-full text-purple-600 hover:bg-gray-700 transition-colors"
                                aria-label="Refresh messages"
                            >
                                <FaRedo className={`${isLoading ? 'animate-spin' : ''} text-2xl`} />
                            </button>
                        </div>

                        {
                            isLoading ? (
                                <LoadingSpinner message="Fetching your messages..." />
                            ) : (
                                messages.length === 0 ? (
                                    <div
                                        className={`p-8 ${cardBgColor} rounded-2xl text-center shadow-md border-2 border-dashed ${borderColor} transition-all duration-300`}
                                    >
                                        <div className="flex justify-center mb-4">
                                            <div className="bg-purple-600 p-4 rounded-full shadow-lg animate-pulse">
                                                <FaUserSecret className="text-white text-3xl" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-purple-600">No Messages Yet</h3>
                                        <p className={`${textColor} text-sm mb-4`}>
                                            It looks like you haven't received any anonymous messages yet.
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Share your unique link with friends to start receiving anonymous feedback!
                                        </p>
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
                                                    <div className="text-sm truncate whitespace-normal mt-1">
                                                        {!message.is_read ? (
                                                            <span className="font-semibold text-purple-600">You Just Received a new Message</span>
                                                        ) : (
                                                            <>
                                                                {message.content.substring(0, 60)}
                                                                {message.content.length > 60 ? '...' : ''}
                                                            </>
                                                        )}

                                                    </div>
                                                </div>
                                                {!message.is_read && (
                                                    <div className="w-3 h-3 rounded-full bg-purple-600 ml-2"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )

                            )
                        }
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