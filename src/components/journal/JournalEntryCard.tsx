import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { JournalEntry, moodConfig, useDeleteJournalEntry } from '@/hooks/useJournal';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export const JournalEntryCard = ({ entry }: JournalEntryCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const deleteEntry = useDeleteJournalEntry();
  const mood = moodConfig[entry.mood];

  const handleDelete = async () => {
    try {
      await deleteEntry.mutateAsync(entry.id);
      toast.success('Entry deleted');
    } catch (error: any) {
      toast.error('Failed to delete entry');
    }
  };

  const isLongContent = entry.content.length > 200;
  const displayContent = expanded || !isLongContent 
    ? entry.content 
    : entry.content.slice(0, 200) + '...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="group hover:shadow-lg transition-shadow border-l-4" style={{ borderLeftColor: `var(--${entry.mood === 'amazing' ? 'yellow' : entry.mood === 'good' ? 'green' : entry.mood === 'okay' ? 'blue' : entry.mood === 'low' ? 'orange' : 'red'}-500, hsl(var(--primary)))` }}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{mood.emoji}</span>
              <div>
                {entry.title && (
                  <h3 className="font-semibold text-foreground">{entry.title}</h3>
                )}
                <p className="text-xs text-muted-foreground">
                  {format(new Date(entry.created_at), 'EEEE, MMMM d, yyyy • h:mm a')}
                </p>
              </div>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your journal entry.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
            {displayContent}
          </p>
          
          {isLongContent && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-primary hover:text-primary/80 p-0 h-auto"
            >
              {expanded ? (
                <>Show less <ChevronUp className="h-4 w-4 ml-1" /></>
              ) : (
                <>Read more <ChevronDown className="h-4 w-4 ml-1" /></>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
