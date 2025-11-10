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
    if (this.equals(Direction.UP)) {
      return "[^]";
    }
    if (this.equals(Direction.DOWN)) {
      return "[v]";
    }
    if (this.equals(Direction.LEFT)) {
      return "[<]";
    }
    if (this.equals(Direction.RIGHT)) {
      return "[>]";
    }

    return `[dx:${this.dx} ; dy: ${this.dy}]`;
  }

  get key() {
    return `${this.dx},${this.dy}`;
  }

  equals(other: Direction) {
    return this.dx === other.dx && this.dy === other.dy;
  }

  static fromChar(directionChar: string): Direction {
    switch (directionChar) {
      case "^":
        return Direction.UP;
      case "v":
        return Direction.DOWN;
      case "<":
        return Direction.LEFT;
      case ">":
        return Direction.RIGHT;
      default:
        throw new Error(`Unknown direction character: ${directionChar}`);
    }
  }

  static UP = new Direction(0, -1);
  static DOWN = new Direction(0, 1);
  static LEFT = new Direction(-1, 0);
  static RIGHT = new Direction(1, 0);

  static NORTH = new Direction(0, -1);
  static SOUTH = new Direction(0, 1);
  static WEST = new Direction(-1, 0);
  static EAST = new Direction(1, 0);

  static UP_LEFT = new Direction(-1, -1);
  static UP_RIGHT = new Direction(-1, 1);
  static DOWN_LEFT = new Direction(1, -1);
  static DOWN_RIGHT = new Direction(1, 1);

  static CARDINAL = [this.UP, this.DOWN, this.LEFT, this.RIGHT];
  static DIAGONAL = [this.UP_LEFT, this.UP_RIGHT, this.DOWN_LEFT, this.DOWN_RIGHT];
  static ALL = [...this.CARDINAL, ...this.DIAGONAL];
}
