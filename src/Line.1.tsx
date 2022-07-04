import * as React from 'react';
import { Position } from 'geojson';
import { Color } from 'three';

export interface LineProps {
  points: Position[];
  width: number;
  color: Color | string | number;
}

export const Line: React.FC<LineProps> = ({ points, width, color }) => {
  const positions = React.useMemo(() => new Float32Array(points.flat()), [points]);
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={color} linewidth={width} />
    </line>
  );
};
