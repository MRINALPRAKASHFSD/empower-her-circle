import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MapPin, Phone, X, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EmergencyAlertButtonProps {
  floating?: boolean;
}

const emergencyContacts = [
  { name: 'Police', number: '100', icon: Shield },
  { name: 'Women Helpline', number: '181', icon: Phone },
  { name: 'Emergency', number: '112', icon: AlertTriangle },
];

const messageTemplates = [
  "I need immediate help at my location",
  "I feel unsafe and need assistance",
  "Please send help, this is an emergency",
  "I'm in danger, please track my location",
];

export function EmergencyAlertButton({ floating = true }: EmergencyAlertButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'initial' | 'confirm' | 'contacts' | 'sending' | 'sent'>('initial');
  const [shareLocation, setShareLocation] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(0);

  const handleEmergencyClick = () => {
    setIsOpen(true);
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('contacts');
  };

  const handleSend = () => {
    setStep('sending');
    setTimeout(() => {
      setStep('sent');
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep('initial');
  };

  const buttonContent = (
    <Button
      variant="emergency"
      size={floating ? "icon-lg" : "lg"}
      onClick={handleEmergencyClick}
      className={`${floating ? 'fixed bottom-6 right-6 z-40 rounded-full w-16 h-16' : ''} emergency-pulse`}
      aria-label="Emergency Alert"
    >
      <Shield className={floating ? "w-7 h-7" : "w-5 h-5 mr-2"} />
      {!floating && "Emergency Alert"}
    </Button>
  );

  return (
    <>
      {buttonContent}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && step !== 'sending' && handleClose()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md"
            >
              <Card variant="elevated" className="border-2 border-emergency/20">
                <CardHeader className="relative bg-emergency/10 border-b border-emergency/20">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-emergency/10 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emergency/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-emergency" />
                    </div>
                    <div>
                      <CardTitle className="text-emergency">Emergency Alert</CardTitle>
                      <p className="text-sm text-muted-foreground">Get help immediately</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  {step === 'confirm' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-2">
                        <AlertTriangle className="w-16 h-16 text-warning mx-auto" />
                        <h3 className="font-display text-xl font-semibold">Are you sure?</h3>
                        <p className="text-muted-foreground text-sm">
                          This will alert your emergency contacts and share your location
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-secondary" />
                          <span className="text-sm font-medium">Share my location</span>
                        </div>
                        <button
                          onClick={() => setShareLocation(!shareLocation)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            shareLocation ? 'bg-secondary' : 'bg-border'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-card shadow-md transform transition-transform ${
                              shareLocation ? 'translate-x-6' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" onClick={handleClose} className="flex-1">
                          Cancel
                        </Button>
                        <Button variant="emergency" onClick={handleConfirm} className="flex-1">
                          Continue
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 'contacts' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="font-semibold mb-3">Quick Call</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {emergencyContacts.map((contact) => {
                            const Icon = contact.icon;
                            return (
                              <a
                                key={contact.number}
                                href={`tel:${contact.number}`}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                              >
                                <Icon className="w-6 h-6 text-emergency" />
                                <span className="text-xs font-medium">{contact.name}</span>
                                <span className="text-lg font-bold">{contact.number}</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Select Message</h4>
                        <div className="space-y-2">
                          {messageTemplates.map((msg, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedMessage(idx)}
                              className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                                selectedMessage === idx
                                  ? 'bg-primary/10 border-2 border-primary'
                                  : 'bg-muted border-2 border-transparent hover:border-primary/30'
                              }`}
                            >
                              {msg}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button variant="emergency" onClick={handleSend} className="w-full">
                        <Shield className="w-5 h-5 mr-2" />
                        Send Alert Now
                      </Button>
                    </motion.div>
                  )}

                  {step === 'sending' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                        <Shield className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                      <h3 className="font-display text-xl font-semibold">Sending Alert...</h3>
                      <p className="text-muted-foreground text-sm">
                        Contacting your emergency contacts
                      </p>
                    </motion.div>
                  )}

                  {step === 'sent' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                        <Check className="w-8 h-8 text-success" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-success">Alert Sent!</h3>
                      <p className="text-muted-foreground text-sm">
                        Your contacts have been notified
                      </p>
                      <Button variant="outline" onClick={handleClose} className="mt-4">
                        Close
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
