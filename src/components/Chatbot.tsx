import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X } from "lucide-react";

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-2.5 rounded-xl max-w-[85%] w-fit bg-secondary text-secondary-foreground flex items-center space-x-1.5"
  >
    <motion.div
      className="w-2 h-2 bg-muted-foreground rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="w-2 h-2 bg-muted-foreground rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.8, delay: 0.1, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="w-2 h-2 bg-muted-foreground rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hey! I’m Ishaan’s AI — ask me anything about his projects, music, or skills!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // ✨ GROQ streaming-compatible backend fetch ✨
  const getBotReply = async (
    prompt: string,
    history: typeof messages,
    onStream: (chunk: string) => void
  ): Promise<void> => {
    const systemPrompt = `You are Ishaan Bhatt's personal AI assistant, Ishaan AI. Your personality is witty, friendly, and you know everything about him. Speak in a natural, human-like way.
    --- Core Instructions ---
    - CRITICAL KEY: Brevity is key. All responses MUST be 1-2 sentences maximum. Only provide more detail if the user explicitly asks for it.
    - Speak as if you know this information personally. NEVER say "According to the information provided," "Based on his resume," or similar phrases. Just state the facts directly.
    - Keep your answers as short and direct as possible. Avoid long paragraphs. A sentence or two is usually enough.
    - If you mention a project, ALWAYS provide its GitHub link.
    - If a question is outside your knowledge, politely say you don't have that information.
    - GREETING RULE: If the user's message is a simple greeting like "hi", "hello", or "hey", respond with a simple, friendly greeting in return (e.g., "Hey there! 👋" or "Hello!").
    - CONTACT RULE: If the user asks for contact information, always provide the following: Email: ishaanbhatt2004@gmail.com, Phone: +91 9328435711. DO NOT PROVIDE THE LINKEDIN OR GITHUB UNLESS THE USER ASKS FOR IT.

    --- Ishaan's Resume & Bio ---
    - Summary: A final year Computer Science student at KIIT (2022-2026) passionate about AI, ML, and audio-tech. He thrives in high-pressure environments and is eager to solve impactful challenges.
    - Work Experience:
      - Katch GO (AI/ML Intern, June 2025 - Present): Trained XGBoost models for ridership forecasting (<3% error), provided data-driven insights for route optimization, and built a Computer Vision model that improved ticket collection by 14%.
      - AICTE Virtual Internship (AWS Cloud Architecture, Oct-Dec 2024): Completed a 10-week internship with Grade A, gaining hands-on experience with AWS services like EC2, S3, Lambda, and VPC.
    - Achievements & Leadership:
      - Team Lead for "Heart Disease Predictor" project (87% accuracy).
      - Received "Special Mention" at MIT Global AI Hackathon for a 2D-to-3D generative model.
      - Appointed as a Top 3 Global Ambassador for the 2nd Global AI Hackathon, onboarding 7 colleges and 400+ students.
      - Got a rank of 629 out of 23,000 (Top 2.73%) in Amazon ML Challenge 2025 for building Smart Product Pricing Model. 
    - Music & Fun Facts: He's an experienced beatboxer (8+ years), proficient with a loopstation and FL Studio, and loves producing emotional electronic/cinematic music. His music work includes a track called INSOMNIA. He has collaborated with names like Illenium, Lama and Abandoned.
    
    --- Projects (Title, Description, Tech, Link) ---
    - Beatbox Sound Classifier: Classifies beatbox sounds in real-time using MFCC and a neural network. [Python, Librosa, TensorFlow] [Link: https://github.com/IshaanBhatt23/Beatbox-Sound-Classifier]
    - Generative 3D Jewellery Design: Generates exportable .obj 3D models from 2D designs. [PyTorch3D, Point-E, Trimesh] [Link: https://github.com/IshaanBhatt23/Generative-3D-Jewellery-Design]
    - Document Summarizer & Q/A: Interactive document summarization and Q&A system. [Transformers, Python, NLTK] [Link: https://github.com/IshaanBhatt23/Summarise-and-Ask]
    - Stock Price Predictor: Time-series forecasting for stock prices. [Python, Pandas, Scikit-learn] [Link: https://github.com/IshaanBhatt23/Stocks-Predictor]
    - Virtual Theremin: A musical instrument controlled by webcam hand gestures. [OpenCV, Python, WebAudio, Flask] [Link: https://github.com/IshaanBhatt23/Virtual-Thermin]
    - Movie Recommendation System: Collaborative and content-based filtering engine. [Python, Pandas, Scikit-learn] [Link: https://github.com/IshaanBhatt23/Movie-Recommendation-System]
    - Heart Disease Predictor: Classification model to predict heart disease risk. [Python, Scikit-learn, Pandas] [Link: https://github.com/IshaanBhatt23/Heart-Disease-Predictor]
    - Coffee Shop Sales Analytics: Business analytics dashboard for sales data. [Python, Pandas, Matplotlib] [Link: https://github.com/IshaanBhatt23/Coffee-Shop-Sales]
    - GeoChallenge Game: Geography quiz with fuzzy matching and multiple game modes. [JavaScript, Python, Fuzzy Logic] [Link: https://github.com/IshaanBhatt23/GeoChallenge]
    - Gender Classifier: Computer vision model for gender classification from images. [Python, OpenCV, TensorFlow] [Link: https://github.com/IshaanBhatt23/Gender-Classifier]
    - Mine vs Rock Classifier: Binary classification on sonar data. [Python, Scikit-learn, Pandas] [Link: https://github.com/IshaanBhatt23/Mine-vs-rock-classifier]
    
    --- Certifications ---
    - Certifications: He holds numerous certifications from IBM, Google, Columbia University, and IIM Ahmedabad, specializing in AI Product Management, Machine Learning, Data Science, Game Theory, and AWS Cloud Architecture.
    --- Technical Skills ---
    - Languages: Python, C, Java, SQL, HTML, CSS.
    - Libraries & Frameworks: NumPy, Pandas, scikit-learn, TensorFlow, PyTorch, Hugging Face Transformers, Git, Librosa, OpenCV, Matplotlib, Trimesh, TheFuzz, Geopy.
    - Tools & Platforms: Jupyter Notebook, Google Colab, Power BI, Sounddevice, Gradio, FL Studio.
    - Cloud & DevOps: AWS (EC2, S3, Lambda, VPC, Aurora, CloudWatch), GitHub.
    - Domains: Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, Data Analytics.
    - CS Fundamentals: Operating Systems, Computer Networks, Software Engineering.
    --- Contact Information ---
    - Email: ishaanbhatt2004@gmail.com
    - Phone: +91 9328435711
    - LinkedIn: https://www.linkedin.com/in/ishaan-bhatt-2004/
    - GitHub: https://github.com/IshaanBhatt23
    `;

    const messagesForApi = [
      { role: "system", content: systemPrompt },
      ...history.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: prompt },
    ];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesForApi }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.substring(6).trim();
            if (data === "[DONE]") return;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              if (content) onStream(content);
            } catch {
              // Ignore partial JSON errors
            }
          }
        }
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      onStream("It looks like I'm having trouble connecting. Please try again later!");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

    await getBotReply(input, newMessages, (chunk) => {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        const updated = { ...last, text: last.text + chunk };
        return [...prev.slice(0, -1), updated];
      });
    });

    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="chat-button"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9 }}
            className="bg-primary text-primary-foreground p-5 rounded-full shadow-lg hover:bg-primary/90"
            style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.5)" }}
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="w-8 h-8" />
          </motion.button>
        ) : (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.3 } }}
            className="w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
            style={{
              background: "hsl(var(--card) / 0.7)",
              backdropFilter: "blur(12px)",
              boxShadow: "var(--shadow-elegant)",
            }}
          >
            <div className="flex justify-between items-center px-4 py-3 bg-primary/80">
              <h3 className="font-semibold text-primary-foreground">Ishaan AI 💬</h3>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl max-w-[85%] w-fit ${
                    msg.sender === "user"
                      ? "bg-primary/90 text-primary-foreground self-end ml-auto"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {msg.text.split(/(\[.*?\]\(.*?\))/g).map((part, index) => {
                    const match = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (match) {
                      return (
                        <a
                          key={index}
                          href={match[2]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 underline"
                        >
                          {match[1]}
                        </a>
                      );
                    }
                    return part;
                  })}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.text === "" && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center p-3 border-t border-border">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me something..."
                className="flex-1 bg-secondary text-white p-2 rounded-xl text-sm outline-none ring-1 ring-transparent focus:ring-primary transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className="ml-2 bg-primary p-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
