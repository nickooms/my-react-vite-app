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

interface PolygonsMeshProps {
  feature: Feature;
  material?: MeshBasicMaterial | MeshStandardMaterial | MeshPhongMaterial;
  yValues?: number[];
  children?: React.ReactNode;
}

export const PolygonsMesh: React.FC<PolygonsMeshProps> = ({
  feature,
  material = new MeshBasicMaterial({
    color: randomColor(),
    side: DoubleSide,
  }),
  yValues = [0],
  children,
}) => {
  const [position, indices] = React.useMemo(() => {
    // console.log(yValues);
    const [_, ...coordinates] = (feature.geometry as Polygon).coordinates[0];
    // coordinates.reverse();
    const { length } = coordinates;
    const position = yValues.flatMap((y: number) => coordinates.flatMap(toCoordinate3(y)));
    const triangles = ShapeUtils.triangulateShape(coordinates.map(toVector2), []);
    const indices = yValues.flatMap((_, yIndex: number) =>
      triangles.flatMap((triangle: number[]) => triangle.flatMap((index: number) => index + yIndex * length))
    );
    coordinates.forEach((coordinate: number[], rightBottom: number) => {
      const leftBottom = (rightBottom + 1) % length;
      const leftTop = length + leftBottom;
      const rightTop = rightBottom + length;
      indices.push(rightBottom, leftBottom, rightTop);
      indices.push(leftBottom, leftTop, rightTop);
    });
    return [position, indices];
  }, []);
  /* return (
    <mesh>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes.position" count={position.length / 3} array={position} itemSize={3} />
        <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
      </bufferGeometry>
      <meshBasicMaterial attach="material" color={randomColor()} side={DoubleSide} />
    </mesh>
  ); */
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(Float32Array.from(position), 3));
  geometry.setIndex(new BufferAttribute(Uint16Array.from(indices), 1));
  const mesh = new Mesh(geometry, material);
  return (
    <primitive object={mesh} position={[0, 0, 0]}>
      {children}
    </primitive>
  );
};
