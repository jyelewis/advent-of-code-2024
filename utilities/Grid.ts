import { Direction, Position } from "./Position";
import assert from "node:assert";
import { range } from "./range";

export class GridPosition<PosValue> extends Position {
  constructor(
    public readonly grid: Grid<PosValue>,
    x: number,
    y: number,
    public readonly value: PosValue,
  ) {
    super(x, y);
  }

  public move(direction: Direction, steps: number = 1) {
    // look up the equivalent position on the grid to ensure we get the correct value
    const newPosition = super.move(direction, steps);
    return this.grid.itemAt(newPosition) as this;
  }

  public moveOrNull(direction: Direction, steps: number = 1) {
    // look up the equivalent position on the grid to ensure we get the correct value
    const newPosition = super.move(direction, steps);
    if (!this.grid.isInBounds(newPosition)) {
      return null;
    }
    return this.grid.itemAt(newPosition) as this;
  }

  toString() {
    return `[x:${this.x}; y:${this.y}; value:${this.value}]`;
  }

  // direction step utils
  leftOrNull() {
    return this.moveOrNull(Direction.LEFT);
  }
  rightOrNull() {
    return this.moveOrNull(Direction.RIGHT);
  }
  upOrNull() {
    return this.moveOrNull(Direction.UP);
  }
  downOrNull() {
    return this.moveOrNull(Direction.DOWN);
  }
  upLeftOrNull() {
    return this.moveOrNull(Direction.UP_LEFT);
  }
  upRightOrNull() {
    return this.moveOrNull(Direction.UP_RIGHT);
  }
  downLeftOrNull() {
    return this.moveOrNull(Direction.DOWN_LEFT);
  }
  downRightOrNull() {
    return this.moveOrNull(Direction.DOWN_RIGHT);
  }
}

export class Grid<PosValue> {
  public readonly width: number;
  public readonly height: number;
  constructor(public readonly items: PosValue[][]) {
    assert(items.length > 0, "items must be non empty");

    this.width = items[0].length;
    this.height = items.length;

    // validate every sub-array is the same size
    assert(
      items.every((row) => row.length === this.width),
      "Inconsistent row sizes",
    );
  }

  get positions(): GridPosition<PosValue>[] {
    const arr: Array<GridPosition<PosValue>> = [];
    for (const y of range(this.height)) {
      for (const x of range(this.width)) {
        arr.push(new GridPosition(this, x, y, this.items[y][x]));
      }
    }

    return arr;
  }

  isInBounds(pos: Position) {
    return 0 <= pos.x && pos.x < this.width && 0 <= pos.y && pos.y < this.height;
  }

  itemAt(pos: Position) {
    assert(this.isInBounds(pos), `pos ${pos.toString()} is out of bounds`);
    return new GridPosition(this, pos.x, pos.y, this.items[pos.y][pos.x]);
  }

  itemAtOrNull(pos: Position) {
    if (!this.isInBounds(pos)) {
      return null;
    }

    return new GridPosition(this, pos.x, pos.y, this.items[pos.y][pos.x]);
  }
}
