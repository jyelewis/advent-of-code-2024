export class Direction {
  constructor(
    public dx: number,
    public dy: number,
  ) {}

  static UP = new Direction(0, -1);
  static DOWN = new Direction(0, 1);
  static LEFT = new Direction(-1, 0);
  static RIGHT = new Direction(1, 0);

  static UP_LEFT = new Direction(-1, -1);
  static UP_RIGHT = new Direction(-1, 1);
  static DOWN_LEFT = new Direction(1, -1);
  static DOWN_RIGHT = new Direction(1, 1);
}

export class Position<Value = any> {
  constructor(
    public x: number,
    public y: number,
    public value: Value,
  ) {}

  public move(direction: Direction, steps: number = 1) {
    // TODO: footgun, within grids would expect this to select another cell
    return new Position<Value>(this.x + direction.dx * steps, this.y + direction.dy * steps, this.value);
  }

  get key() {
    return `${this.x},${this.y}`;
  }

  equals(other?: Position) {
    return other && this.x === other.x && this.y === other.y;
  }

  toString() {
    return `[x:${this.x}; y:${this.y}; value:${this.value}]`;
  }

  // direction step utils
  left() {
    return this.move(Direction.LEFT);
  }
  right() {
    return this.move(Direction.RIGHT);
  }
  up() {
    return this.move(Direction.UP);
  }
  down() {
    return this.move(Direction.DOWN);
  }
  upLeft() {
    return this.move(Direction.UP_LEFT);
  }
  upRight() {
    return this.move(Direction.UP_RIGHT);
  }
  downLeft() {
    return this.move(Direction.DOWN_LEFT);
  }
  downRight() {
    return this.move(Direction.DOWN_RIGHT);
  }
}
