import * as React from 'react';
import { Feature } from 'geojson';

import { Json } from './Json';
import { useObjectIds } from './useObjectIds';
import { WFSObjects } from './WFSObjects';

interface ObjectsProps {
  x: number;
  y: number;
}

export const Objects: React.FC<ObjectsProps> = ({ x, y }) => {
  const { data, ids } = useObjectIds({ x, y });

  if (!data || ids.length === 0) {
    return null;
  }

  // const ids = data.features.map((feature: Feature) => feature.id);

  return (
    // <>
    <WFSObjects ids={ids} x={x} y={y} />
    // <Json data={ids} />;
    // </>
  );
};
