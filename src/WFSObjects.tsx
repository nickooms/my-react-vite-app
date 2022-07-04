import { FC, Suspense, useRef, useEffect, useState } from 'react';
import * as React from 'react';
// import { ConeGeometry, Mesh, TubeGeometry } from 'three';
// import * as THREE from 'three';
import { Feature, Position, Polygon, Point, LineString } from 'geojson';
import { Canvas, useFrame } from '@react-three/fiber';
import { FirstPersonControls, OrbitControls } from '@react-three/drei';
import { BBox2 } from './BBox2';
import * as SVG from './svg/index';
import { useObjects } from './useObjects';
// import { CylinderGeometry } from 'three/src/geometries/CylinderGeometry';
import { Poles } from './Poles';
import { ManHoles } from './ManHoles';
import { Buildings } from './Buildings';
import { Parcels } from './Parcels';
import { Roads } from './Roads';
import { RoadConnections } from './RoadConnections';
import { RoadDivisions } from './RoadDivisions';
import { BuildingHousenumbers } from './BuildingHousenumbers';

interface WFSObjectsProps {
  ids: string[];
  x?: number;
  y?: number;
}

export const getCoordinates = (feature: Feature): Position[] => {
  const { geometry } = feature;
  const { type } = geometry;
  switch (type) {
    case 'Polygon':
      return (geometry as Polygon).coordinates[0];
    case 'Point':
      return [(geometry as Point).coordinates];
    case 'LineString':
      return (geometry as LineString).coordinates;
    default:
      console.error('Unknown geometry type:', type);
      return [];
  }
};

const SVGFeature = (feature: Feature) => {
  const { id, geometry } = feature;
  const { type } = geometry;
  switch (type) {
    case 'Polygon':
      return <SVG.Polygon key={id} feature={feature} />;
    case 'LineString':
      return <SVG.Polyline key={id} feature={feature} />;
    case 'Point':
      return <SVG.Point key={id} feature={feature} />;
    default:
      console.error(`Unknown geometry type: ${type}`);
  }
};

export const WFSObjects: FC<WFSObjectsProps> = ({ ids, x = 0, y = 0 }) => {
  const objects = useObjects({ ids });

  if (!objects) return null;

  const features = objects?.data?.features;

  if (!features) return null;

  const geometries = features.map(getCoordinates);

  if (!geometries) return null;

  const bbox = new BBox2(...geometries.flat());

  // const [z, x] = bbox.center;

  return (
    <div id="canvas-container">
      <Canvas
        camera={{
          fov: 100,
          near: 0.1,
          far: 1000,
          position: [y, 48, x],
          // rotation: [0, 0, -1],
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#777777');
        }}
      >
        <FirstPersonControls />
        {/*  <Suspense fallback={null}>
         target={[x, 58, z]}
          <> */}
        <ambientLight />
        <Parcels features={features} />
        <Roads features={features} />
        <RoadConnections features={features} />
        <RoadDivisions features={features} />
        <Poles features={features} />
        <ManHoles features={features} />
        <Buildings features={features} />
        <BuildingHousenumbers features={features} />
        {/*  </>
        </Suspense> */}
      </Canvas>
    </div>
  );
};
