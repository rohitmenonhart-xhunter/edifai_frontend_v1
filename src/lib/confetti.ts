// Confetti animation utility for celebrating user achievements
import confettiLib from 'canvas-confetti';

// Simple confetti burst
export const confetti = () => {
  confettiLib({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

// School pride confetti with the app's primary colors
export const schoolPride = () => {
  const end = Date.now() + (3 * 1000);

  // Purple and white colors to match the app theme
  const colors = ['#8A63FF', '#FFFFFF'];

  (function frame() {
    confettiLib({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    
    confettiLib({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};

// Fireworks display
export const fireworks = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Use random colors from the theme
    confettiLib(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#8A63FF', '#7A53EF', '#FFFFFF'],
    }));
    
    confettiLib(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#8A63FF', '#7A53EF', '#FFFFFF'],
    }));
  }, 250);
}; 