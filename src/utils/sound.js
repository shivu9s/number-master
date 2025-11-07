// Replace with real .mp3 files in public/sounds/ in production
export const playSound = (name) => {
  // Optional: Preload sounds on first user gesture in real app
  const soundMap = {
    match: '/sounds/match.mp3',
    invalid: '/sounds/invalid.mp3',
    level_complete: '/sounds/level_complete.mp3',
  };

  const src = soundMap[name];
  if (!src) return;

  const audio = new Audio(src);
  audio.volume = 0.4;
  audio.play().catch(e => {
    console.warn('Sound play blocked (autoplay policy):', e);
  });
};