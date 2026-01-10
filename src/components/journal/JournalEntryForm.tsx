import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodSelector } from './MoodSelector';
import { useCreateJournalEntry, moodConfig, MoodType } from '@/hooks/useJournal';
import { toast } from 'sonner';

interface JournalEntryFormProps {
  onSuccess?: () => void;
}

export const JournalEntryForm = ({ onSuccess }: JournalEntryFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  
  const createEntry = useCreateJournalEntry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      toast.error('Please select how you are feeling');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please write something in your journal');
      return;
    }

    try {
      await createEntry.mutateAsync({
        title: title.trim() || undefined,
        content: content.trim(),
        mood: selectedMood,
        mood_score: moodConfig[selectedMood].score,
      });
      
      toast.success('Journal entry saved! 📝');
      setTitle('');
      setContent('');
      setSelectedMood(null);
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save entry');
    }
  };

  const prompts = [
    "What made you smile today?",
    "What are you grateful for?",
    "What challenge did you overcome?",
    "What did you learn about yourself?",
    "What would make tomorrow great?",
  ];

  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          New Journal Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
          
          <div className="space-y-2">
            <Input
              placeholder="Give your entry a title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background/50"
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Textarea
              placeholder={randomPrompt}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] bg-background/50 resize-none"
              maxLength={2000}
            />
            <p className="text-xs text-muted-foreground text-right">
              {content.length}/2000
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              type="submit" 
              className="w-full gap-2"
              disabled={createEntry.isPending}
            >
              <Send className="h-4 w-4" />
              {createEntry.isPending ? 'Saving...' : 'Save Entry'}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};
