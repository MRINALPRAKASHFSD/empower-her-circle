import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookHeart, Plus, History, BarChart2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JournalEntryForm } from '@/components/journal/JournalEntryForm';
import { JournalEntryCard } from '@/components/journal/JournalEntryCard';
import { MoodStats } from '@/components/journal/MoodStats';
import { useJournalEntries } from '@/hooks/useJournal';
import { Skeleton } from '@/components/ui/skeleton';

const Journal = () => {
  const { data: entries, isLoading } = useJournalEntries();
  const [activeTab, setActiveTab] = useState('write');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <BookHeart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Journal & Mood Tracker
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Track your emotions, reflect on your journey, and discover patterns in your well-being
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="write" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Write</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="write" className="mt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <JournalEntryForm onSuccess={() => setActiveTab('history')} />
            </motion.div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-lg" />
                  ))}
                </div>
              ) : entries && entries.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {entries.map((entry) => (
                    <JournalEntryCard key={entry.id} entry={entry} />
                  ))}
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 px-4"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                    <BookHeart className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No entries yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start your wellness journey by writing your first journal entry
                  </p>
                  <button
                    onClick={() => setActiveTab('write')}
                    className="text-primary hover:underline font-medium"
                  >
                    Write your first entry →
                  </button>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="insights" className="mt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MoodStats />
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Journal;
