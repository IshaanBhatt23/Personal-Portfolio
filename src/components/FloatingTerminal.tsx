import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true); 
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<Array<{ type: "input" | "output"; text: React.ReactNode }>>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  // 1. MOBILE DETECTION
  useEffect(() => {
    const checkMobile = () => {
      const isTouch = "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
      setIsMobile(isTouch);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. BOOT SEQUENCE
  useEffect(() => {
    if (isOpen) {
      if (output.length === 0) {
        setTimeout(() => {
           const bootLines = [
             "IshaanOS [Version 1.0.0]",
             "(c) 2025 Ishaan Bhatt. All rights reserved.",
             "", 
             "System initialized. Interactive mode enabled.",
             "Type 'help' to get list of all commands.", 
             "", 
           ];
           bootLines.forEach(line => {
             setOutput(prev => [...prev, { type: "output", text: line }]);
           });
        }, 100);
      }
      
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  // 3. AUTO-SCROLL
  useEffect(() => {
    if (isOpen && scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [output, isOpen, input]);

  // 4. SAFER CLOSE HANDLER
  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(false);
  };

  // 5. COMMAND LOGIC
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const command = input.trim().toLowerCase();
    
    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    
    const newOutput = [...output, { type: "input" as const, text: input }];

    let response: React.ReactNode;
    
    switch (command) {
      case "help":
        response = (
          <div className="flex flex-col gap-1 my-2">
            <div className="grid grid-cols-[100px_1fr] gap-4 text-gray-300">
              <span className="text-white">about</span> <span>Display bio information</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 text-gray-300">
              <span className="text-white">stack</span> <span>List technical skills</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 text-gray-300">
              <span className="text-white">projects</span> <span>Show featured works</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 text-gray-300">
              <span className="text-white">resume</span> <span>Download PDF Resume</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 text-gray-300">
              <span className="text-white">contact</span> <span>Display contact information</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-4 text-gray-300">
              <span className="text-white">clear</span> <span>Clear the screen</span>
            </div>
            <div className="h-2"></div>
          </div>
        );
        break;
      
      case "resume":
        // Trigger Download
        const link = document.createElement("a");
        link.href = "/Ishaan-Bhatt_Resume.pdf"; // <--- ENSURE FILE IS IN PUBLIC FOLDER
        link.download = "Ishaan_Bhatt_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        response = (
          <div className="my-2 text-green-400">
            <div>Initiating secure file transfer...</div>
            <div>[====================] 100%</div>
            <div className="text-gray-400">Resume downloaded successfully to local machine.</div>
            <div className="h-2"></div>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="flex flex-col gap-1 my-2 text-gray-300">
            <div className="mb-2 text-white">Contact Information</div>
            
            <div className="grid grid-cols-[100px_1fr] gap-4">
              <span className="text-gray-400">Email</span> 
              <a href="mailto:ishaanbhatt2004@gmail.com" className="text-blue-400 hover:underline">ishaanbhatt2004@gmail.com</a>
            </div>
            
            <div className="grid grid-cols-[100px_1fr] gap-4">
              <span className="text-gray-400">Phone</span> 
              <a href="tel:+919328435711" className="text-blue-400 hover:underline">+91 9328435711</a>
            </div>
            
            <div className="grid grid-cols-[100px_1fr] gap-4">
              <span className="text-gray-400">LinkedIn</span> 
              <a href="https://linkedin.com/in/ishaan-bhatt-110a93256" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/ishaan-bhatt</a>
            </div>

            <div className="grid grid-cols-[100px_1fr] gap-4">
              <span className="text-gray-400">Instagram</span> 
              <a href="https://instagram.com/ishaan79._" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">instagram.com/ishaan79._</a>
            </div>
            <div className="h-2"></div>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="my-2 text-gray-300">
            AI and ML enthusiast. Building intelligent systems with a focus on practical applications.
            <div className="h-2"></div>
          </div>
        );
        break;

      case "stack":
        response = (
          <div className="my-2 text-gray-300">
            Python, PyTorch, React, Next.js, TensorFlow, AWS.
            <div className="h-2"></div>
          </div>
        );
        break;

      case "projects":
        response = (
          <div className="flex flex-col gap-1 my-2">
            <a href="https://sap-chatflow.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">1. SAP Chatflow</a>
            <a href="https://github.com/IshaanBhatt23" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">2. GitHub Profile</a>
            <div className="h-2"></div>
          </div>
        );
        break;

      case "clear":
        setOutput([]);
        setInput("");
        return;

      default:
        response = (
          <div className="my-2 text-red-400">
            '{command}' is not recognized as an internal or external command, operable program or batch file.
            <div className="h-2"></div>
          </div>
        );
    }
    
    setOutput([...newOutput, { type: "output", text: response }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIdx = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIdx === history.length - 1 ? -1 : newIdx);
        setInput(newIdx === history.length - 1 ? "" : history[newIdx]);
      }
    }
  };

  if (isMobile) return null;

  return (
    <>
      {/* TRIGGER BUTTON */}
      <div className="fixed bottom-28 right-6 z-50 hidden md:block">
        <Button
          type="button"
          size="icon"
          onClick={(e) => isOpen ? handleClose(e) : setIsOpen(true)}
          className={`
            w-12 h-12 rounded-full shadow-2xl transition-all duration-300
            ${isOpen 
              ? "bg-cyan-500 text-black rotate-90" 
              : "bg-black border border-white/20 text-cyan-400 hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
            }
          `}
        >
          {isOpen ? <X className="w-5 h-5" /> : <TerminalIcon className="w-5 h-5" />}
        </Button>
      </div>

      {/* TERMINAL WINDOW - CSS VISIBILITY TOGGLE */}
      <div
        className={`
          fixed bottom-44 right-6 w-[600px] z-50 hidden md:block
          transition-all duration-200 ease-in-out origin-bottom-right
          ${isOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          }
        `}
      >
        <div className="
          rounded-xl overflow-hidden
          bg-[#1a1b26]/95 backdrop-blur-xl border border-white/10 shadow-2xl
          font-mono text-sm
        ">
          {/* MAC HEADER */}
          <div 
            className="bg-[#1f2335] px-4 py-3 flex items-center justify-between border-b border-white/5 cursor-pointer" 
            onClick={handleClose}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30]" /> 
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffcc00]" /> 
              <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#28cd41]" /> 
            </div>
            <div className="text-xs text-gray-400 font-semibold opacity-70">ishaan — -zsh — 80x24</div>
            <div className="w-8"></div>
          </div>

          {/* CMD BODY */}
          <div 
            ref={scrollableRef}
            className="p-6 h-96 overflow-y-auto custom-scrollbar bg-black" 
            onClick={() => inputRef.current?.focus()}
            style={{ fontFamily: "Consolas, 'Courier New', monospace", lineHeight: "1.5" }}
          >
            {output.map((line, i) => (
              <div key={i} className="break-words">
                {line.type === "input" ? (
                  <div className="text-gray-100 mt-2">
                    <span className="mr-0">C:\Users\ishaan&gt;</span>{line.text}
                  </div>
                ) : (
                  <div className="text-gray-300">
                    {line.text === "" ? <div className="h-4" /> : line.text}
                  </div>
                )}
              </div>
            ))}
            
            {/* Active Input Line */}
            <form onSubmit={handleCommand} className="flex flex-wrap items-center relative mt-2">
              <span className="text-gray-100 mr-0 whitespace-nowrap">C:\Users\ishaan&gt;</span>
              
              <div className="flex-grow flex items-center relative">
                <span className="text-gray-100 whitespace-pre-wrap break-all">{input}</span>
                
                {/* Blinking Underscore */}
                <span className="text-gray-100 inline-block align-bottom font-bold ml-[1px] animate-[pulse_1s_steps(2)_infinite]">
                  _
                </span>

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-text caret-transparent"
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingTerminal;