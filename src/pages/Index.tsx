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
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EmergencyAlertButton } from '@/components/EmergencyAlertButton';
import { MentorCard, sampleMentors } from '@/components/MentorCard';
import heroImage from '@/assets/hero-women.jpg';

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
    quote: "Shakti helped me find a mentor who truly understood my career challenges. I've grown so much in just 6 months.",
    author: "Riya Kapoor",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "The emergency feature gave me peace of mind when I had to travel alone for work. Knowing help is one tap away is invaluable.",
    author: "Ananya Singh",
    role: "Marketing Manager",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "The financial courses helped me take control of my money. I've saved more in 3 months than I did in the past year.",
    author: "Pooja Reddy",
    role: "Teacher",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Empowering 50,000+ women across India
              </div>
              
              <h1 className="font-display text-display-lg md:text-display-xl lg:text-display-2xl">
                Unleash Your{' '}
                <span className="text-gradient-primary">Inner Shakti</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                A safe space for mentorship, education, and emergency support. 
                Connect with expert mentors, learn new skills, and always have 
                help just one tap away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/dashboard">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                  <Link to="/mentors">
                    Find a Mentor
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">4.9/5 from 10,000+ reviews</p>
                </div>
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Empowered women"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              
              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold">24/7 Support</p>
                    <p className="text-sm text-muted-foreground">Always here for you</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-4 -right-4 glass p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">500+ Mentors</p>
                    <p className="text-sm text-muted-foreground">Expert guidance</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center text-primary-foreground"
              >
                <p className="font-display text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-display-md md:text-display-lg mb-4">
              Everything You Need to{' '}
              <span className="text-gradient-primary">Thrive</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From mentorship to emergency support, we've built a comprehensive platform 
              designed specifically for women's empowerment and safety.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="feature" className="h-full p-6">
                    <CardContent className="p-0 space-y-4">
                      <div className={`w-14 h-14 rounded-2xl bg-${feature.color}/10 flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 text-${feature.color}`} />
                      </div>
                      <h3 className="font-display text-xl font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-display text-display-md md:text-display-lg mb-4">
                Meet Our{' '}
                <span className="text-gradient-primary">Expert Mentors</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Connect with verified professionals who are passionate about 
                helping women succeed in every area of life.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/mentors">
                View All Mentors
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMentors.slice(0, 3).map((mentor, index) => (
              <MentorCard key={mentor.id} mentor={mentor} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-display-md md:text-display-lg mb-4">
              Stories of{' '}
              <span className="text-gradient-primary">Transformation</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from the women whose lives have been transformed through 
              mentorship, learning, and community support.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card variant="glass" className="h-full p-6">
                  <CardContent className="p-0 space-y-6">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-foreground italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="font-display text-display-md md:text-display-lg text-primary-foreground">
                Start Your Journey Today
              </h2>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Join thousands of women who are already transforming their lives 
                through mentorship, education, and community support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/dashboard">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <EmergencyAlertButton />
    </div>
  );
}
