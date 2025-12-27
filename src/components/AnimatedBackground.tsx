import { motion } from 'framer-motion';

// Animated floating orbs for page backgrounds
export const FloatingOrbs = ({ variant = 'default' }: { variant?: 'default' | 'hero' | 'subtle' }) => {
  const orbConfigs = {
    default: {
      primary: 'from-primary/30 to-secondary/20',
      secondary: 'from-secondary/30 to-accent/20',
      accent: 'from-primary/10 via-transparent to-secondary/10',
    },
    hero: {
      primary: 'from-primary/40 to-secondary/30',
      secondary: 'from-secondary/40 to-accent/30',
      accent: 'from-primary/15 via-transparent to-secondary/15',
    },
    subtle: {
      primary: 'from-primary/15 to-secondary/10',
      secondary: 'from-secondary/15 to-accent/10',
      accent: 'from-primary/5 via-transparent to-secondary/5',
    },
  };

  const config = orbConfigs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient orb */}
      <div className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-br ${config.primary} auth-float-orb auth-pulse-glow`} />
      
      {/* Secondary orb */}
      <div className={`absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-br ${config.secondary} auth-float-orb-delayed auth-pulse-glow`} />
      
      {/* Large center orb */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${config.accent} auth-spin-slow opacity-50`} />
      
      {/* Small floating particles */}
      <div className="absolute top-20 right-1/4 w-4 h-4 rounded-full bg-primary/60 auth-particle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-secondary/60 auth-particle" style={{ animationDelay: '-3s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-5 h-5 rounded-full bg-accent/50 auth-particle" style={{ animationDelay: '-6s' }} />
      <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full bg-primary/70 auth-particle" style={{ animationDelay: '-9s' }} />
      <div className="absolute top-2/3 right-20 w-3 h-3 rounded-full bg-secondary/50 auth-particle" style={{ animationDelay: '-2s' }} />
    </div>
  );
};

// Animated grid pattern overlay
export const GridPattern = ({ opacity = 30 }: { opacity?: number }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-${opacity}`}>
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  </div>
);

// Video background with overlay
export const VideoBackground = ({ 
  videoUrl, 
  overlayClassName = 'video-overlay' 
}: { 
  videoUrl: string; 
  overlayClassName?: string;
}) => (
  <>
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
    <div className={`absolute inset-0 ${overlayClassName}`} />
  </>
);

// Gradient background with animated mesh
export const GradientMesh = ({ className = '' }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
    </div>
  </div>
);

// Animated section wrapper with scroll reveal
export const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.section>
);

// Staggered container for child animations
export const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Staggered item for use inside StaggerContainer
export const StaggerItem = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Page transition wrapper
export const PageTransition = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Floating card animation
export const FloatingCard = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) => {
  const directionMap = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated text reveal
export const TextReveal = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Pulse glow effect
export const PulseGlow = ({
  children,
  className = '',
  color = 'primary',
}: {
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'emergency';
}) => {
  const colorClasses = {
    primary: 'shadow-glow',
    secondary: 'shadow-glow-teal',
    accent: 'shadow-[0_0_40px_hsl(var(--accent)/0.4)]',
    emergency: 'shadow-[0_0_40px_hsl(var(--emergency)/0.4)]',
  };

  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 20px hsl(var(--primary) / 0.2)',
          '0 0 40px hsl(var(--primary) / 0.4)',
          '0 0 20px hsl(var(--primary) / 0.2)',
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className={`${className} ${colorClasses[color]}`}
    >
      {children}
    </motion.div>
  );
};
