import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Mail, User, ArrowLeft, KeyRound, Sparkles, Shield, Heart } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const emailSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100),
  email: z.string().trim().email({ message: 'Please enter a valid email address' }),
});

type AuthStep = 'email' | 'otp';

// Animated background orbs
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Primary gradient orb */}
    <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 auth-float-orb auth-pulse-glow" />
    
    {/* Secondary orb */}
    <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-secondary/40 to-accent/30 auth-float-orb-delayed auth-pulse-glow" />
    
    {/* Accent orb */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 auth-spin-slow opacity-50" />
    
    {/* Small floating particles */}
    <div className="absolute top-20 right-1/4 w-4 h-4 rounded-full bg-primary/60 auth-particle" style={{ animationDelay: '0s' }} />
    <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-secondary/60 auth-particle" style={{ animationDelay: '-3s' }} />
    <div className="absolute bottom-1/3 right-1/3 w-5 h-5 rounded-full bg-accent/50 auth-particle" style={{ animationDelay: '-6s' }} />
    <div className="absolute bottom-20 left-1/3 w-2 h-2 rounded-full bg-primary/70 auth-particle" style={{ animationDelay: '-9s' }} />
    <div className="absolute top-2/3 right-20 w-3 h-3 rounded-full bg-secondary/50 auth-particle" style={{ animationDelay: '-2s' }} />
  </div>
);

// Animated grid pattern
const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
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

// Feature badges for the auth card
const FeatureBadge = ({ icon: Icon, text, delay }: { icon: React.ElementType; text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-muted-foreground"
  >
    <Icon className="w-3.5 h-3.5 text-primary" />
    <span>{text}</span>
  </motion.div>
);

export default function Auth() {
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authStep, setAuthStep] = useState<AuthStep>('email');
  const [otpValue, setOtpValue] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');

  // Current email being verified
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentFullName, setCurrentFullName] = useState('');

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleSendOtp = async (email: string, fullName?: string) => {
    setErrors({});

    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    const { error } = await sendOtp(email, fullName);
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      setCurrentEmail(email);
      setCurrentFullName(fullName || '');
      setAuthStep('otp');
      toast.success('OTP sent! Please check your email inbox.');
    }
  };

  const handleVerifyOtp = async () => {
    if (otpValue.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    const { error, isNewUser } = await verifyOtp(currentEmail, otpValue);
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      setOtpValue('');
    } else {
      toast.success(isNewUser ? 'Account created! Welcome to EmpowerHer!' : 'Welcome back to EmpowerHer!');
      navigate('/dashboard');
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    const { error } = await sendOtp(currentEmail, currentFullName);
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('OTP resent! Please check your email.');
      setOtpValue('');
    }
  };

  const handleBack = () => {
    setAuthStep('email');
    setOtpValue('');
    setCurrentEmail('');
    setCurrentFullName('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSendOtp(loginEmail);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signupSchema.safeParse({
      fullName: signupName,
      email: signupEmail,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    await handleSendOtp(signupEmail, signupName);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // OTP Verification Screen
  if (authStep === 'otp') {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Video overlay */}
        <div className="absolute inset-0 video-overlay" />

        {/* Animated elements */}
        <FloatingOrbs />
        <GridPattern />

        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md relative z-10"
        >
          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="flex items-center justify-center gap-3 mb-8">
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/30"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="text-3xl font-display font-bold text-primary-foreground">E</span>
              </motion.div>
              <span className="font-display text-3xl font-bold text-gradient-primary drop-shadow-lg">
                EmpowerHer
              </span>
            </Link>
          </motion.div>

          {/* Feature badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            <FeatureBadge icon={Shield} text="Secure" delay={0.3} />
            <FeatureBadge icon={Sparkles} text="Fast" delay={0.4} />
            <FeatureBadge icon={Heart} text="Trusted" delay={0.5} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass border-border/30 shadow-2xl shadow-primary/10 backdrop-blur-xl">
              <CardHeader className="text-center pb-2">
                <motion.div 
                  className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 border border-primary/30"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8, delay: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <KeyRound className="w-10 h-10 text-primary" />
                  </motion.div>
                </motion.div>
                <CardTitle className="text-2xl font-display text-foreground">Verify Your Email</CardTitle>
                <CardDescription className="text-muted-foreground">
                  We've sent a 6-digit code to<br />
                  <span className="font-medium text-foreground">{currentEmail}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={(value) => setOtpValue(value)}
                    disabled={isLoading}
                  >
                    <InputOTPGroup className="gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot 
                          key={index}
                          index={index} 
                          className="w-12 h-14 text-xl border-2 border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    variant="default"
                    className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg shadow-primary/30"
                    onClick={handleVerifyOtp}
                    disabled={isLoading || otpValue.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Verify & Continue
                      </>
                    )}
                  </Button>
                </motion.div>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors group"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-primary hover:text-primary/80 hover:underline transition-colors"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Video overlay */}
      <div className="absolute inset-0 video-overlay" />

      {/* Animated elements */}
      <FloatingOrbs />
      <GridPattern />

      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <Link to="/" className="flex items-center justify-center gap-3 mb-8">
            <motion.div 
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/30"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-3xl font-display font-bold text-primary-foreground">E</span>
            </motion.div>
            <span className="font-display text-3xl font-bold text-gradient-primary drop-shadow-lg">
              EmpowerHer
            </span>
          </Link>
        </motion.div>

        {/* Feature badges */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          <FeatureBadge icon={Shield} text="Secure" delay={0.3} />
          <FeatureBadge icon={Sparkles} text="Fast" delay={0.4} />
          <FeatureBadge icon={Heart} text="Trusted" delay={0.5} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass border-border/30 shadow-2xl shadow-primary/10 backdrop-blur-xl">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <CardTitle className="text-3xl font-display text-foreground">Welcome</CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-2">
                  Join our community of empowered women
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger 
                    value="login"
                    className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-md transition-all"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {/* Login Tab */}
                  <TabsContent value="login" className="mt-0">
                    <motion.form 
                      onSubmit={handleLoginSubmit} 
                      className="space-y-5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-foreground font-medium">Email</Label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="pl-12 h-12 text-base border-2 border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            disabled={isLoading}
                          />
                        </div>
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-destructive"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg shadow-primary/30" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            <Mail className="w-5 h-5 mr-2" />
                            Send OTP
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-muted-foreground">
                        We'll send a one-time password to your email
                      </p>
                    </motion.form>
                  </TabsContent>

                  {/* Signup Tab */}
                  <TabsContent value="signup" className="mt-0">
                    <motion.form 
                      onSubmit={handleSignupSubmit} 
                      className="space-y-5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-foreground font-medium">Full Name</Label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            className="pl-12 h-12 text-base border-2 border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            disabled={isLoading}
                          />
                        </div>
                        {errors.fullName && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-destructive"
                          >
                            {errors.fullName}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-foreground font-medium">Email</Label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            className="pl-12 h-12 text-base border-2 border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                            disabled={isLoading}
                          />
                        </div>
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-destructive"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all shadow-lg shadow-primary/30" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Get Started
                          </>
                        )}
                      </Button>

                      <p className="text-center text-sm text-muted-foreground">
                        We'll send a one-time password to verify your email
                      </p>
                    </motion.form>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>

              <motion.p 
                className="text-center text-sm text-muted-foreground mt-6 pt-6 border-t border-border/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                By continuing, you agree to our{' '}
                <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="flex justify-center items-center gap-6 mt-8 text-muted-foreground/60 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>SSL Secured</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span>10K+ Users</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
