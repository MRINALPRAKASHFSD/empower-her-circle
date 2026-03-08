import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  BookOpen, 
  Heart, 
  MessageCircle, 
  Award,
  ArrowRight,
  Star,
  ChevronRight,
  Sparkles,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EmergencyAlertButton } from '@/components/EmergencyAlertButton';
import { MentorCard, sampleMentors } from '@/components/MentorCard';
import { 
  FloatingOrbs, 
  GridPattern, 
  VideoBackground,
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  FloatingCard,
  TextReveal
} from '@/components/AnimatedBackground';


const features = [
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'Connect with verified mentors across career, health, finance, and personal development.',
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'Emergency Support',
    description: 'One-tap emergency alerts with location sharing to trusted contacts and authorities.',
    color: 'emergency',
  },
  {
    icon: BookOpen,
    title: 'Learning Library',
    description: 'Access courses on safety, financial independence, health, and professional skills.',
    color: 'secondary',
  },
  {
    icon: Heart,
    title: 'Wellness Resources',
    description: 'Mental health support, self-care guides, and community wellness programs.',
    color: 'accent',
  },
  {
    icon: MessageCircle,
    title: 'Secure Communication',
    description: 'Private chat, voice, and video calls with end-to-end encryption.',
    color: 'primary',
  },
  {
    icon: Award,
    title: 'Achievement System',
    description: 'Track progress, earn badges, and celebrate your growth milestones.',
    color: 'warning',
  },
];

const stats = [
  { value: '50,000+', label: 'Women Empowered' },
  { value: '500+', label: 'Expert Mentors' },
  { value: '200+', label: 'Learning Courses' },
  { value: '24/7', label: 'Emergency Support' },
];

const testimonials = [
  {
    quote: "EmpowerHer helped me find a mentor who truly understood my career challenges. I've grown so much in just 6 months.",
    author: "Riya K.",
    role: "Software Developer",
    initials: "RK",
    color: "from-primary to-secondary",
  },
  {
    quote: "The emergency feature gave me peace of mind when I had to travel alone for work. Knowing help is one tap away is invaluable.",
    author: "Ananya S.",
    role: "Marketing Manager",
    initials: "AS",
    color: "from-secondary to-accent",
  },
  {
    quote: "The financial courses helped me take control of my money. I've saved more in 3 months than I did in the past year.",
    author: "Pooja R.",
    role: "Teacher",
    initials: "PR",
    color: "from-accent to-primary",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Video Background */}
        <VideoBackground 
          videoUrl="https://videos.pexels.com/video-files/6192818/6192818-uhd_2560_1440_25fps.mp4"
          overlayClassName="bg-gradient-to-br from-background/90 via-background/70 to-primary/20"
        />
        
        {/* Animated orbs */}
        <FloatingOrbs variant="hero" />
        <GridPattern opacity={20} />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                Empowering 50,000+ women across India
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-display text-display-lg md:text-display-xl lg:text-display-2xl"
              >
                Unleash Your{' '}
                <span className="text-gradient-primary relative">
                  Inner Strength
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground max-w-lg"
              >
                A safe space for mentorship, education, and emergency support. 
                Connect with expert mentors, learn new skills, and always have 
                help just one tap away.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button variant="hero" size="xl" asChild className="group">
                  <Link to="/auth">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="border-primary/30 backdrop-blur-sm hover:bg-primary/10 group" asChild>
                  <Link to="/mentors">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Find a Mentor
                  </Link>
                </Button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 pt-4"
              >
              <div className="flex -space-x-3">
                  {['RK', 'AS', 'PR', 'MJ'].map((initials, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="w-10 h-10 rounded-full border-2 border-background ring-2 ring-primary/20 bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-primary-foreground">{initials}</span>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.05 }}
                      >
                        <Star className="w-4 h-4 fill-warning text-warning" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">4.9/5 from 10,000+ reviews</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
                <motion.img
                  src={heroImage}
                  alt="Empowered women"
                  className="w-full h-auto"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>
              
              {/* Floating cards */}
              <FloatingCard delay={0.8} direction="up" className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl shadow-xl border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold">24/7 Support</p>
                    <p className="text-sm text-muted-foreground">Always here for you</p>
                  </div>
                </div>
              </FloatingCard>

              <FloatingCard delay={1} direction="down" className="absolute -top-4 -right-4 glass p-4 rounded-2xl shadow-xl border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">500+ Mentors</p>
                    <p className="text-sm text-muted-foreground">Expert guidance</p>
                  </div>
                </div>
              </FloatingCard>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" />
        <FloatingOrbs variant="subtle" />
        
        <div className="container mx-auto px-4 relative z-10">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="text-center text-primary-foreground"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.p 
                    className="font-display text-4xl md:text-5xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-primary-foreground/80">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        <FloatingOrbs variant="subtle" />
        <GridPattern opacity={10} />
        
        <div className="container mx-auto px-4 relative z-10">
          <TextReveal className="text-center mb-16">
            <h2 className="font-display text-display-md md:text-display-lg mb-4">
              Everything You Need to{' '}
              <span className="text-gradient-primary">Thrive</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From mentorship to emergency support, we've built a comprehensive platform 
              designed specifically for women's empowerment and safety.
            </p>
          </TextReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card variant="feature" className="h-full p-6 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                      <CardContent className="p-0 space-y-4">
                        <motion.div 
                          className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center`}
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className={`w-7 h-7 text-${feature.color}`} />
                        </motion.div>
                        <h3 className="font-display text-xl font-semibold">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Mentors Section */}
      <AnimatedSection className="py-24 relative overflow-hidden bg-muted/30">
        <GridPattern opacity={15} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <TextReveal>
              <h2 className="font-display text-display-md md:text-display-lg mb-4">
                Meet Our{' '}
                <span className="text-gradient-primary">Expert Mentors</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Connect with verified professionals who are passionate about 
                helping women succeed in every area of life.
              </p>
            </TextReveal>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" asChild className="group">
                <Link to="/mentors">
                  View All Mentors
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMentors.slice(0, 3).map((mentor, index) => (
              <MentorCard key={mentor.id} mentor={mentor} index={index} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="py-24 relative overflow-hidden">
        <FloatingOrbs variant="subtle" />
        
        <div className="container mx-auto px-4 relative z-10">
          <TextReveal className="text-center mb-16">
            <h2 className="font-display text-display-md md:text-display-lg mb-4">
              Stories of{' '}
              <span className="text-gradient-primary">Transformation</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from the women whose lives have been transformed through 
              mentorship, learning, and community support.
            </p>
          </TextReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card variant="glass" className="h-full p-6 backdrop-blur-xl border-border/30 hover:border-primary/30 transition-all">
                    <CardContent className="p-0 space-y-6">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                        ))}
                      </div>
                      <p className="text-foreground italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <motion.img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Video Background for CTA */}
            <div className="absolute inset-0">
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
            </div>
            
            <div className="relative z-10 p-12 md:p-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="font-display text-display-md md:text-display-lg text-primary-foreground">
                  Start Your Journey Today
                </h2>
                <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                  Join thousands of women who are already transforming their lives 
                  through mentorship, education, and community support.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="secondary" size="xl" asChild className="shadow-xl">
                    <Link to="/auth">
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
      <EmergencyAlertButton />
    </div>
  );
}
