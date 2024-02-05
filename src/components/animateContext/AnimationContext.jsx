import { createContext } from 'react';

const AnimationContext = createContext({
  isAnimationActive: false,
  activateAnimation: () => {},
});

export default AnimationContext;
