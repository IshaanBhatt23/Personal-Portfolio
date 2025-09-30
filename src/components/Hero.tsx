import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Define the props the component will now receive from its parent page
interface HeroProps {
  isMusicMode: boolean;
  setIsMusicMode: (isMusicMode: boolean) => void;
}

// =================================================================
// ⭐️ NEW: useMagnetic Custom Hook
// =================================================================
const useMagnetic = (intensity = 0.15) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from cursor to element center
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      
      // Calculate magnetic shift (clamped to a small area)
      const magneticX = distanceX * intensity;
      const magneticY = distanceY * intensity;
      
      // We only apply the effect when within a certain radius (e.g., 100px)
      const maxDistance = 100;
      if (Math.abs(distanceX) < maxDistance && Math.abs(distanceY) < maxDistance) {
        setPosition({ x: magneticX, y: magneticY });
      } else {
        // Smoothly reset the position when the cursor moves far away
        setPosition({ x: position.x * 0.9, y: position.y * 0.9 });
      }
    };

    const handleMouseLeave = () => {
      // Smoothly reset the position when the cursor leaves the element area
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    ref.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Clean up the event listener on the element itself if it exists
      if (ref.current) {
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [intensity, position.x, position.y]); // Recalculate on position change for smooth reset

  return { ref, style: { transform: `translate(${position.x}px, ${position.y}px)` } };
};
// =================================================================

// Helper component for inline SVG icons, replacing lucide-react
const ChevronRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);
const Download = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const MapPin = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);


// Custom hook for the typing animation (kept for completeness)
const useTypingAnimation = (text, speed = 150, delay = 2000) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
        const handleTyping = () => {
            if (isDeleting) {
                if (displayText.length > 0) {
                    setDisplayText(prev => prev.slice(0, -1));
                } else {
                    setIsDeleting(false);
                }
            } else {
                if (displayText.length < text.length) {
                    setDisplayText(prev => text.slice(0, prev.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            }
        };

        const typingInterval = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(typingInterval);
    }, [displayText, isDeleting, text, speed, delay]);

    return displayText;
};


