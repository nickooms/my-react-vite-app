import * as React from 'react';
import { Feature, Polygon } from 'geojson';
import {
  BufferGeometry,
  BufferAttribute,
  DoubleSide,
  MeshBasicMaterial,
  ShapeUtils,
  Mesh,
  MeshStandardMaterial,
  MeshPhongMaterial,
} from 'three';
import { randomColor } from '../../random-color';
import { toVector2, toCoordinate3 } from './Coordinate2D';

interface PolygonMeshProps {
  feature: Feature;
  material?: MeshBasicMaterial | MeshStandardMaterial | MeshPhongMaterial;
  y?: number;
}

export const PolygonMesh: React.FC<PolygonMeshProps> = ({
  feature,
  material = new MeshBasicMaterial({
    color: randomColor(),
    side: DoubleSide,
  }),
  y = 0,
}) => {
  const [_, ...coordinates] = (feature.geometry as Polygon).coordinates[0];
  const [position, indices] = React.useMemo(() => {
    const position = new BufferAttribute(Float32Array.from(coordinates.flatMap(toCoordinate3(y))), 3);
    const indices = new BufferAttribute(
      Uint16Array.from(ShapeUtils.triangulateShape(coordinates.map(toVector2), []).flat()),
      1
    );
    return [position, indices];
  }, []);
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', position);
  geometry.setIndex(indices);
  const mesh = new Mesh(geometry, material);
  // mesh.material.vertexColors = false;
  return <primitive object={mesh} position={[0, 0, 0]} />;
};
