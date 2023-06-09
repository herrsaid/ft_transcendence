'use client'

import { useSpring, animated } from 'react-spring';
import './MovingLine.css'

const MovingLine = ({ targetX }) => {
  const lineAnimation1 = useSpring({
    from: { x: 0 },
    to: { x: targetX.start },
    config: { tension: 120, friction: 14 },
  });

  const lineAnimation = useSpring({
    from: { x: 0 },
    to: { x: targetX.end },
    config: { tension: 90, friction: 14 },
  });

  return (
    <div  className="MovingLine">
      <svg className="h-3" width="100%" height="200">
        <animated.line
          x1={lineAnimation1.x}
          y1={10}
          x2={lineAnimation.x}
          y2={10}
          stroke="white"
          strokeWidth={3}
        />
      </svg>
    </div>
  );
};
export default MovingLine;