// The main component, now renamed to Hero and accepting props
const Hero: React.FC<HeroProps> = ({ isMusicMode, setIsMusicMode }) => {
    const mountRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const scrollPos = useRef(0);
    const animatedName = useTypingAnimation("Ishaan Bhatt");
    
    // ⭐️ NEW: Instantiate the magnetic hook for each button
    const magneticViewWork = useMagnetic(0.12); // Slightly stronger
    const magneticDownload = useMagnetic(0.08); // Slightly weaker

    // 3D Scene Effect (no changes here)
    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 15;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(isMusicMode ? 0xff4500 : 0x9933ff, 4.0, 40);
        pointLight.position.set(0, 0, 8);
        scene.add(pointLight);

        const group = new THREE.Group();
        const devGeometries = [ new THREE.BoxGeometry(1, 1, 1), new THREE.OctahedronGeometry(0.8), new THREE.ConeGeometry(0.7, 1.2, 4), new THREE.CylinderGeometry(0.5, 0.5, 1, 6), new THREE.IcosahedronGeometry(0.8, 0) ];
        const musicGeometries = [ new THREE.TorusGeometry(0.7, 0.2, 16, 100), new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16), new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32), new THREE.SphereGeometry(0.7, 32, 16) ];
        const geometries = isMusicMode ? musicGeometries : devGeometries;
        const nodeMaterial = new THREE.MeshPhongMaterial({ color: isMusicMode ? 0xFF6347 : 0x8A2BE2, shininess: 100, specular: 0xffffff, emissive: isMusicMode ? 0x8B0000 : 0x3d0a6b, emissiveIntensity: 0.5, });

        const radius = 12;
        const nodeCount = 40;
        for (let i = 0; i < nodeCount; i++) { 
            const nodeGeometry = geometries[Math.floor(Math.random() * geometries.length)];
            const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
            const phi = Math.acos(-1 + (2 * i) / nodeCount);
            const theta = Math.sqrt(nodeCount * Math.PI) * phi;
            mesh.position.set( radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi) );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            group.add(mesh);
        }
        scene.add(group);
        
        const handleMouseMove = (event) => {
            const { clientWidth, clientHeight } = currentMount;
            mousePos.current = { x: (event.clientX / clientWidth) * 2 - 1, y: -(event.clientY / clientHeight) * 2 + 1, };
        };
        window.addEventListener('mousemove', handleMouseMove);
        
        const handleScroll = () => { scrollPos.current = window.scrollY; };
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            let baseRotation = elapsedTime * 0.1;
            const scrollRotation = scrollPos.current * 0.001;
            const targetRotationX = mousePos.current.y * 0.3;
            const targetRotationY = mousePos.current.x * 0.3;
            group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;
            group.rotation.y += (targetRotationY + baseRotation + scrollRotation - group.rotation.y) * 0.05;
            pointLight.position.x = mousePos.current.x * 10;
            pointLight.position.y = mousePos.current.y * 10;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            if(currentMount && renderer.domElement){ currentMount.removeChild(renderer.domElement); }
        };
    }, [isMusicMode]);
    
    const InteractiveDots = () => {
        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
        const containerRef = useRef(null);
        const rows = 20, cols = 20;
        useEffect(() => {
            const updateMousePosition = ev => { setMousePosition({ x: ev.clientX, y: ev.clientY }); };
            window.addEventListener('mousemove', updateMousePosition);
            return () => window.removeEventListener('mousemove', updateMousePosition);
        }, []);
        const dots = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) { dots.push({ i, j }); }
        }
        return (
            <div ref={containerRef} className="absolute inset-0 grid grid-cols-20 grid-rows-20 z-10">
                {dots.map(({ i, j }) => {
                    let distance = 1000;
                    if (containerRef.current) {
                        const rect = containerRef.current.getBoundingClientRect();
                        const dotX = rect.left + (j + 0.5) * (rect.width / cols);
                        const dotY = rect.top + (i + 0.5) * (rect.height / rows);
                        distance = Math.sqrt( Math.pow(dotX - mousePosition.x, 2) + Math.pow(dotY - mousePosition.y, 2) );
                    }
                    const opacity = Math.max(0, 1 - distance / 300);
                    return (
                        <div key={`${i}-${j}`} className="flex items-center justify-center">
                            <div className="w-1 h-1 bg-accent rounded-full transition-all duration-200" style={{ opacity: opacity > 0.1 ? opacity : 0.1, background: isMusicMode ? '#ff4500' : '#9933ff' }} />
                        </div>
                    );
                })}
            </div>
        );
    };

    // Animation variants for the profile pictures
    const imageVariants = {
        center: { 
            x: '0%', 
            scale: 1, 
            opacity: 1,
            zIndex: 10,
        },
        right: {
            x: '60%', // Pushes the side image to the right
            scale: 0.6,
            opacity: 0.4,
            zIndex: 5,
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
            <div ref={mountRef} className="absolute inset-0 z-0 opacity-60" />
            <InteractiveDots />
            <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="fixed top-6 right-6 z-50">
                <a href="#contact"><button className="px-4 py-2 text-sm font-medium border border-white/20 bg-black/30 backdrop-blur-md rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">Contact <ChevronRight className="w-4 h-4" /></button></a>
            </motion.div>

            <div className="container mx-auto px-6 text-center z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`p-8 sm:p-12 rounded-3xl max-w-4xl mx-auto border border-white/10 bg-black/30 backdrop-blur-xl shadow-2xl transition-shadow duration-500 ${isMusicMode ? 'shadow-orange-500/20' : 'shadow-purple-500/20'}`}
                >
                    {/* Profile Image Section with Faster Animation */}
                    <motion.div
                        className="mb-8 relative w-64 h-40 mx-auto flex items-center justify-center"
                    >
                        {/* Developer Profile Picture */}
                        <motion.img
                            src="/ishaan-profile.jpg"
                            alt="Portrait of Ishaan Bhatt"
                            className={`absolute w-40 h-40 rounded-full object-cover cursor-pointer shadow-lg ring-4 transition-all duration-500 ${isMusicMode ? 'shadow-purple-500/30 ring-purple-500/40' : 'shadow-purple-500/30 ring-purple-500/40'}`}
                            variants={imageVariants}
                            animate={isMusicMode ? 'right' : 'center'}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => setIsMusicMode(false)}
                            title="Switch to Developer Profile"
                        />
                        {/* Music Profile Picture */}
                        <motion.img
                            src="/ishaan-performing.jpg"
                            alt="Ishaan Bhatt performing music"
                            className={`absolute w-40 h-40 rounded-full object-cover cursor-pointer shadow-lg ring-4 transition-all duration-500 ${isMusicMode ? 'shadow-orange-500/30 ring-orange-500/40' : 'shadow-orange-500/30 ring-orange-500/40'}`}
                            variants={imageVariants}
                            animate={isMusicMode ? 'center' : 'right'}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => setIsMusicMode(true)}
                            title="Switch to Music Profile"
                        />
                    </motion.div>


                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl font-bold mb-6 min-h-[84px] md:min-h-[112px]"
                    >
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${isMusicMode ? 'from-orange-400 to-red-500' : 'from-purple-400 to-pink-500'}`}>
                            {animatedName}
                        </span>
                        <span className={`inline-block w-1 h-12 md:h-16 ml-1 animate-ping transition-colors duration-500 ${isMusicMode ? 'bg-orange-400' : 'bg-purple-400'}`}></span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span key={isMusicMode ? 'music' : 'dev'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} >
                                {isMusicMode ? "Beatboxer & Emotional Electronic Music Producer" : "AI / ML Developer & Audio-Tech Enthusiast"}
                            </motion.span>
                        </AnimatePresence>
                    </motion.h2>

                    {/* Description */}
                    <AnimatePresence mode="wait">
                        <motion.p key={isMusicMode ? 'music-desc' : 'dev-desc'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20}} transition={{ delay: 0.1, duration: 0.4 }} className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed" >
                            {isMusicMode ? "Crafting beats and melodies as a loopstation artist, blending human vocals with electronic soundscapes." : "Building intelligent systems and immersive audio experiences that solve real-world problems."}
                        </motion.p>
                    </AnimatePresence>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                    >
                        {/* ⭐️ MODIFIED: Magnetic 'View Work' Button */}
                        <a href="#projects">
                          <button 
                            ref={magneticViewWork.ref} 
                            style={magneticViewWork.style} 
                            className={`w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-gradient-to-r rounded-lg hover:scale-105 transition-all transform-gpu flex items-center justify-center gap-2 ${isMusicMode ? 'from-orange-600 to-red-600' : 'from-purple-600 to-pink-600'}`}
                          >
                            View Work <ChevronRight className="w-5 h-5" />
                          </button>
                        </a>
                        
                        {/* ⭐️ MODIFIED: Magnetic 'Download Resume' Button */}
                        <a href="/Ishaan-Bhatt_Resume.pdf" download="Ishaan-Bhatt-Resume.pdf">
                          <button 
                            ref={magneticDownload.ref} 
                            style={magneticDownload.style} 
                            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 hover:scale-105 transition-all transform-gpu flex items-center justify-center gap-2"
                          >
                            <Download className="w-5 h-5" />Download Resume
                          </button>
                        </a>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-2 text-sm text-gray-500"
                    >
                        <div className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4" /><span>Ahmedabad, Gujarat, India</span></div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;