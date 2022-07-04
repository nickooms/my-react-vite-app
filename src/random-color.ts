import { Color } from 'three';

const colors = Object.keys(Color.NAMES);
// console.log(colors);

export const randomColor: () => number | string = () => {
  return Color.NAMES[colors[Math.floor(Math.random() * colors.length)]];
  // forEach(key => {
  const channel = () => (Math.random() * 256) >> 0;
  return `rgb(${channel()}, ${channel()}, ${channel()})`;
};
