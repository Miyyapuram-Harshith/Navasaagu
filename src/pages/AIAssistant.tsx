import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { BrainCircuit, Mic, Send, CloudRain, Sprout, Droplets, ShieldAlert, FileText } from 'lucide-react';
import { cn } from '../components/layout/DashboardLayout';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'నమస్కారం! 👋\nఈరోజు మీ పొలానికి నేను ఎలా సహాయపడగలను?',
      type: 'greeting'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text, type: 'text' }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      if (text.includes('వర్షం')) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: 'అవును. రేపు మీ ప్రాంతంలో వర్షం పడే అవకాశం 68% ఉంది. ఈరోజు నీరు పెట్టడం వాయిదా వేయడం మంచిది.',
          type: 'text'
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: 'నాకు అర్థమైంది. మీ పత్తి పంటకు ప్రస్తుతం ఎలాంటి సమస్య లేదు, కానీ వాతావరణ మార్పులను గమనిస్తూ ఉండండి.',
          type: 'text'
        }]);
      }
    }, 1500);
  };

  const handleMicClick = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend('రేపు వర్షం పడే అవకాశం ఉందా?');
    }, 2000);
  };

  const quickPrompts = [
    { icon: CloudRain, text: 'Will it rain tomorrow?', telugu: 'రేపు వర్షం పడుతుందా?' },
    { icon: Sprout, text: 'What should I grow?', telugu: 'ఏ పంట వేయాలి?' },
    { icon: Droplets, text: 'Should I irrigate today?', telugu: 'ఈరోజు నీరు పెట్టాలా?' },
    { icon: ShieldAlert, text: 'Is my crop at risk?', telugu: 'నా పంటకు ప్రమాదం ఉందా?' },
    { icon: FileText, text: 'Available schemes?', telugu: 'ప్రభుత్వ పథకాలు ఏమున్నాయి?' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col">
        
        <div className="flex-1 overflow-y-auto space-y-6 pb-6 px-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn(
              "flex gap-4 max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
            )}>
              {msg.role === 'ai' && (
                <div className="w-10 h-10 rounded-full bg-agri-green flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
              )}
              
              <div className={cn(
                "p-4 rounded-2xl",
                msg.role === 'user' 
                  ? "bg-agri-dark text-white rounded-tr-sm" 
                  : "bg-white border border-gray-100 shadow-sm rounded-tl-sm"
              )}>
                <p className="whitespace-pre-line leading-relaxed text-[15px] font-medium">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-10 h-10 rounded-full bg-agri-green flex items-center justify-center shrink-0">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm p-4 flex gap-2 items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-3xl p-4 shadow-lg border border-gray-100">
          {messages.length === 1 && (
            <div className="flex overflow-x-auto gap-3 pb-4 mb-2 no-scrollbar">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt.telugu)}
                  className="flex items-center gap-2 whitespace-nowrap bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-agri-cream hover:text-agri-green hover:border-agri-green transition-colors"
                >
                  <prompt.icon className="w-4 h-4" />
                  <div className="flex flex-col items-start leading-tight">
                    <span>{prompt.telugu}</span>
                    <span className="text-[10px] text-gray-400">{prompt.text}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button 
              onClick={handleMicClick}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all",
                isListening 
                  ? "bg-red-50 text-red-500 animate-pulse border-2 border-red-200" 
                  : "bg-agri-green/10 text-agri-green hover:bg-agri-green hover:text-white"
              )}
            >
              <Mic className="w-6 h-6" />
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask anything about your farm in English or Telugu..."
              className="flex-1 bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-gray-100 focus:border-agri-green font-medium text-gray-800"
            />
            
            <button 
              onClick={() => handleSend(input)}
              className="w-14 h-14 rounded-full bg-agri-dark text-white flex items-center justify-center shrink-0 hover:bg-black transition-colors"
            >
              <Send className="w-6 h-6 ml-1" />
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;
