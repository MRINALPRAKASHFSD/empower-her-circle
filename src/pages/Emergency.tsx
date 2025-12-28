import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Heart, Users, AlertTriangle, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EmergencyAlertButton } from '@/components/EmergencyAlertButton';
import { FloatingOrbs, GridPattern } from '@/components/AnimatedBackground';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { useEmergencyContacts, useAddEmergencyContact, useUpdateEmergencyContact, useDeleteEmergencyContact } from '@/hooks/useEmergencyContacts';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const defaultContacts = [
  { name: 'Women Helpline', number: '181', description: '24/7 support for women in distress', icon: Heart },
  { name: 'Police', number: '100', description: 'Immediate police assistance', icon: Shield },
  { name: 'Emergency Services', number: '112', description: 'All emergency services', icon: AlertTriangle },
  { name: 'NCW Helpline', number: '7827-170-170', description: 'National Commission for Women', icon: Users },
];

export default function Emergency() {
  const { user } = useAuth();
  const { data: userContacts, isLoading } = useEmergencyContacts();
  const addContact = useAddEmergencyContact();
  const updateContact = useUpdateEmergencyContact();
  const deleteContact = useDeleteEmergencyContact();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingContact, setEditingContact] = useState<string | null>(null);
  
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelationship, setNewRelationship] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);

  const handleAddContact = async () => {
    if (!user) {
      toast.error('Please sign in to add emergency contacts');
      return;
    }
    
    if (!newName || !newPhone) {
      toast.error('Name and phone number are required');
      return;
    }

    await addContact.mutateAsync({
      name: newName,
      phone: newPhone,
      relationship: newRelationship || undefined,
      is_primary: isPrimary,
    });
    
    setShowAddDialog(false);
    resetForm();
  };

  const handleUpdateContact = async (id: string) => {
    if (!newName || !newPhone) {
      toast.error('Name and phone number are required');
      return;
    }

    await updateContact.mutateAsync({
      id,
      name: newName,
      phone: newPhone,
      relationship: newRelationship || undefined,
      is_primary: isPrimary,
    });
    
    setEditingContact(null);
    resetForm();
  };

  const handleDeleteContact = async (id: string) => {
    await deleteContact.mutateAsync(id);
  };

  const resetForm = () => {
    setNewName('');
    setNewPhone('');
    setNewRelationship('');
    setIsPrimary(false);
  };

  const startEditing = (contact: { id: string; name: string; phone: string; relationship: string | null; is_primary: boolean | null }) => {
    setEditingContact(contact.id);
    setNewName(contact.name);
    setNewPhone(contact.phone);
    setNewRelationship(contact.relationship || '');
    setIsPrimary(contact.is_primary || false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingOrbs variant="subtle" />
      <GridPattern opacity={10} />
      
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

          {/* Default Emergency Contacts */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-xl font-semibold mb-4">Emergency Helplines</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {defaultContacts.map((contact, index) => {
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

          {/* Personal Emergency Contacts */}
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Emergency Contacts</h2>
              {user && (
                <Button onClick={() => setShowAddDialog(true)} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              )}
            </div>

            {!user ? (
              <Card variant="glass">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Sign in to add and manage your personal emergency contacts
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/auth">Sign In</a>
                  </Button>
                </CardContent>
              </Card>
            ) : isLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-xl" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-10 w-24" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (userContacts?.length || 0) > 0 ? (
              <div className="space-y-4">
                {userContacts?.map((contact) => (
                  <motion.div 
                    key={contact.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className={contact.is_primary ? 'border-primary' : ''}>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        
                        {editingContact === contact.id ? (
                          <div className="flex-1 space-y-2">
                            <Input
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="Name"
                            />
                            <Input
                              value={newPhone}
                              onChange={(e) => setNewPhone(e.target.value)}
                              placeholder="Phone"
                            />
                            <Input
                              value={newRelationship}
                              onChange={(e) => setNewRelationship(e.target.value)}
                              placeholder="Relationship (optional)"
                            />
                            <div className="flex items-center gap-2">
                              <Switch 
                                checked={isPrimary} 
                                onCheckedChange={setIsPrimary}
                              />
                              <Label className="text-sm">Primary contact</Label>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{contact.name}</h3>
                              {contact.is_primary && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  Primary
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{contact.phone}</p>
                            {contact.relationship && (
                              <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          {editingContact === contact.id ? (
                            <>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleUpdateContact(contact.id)}
                              >
                                <Check className="w-4 h-4 text-success" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  setEditingContact(null);
                                  resetForm();
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <a href={`tel:${contact.phone}`}>
                                <Button variant="default" size="sm">
                                  Call
                                </Button>
                              </a>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => startEditing(contact)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleDeleteContact(contact.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card variant="glass">
                <CardContent className="p-8 text-center">
                  <Phone className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    No emergency contacts added yet
                  </p>
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Contact
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Add Contact Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Emergency Contact</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Contact name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+91 9876543210"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                placeholder="e.g., Mother, Friend, Neighbor"
                value={newRelationship}
                onChange={(e) => setNewRelationship(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Switch 
                id="primary"
                checked={isPrimary} 
                onCheckedChange={setIsPrimary}
              />
              <Label htmlFor="primary">Set as primary contact</Label>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setShowAddDialog(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleAddContact}
                disabled={addContact.isPending}
              >
                {addContact.isPending ? 'Adding...' : 'Add Contact'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
