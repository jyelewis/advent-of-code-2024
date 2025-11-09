export class Direction {
  constructor(
    public dx: number,
    public dy: number,
  ) {}

  rotate90CW() {
    return new Direction(this.dy, -this.dx);
  }

  rotate90CCW() {
    return new Direction(-this.dy, this.dx);
  }

  toString() {
    return `[dx:${this.dx} ; dy: ${this.dy}]`;
  }

  get key() {
    return `${this.dx},${this.dy}`;
  }

  static UP = new Direction(0, -1);
  static DOWN = new Direction(0, 1);
  static LEFT = new Direction(-1, 0);
  static RIGHT = new Direction(1, 0);

  static UP_LEFT = new Direction(-1, -1);
  static UP_RIGHT = new Direction(-1, 1);
  static DOWN_LEFT = new Direction(1, -1);
  static DOWN_RIGHT = new Direction(1, 1);

  static CARDINAL = [this.UP, this.DOWN, this.LEFT, this.RIGHT];
  static DIAGONAL = [this.UP_LEFT, this.UP_RIGHT, this.DOWN_LEFT, this.DOWN_RIGHT];
  static ALL = [...this.CARDINAL, ...this.DIAGONAL];
}
