"use client"
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageCircle, Phone, Mail, Clock, FileText, AlertCircle } from 'lucide-react';

export default function CustomerSupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you with any questions or issues you may have. You can ask me about:\n\n• Account support\n• Technical issues\n• Billing inquiries\n• Product information\n• Order status\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'welcome'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = [
    { id: 1, text: "Check my order status", icon: "📦" },
    { id: 2, text: "Billing question", icon: "💳" },
    { id: 3, text: "Technical support", icon: "🔧" },
    { id: 4, text: "Account help", icon: "👤" },
    { id: 5, text: "Product information", icon: "ℹ️" },
    { id: 6, text: "Speak to human agent", icon: "🗣️" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getCustomerSupportResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Order related queries
    if (message.includes('order') || message.includes('shipping') || message.includes('delivery') || message.includes('track')) {
      return {
        text: "I can help you track your order! To provide accurate information, I'll need your order number. You can find this in your confirmation email.\n\nAlternatively, you can check your order status by logging into your account. Would you like me to guide you through either option?",
        type: 'support',
        actions: ['Track Order', 'Login Help']
      };
    }
    
    // Billing queries
    if (message.includes('bill') || message.includes('payment') || message.includes('charge') || message.includes('refund') || message.includes('money')) {
      return {
        text: "I understand you have a billing concern. I can help with:\n\n• Payment methods\n• Billing history\n• Refund requests\n• Subscription management\n• Disputed charges\n\nCould you please specify which billing issue you're experiencing?",
        type: 'support',
        actions: ['View Billing', 'Request Refund', 'Payment Help']
      };
    }
    
    // Technical support
    if (message.includes('technical') || message.includes('bug') || message.includes('error') || message.includes('not working') || message.includes('broken')) {
      return {
        text: "I'm sorry you're experiencing technical difficulties. Let me help you troubleshoot:\n\n1. Have you tried refreshing the page or restarting the app?\n2. Are you using the latest version?\n3. What device/browser are you using?\n\nPlease describe the specific issue you're encountering, and I'll provide step-by-step assistance.",
        type: 'support',
        actions: ['Troubleshooting Guide', 'Report Bug', 'System Status']
      };
    }
    
    // Account issues
    if (message.includes('account') || message.includes('login') || message.includes('password') || message.includes('username')) {
      return {
        text: "I can assist with account-related issues:\n\n• Password reset\n• Username recovery\n• Account settings\n• Profile updates\n• Security questions\n\nWhat specific account issue can I help you resolve?",
        type: 'support',
        actions: ['Reset Password', 'Account Settings', 'Security Help']
      };
    }
    
    // Product information
    if (message.includes('product') || message.includes('feature') || message.includes('how to') || message.includes('tutorial')) {
      return {
        text: "I'd be happy to help you learn more about our products and features! I can provide:\n\n• Feature explanations\n• How-to guides\n• Best practices\n• Video tutorials\n• Documentation links\n\nWhat specific product or feature would you like to know about?",
        type: 'support',
        actions: ['View Tutorials', 'Feature Guide', 'Documentation']
      };
    }
    
    // Human agent request
    if (message.includes('human') || message.includes('agent') || message.includes('person') || message.includes('representative')) {
      return {
        text: "I understand you'd like to speak with a human agent. I can connect you with our support team:\n\n📞 Phone: 1-800-SUPPORT (available 24/7)\n📧 Email: support@company.com\n💬 Live Chat: Available Mon-Fri, 9AM-6PM EST\n\nWould you like me to initiate a live chat session or provide you with a callback request form?",
        type: 'escalation',
        actions: ['Start Live Chat', 'Request Callback', 'Send Email']
      };
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        text: "Hello! Welcome to our customer support. I'm here to help you with any questions or concerns you may have. What can I assist you with today?",
        type: 'greeting'
      };
    }
    
    // Thank you responses
    if (message.includes('thank') || message.includes('thanks')) {
      return {
        text: "You're very welcome! I'm glad I could help. Is there anything else you need assistance with today? Remember, our support team is always here when you need us.",
        type: 'gratitude'
      };
    }
    
    // Default helpful response
    return {
      text: "I want to make sure I provide you with the most helpful assistance. Could you please provide a bit more detail about your question or concern? \n\nI can help with account issues, technical problems, billing questions, order inquiries, and product information. What specific area would you like help with?",
      type: 'clarification',
      actions: ['Common Issues', 'Contact Options', 'Help Topics']
    };
  };

  const handleSendMessage = async (messageText = null) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setShowQuickActions(false);

    // Simulate API delay
    setTimeout(() => {
      const response = getCustomerSupportResponse(textToSend);
      const botResponse = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        type: response.type,
        actions: response.actions
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleQuickAction = (actionText) => {
    handleSendMessage(actionText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 relative"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-[500px] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <span className="font-semibold">Customer Support</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-green-800 rounded-full p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-green-100">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <span>Online</span>
              </div>
              
            </div>
          </div>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.text)}
                    className="text-left p-2 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="mr-1">{action.icon}</span>
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-sm ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-green-600 text-white'
                  }`}>
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' 
                          ? 'text-blue-100' 
                          : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    
                    {/* Action buttons for bot messages */}
                    {message.sender === 'bot' && message.actions && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(action)}
                            className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-sm">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Quick actions"
              >
                <FileText size={16} />
              </button>
              <div className="flex-1"></div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Phone size={12} />
                <Mail size={12} />
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your issue or question..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}