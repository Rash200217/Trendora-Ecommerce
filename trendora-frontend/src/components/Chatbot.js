import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Chatbot = () => {
    // 1. Hook to check current page URL
    const location = useLocation();

    // 2. State Management
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm Trendora Bot. Ask me about our clothes! 🤖", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // 3. Auto-scroll to the bottom when new message arrives
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    // 4. HIDE ON ADMIN PANEL
    // If the URL starts with '/admin', return null (don't render anything)
    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    // 5. Send Message Handler
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        
        // Add User Message immediately
        setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setInput('');
        setIsTyping(true);

        try {
            // Send to Backend API
            const res = await axios.post('http://localhost:8080/api/chat/ask', { message: userMsg });
            
            // Add Bot Response (with slight delay for realism)
            setTimeout(() => {
                setMessages(prev => [...prev, { text: res.data, sender: 'bot' }]);
                setIsTyping(false);
            }, 600);
        } catch (error) {
            // Error Handling
            setMessages(prev => [...prev, { text: "⚠️ My brain is offline. Please start the backend server!", sender: 'bot' }]);
            setIsTyping(false);
        }
    };

    // --- CSS STYLES ---
    const styles = {
        floater: {
            position: 'fixed', bottom: '30px', right: '30px', zIndex: 10000
        },
        button: {
            width: '60px', height: '60px', borderRadius: '50%', 
            backgroundColor: '#222', color: '#fff', border: 'none', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)', cursor: 'pointer',
            fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.2s'
        },
        window: {
            position: 'fixed', bottom: '100px', right: '30px',
            width: '350px', height: '450px', backgroundColor: '#fff',
            borderRadius: '12px', boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 10000
        },
        header: {
            backgroundColor: '#222', color: '#fff', padding: '15px',
            fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        },
        body: {
            flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#f8f9fa'
        },
        inputArea: {
            padding: '10px', borderTop: '1px solid #eee', display: 'flex', backgroundColor: '#fff'
        },
        msgUser: {
            backgroundColor: '#0d6efd', color: 'white', padding: '10px 15px',
            borderRadius: '18px 18px 2px 18px', marginBottom: '10px', 
            maxWidth: '80%', alignSelf: 'flex-end', marginLeft: 'auto', fontSize: '14px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        },
        msgBot: {
            backgroundColor: '#e9ecef', color: '#333', padding: '10px 15px',
            borderRadius: '18px 18px 18px 2px', marginBottom: '10px', 
            maxWidth: '80%', alignSelf: 'flex-start', fontSize: '14px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }
    };

    return (
        <>
            {/* FLOATING TOGGLE BUTTON */}
            <div style={styles.floater}>
                <button 
                    style={styles.button} 
                    onClick={() => setIsOpen(!isOpen)}
                    className="hover-scale"
                >
                    {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-comment-alt"></i>}
                </button>
            </div>

            {/* CHAT WINDOW */}
            {isOpen && (
                <div style={styles.window} className="fade-in">
                    {/* Header */}
                    <div style={styles.header}>
                        <span><i className="fas fa-robot me-2"></i> Trendora Assistant</span>
                        <button onClick={() => setIsOpen(false)} className="btn btn-sm text-white-50">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                    
                    {/* Chat Body */}
                    <div style={styles.body}>
                        {messages.map((msg, index) => (
                            <div key={index} style={msg.sender === 'user' ? styles.msgUser : styles.msgBot}>
                                {/* Using dangerouslySetInnerHTML allows bold text (<b>) from backend to render */}
                                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                            </div>
                        ))}
                        {isTyping && <div className="text-muted small ms-2 fst-italic">Typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form style={styles.inputArea} onSubmit={handleSend}>
                        <input 
                            className="form-control border-0 shadow-none" 
                            placeholder="Ask about price, men, women..." 
                            value={input}
                            autoFocus
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="btn btn-dark rounded-circle ms-2" style={{width: '40px', height: '40px'}}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;