import { motion } from 'framer-motion';
import { moodConfig, MoodType } from '@/hooks/useJournal';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

export const MoodSelector = ({ selectedMood, onSelect }: MoodSelectorProps) => {
  const moods = Object.entries(moodConfig) as [MoodType, typeof moodConfig[MoodType]][];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">How are you feeling?</label>
      <div className="flex flex-wrap gap-3 justify-center">
        {moods.map(([mood, config]) => (
          <motion.button
            key={mood}
            type="button"
            onClick={() => onSelect(mood)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all min-w-[80px]",
              selectedMood === mood
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <span className="text-3xl">{config.emoji}</span>
            <span className={cn(
              "text-xs font-medium",
              selectedMood === mood ? "text-primary" : "text-muted-foreground"
            )}>
              {config.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
