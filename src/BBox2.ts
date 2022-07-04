export type Vec2 = [x: number, y: number];

export class BBox2 {
  min: Vec2 = [Infinity, Infinity];
  max: Vec2 = [-Infinity, -Infinity];

  constructor(...points: Vec2[]) {
    for (const point of points) {
      this.min[0] = Math.min(this.min[0], point[0]);
      this.min[1] = Math.min(this.min[1], point[1]);
      this.max[0] = Math.max(this.max[0], point[0]);
      this.max[1] = Math.max(this.max[1], point[1]);
    }
  }

  get width() {
    return this.max[0] - this.min[0];
  }

  get height() {
    return this.max[1] - this.min[1];
  }

  get center() {
    return [(this.max[0] + this.min[0]) / 2, (this.max[1] + this.min[1]) / 2];
  }
}
