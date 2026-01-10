import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Flame, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMoodStats, moodConfig, MoodType } from '@/hooks/useJournal';

export const MoodStats = () => {
  const stats = useMoodStats();

  const getMoodLabel = (score: number): string => {
    if (score >= 4.5) return 'Amazing';
    if (score >= 3.5) return 'Good';
    if (score >= 2.5) return 'Okay';
    if (score >= 1.5) return 'Low';
    return 'Struggling';
  };

  const getMoodEmoji = (score: number): string => {
    if (score >= 4.5) return '🌟';
    if (score >= 3.5) return '😊';
    if (score >= 2.5) return '😐';
    if (score >= 1.5) return '😔';
    if (score > 0) return '💔';
    return '—';
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-medium">Total Entries</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.totalEntries}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">Avg Mood</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stats.averageMood > 0 ? `${stats.averageMood} ${getMoodEmoji(stats.averageMood)}` : '—'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                <Flame className="h-4 w-4" />
                <span className="text-xs font-medium">Streak</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stats.streak} {stats.streak === 1 ? 'day' : 'days'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs font-medium">This Week</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stats.weeklyMoods.filter(d => d.score > 0).length}/7
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Mood Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Weekly Mood Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-24">
              {stats.weeklyMoods.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center">
                    {day.score > 0 && (
                      <span className="text-lg mb-1">{getMoodEmoji(day.score)}</span>
                    )}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: day.score > 0 ? `${(day.score / 5) * 60}px` : '4px' }}
                      transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                      className={`w-full rounded-t-md ${
                        day.score > 0 
                          ? 'bg-gradient-to-t from-primary to-primary/60' 
                          : 'bg-muted'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mood Distribution */}
      {stats.totalEntries > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mood Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(Object.entries(moodConfig) as [MoodType, typeof moodConfig[MoodType]][]).map(([mood, config]) => {
                  const count = stats.moodDistribution[mood] || 0;
                  const percentage = stats.totalEntries > 0 ? (count / stats.totalEntries) * 100 : 0;
                  
                  return (
                    <div key={mood} className="flex items-center gap-3">
                      <span className="text-xl w-8">{config.emoji}</span>
                      <div className="flex-1">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {count} ({Math.round(percentage)}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
