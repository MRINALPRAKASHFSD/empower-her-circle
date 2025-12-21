import { motion } from 'framer-motion';
import { Shield, Phone, MapPin, AlertTriangle, Heart, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EmergencyAlertButton } from '@/components/EmergencyAlertButton';

const emergencyContacts = [
  { name: 'Women Helpline', number: '181', description: '24/7 support for women in distress', icon: Heart },
  { name: 'Police', number: '100', description: 'Immediate police assistance', icon: Shield },
  { name: 'Emergency Services', number: '112', description: 'All emergency services', icon: AlertTriangle },
  { name: 'NCW Helpline', number: '7827-170-170', description: 'National Commission for Women', icon: Users },
];

export default function Emergency() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emergency/20 flex items-center justify-center">
              <Shield className="w-10 h-10 text-emergency" />
            </div>
            <h1 className="font-display text-display-md md:text-display-lg mb-4">
              Emergency <span className="text-emergency">Support</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quick access to emergency services and support. Your safety is our priority.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto mb-12">
            <EmergencyAlertButton floating={false} />
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {emergencyContacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div key={contact.number} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Card variant="feature" className="h-full">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-emergency/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-emergency" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                      </div>
                      <a href={`tel:${contact.number}`}>
                        <Button variant="emergency" size="lg" className="font-bold">
                          {contact.number}
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
