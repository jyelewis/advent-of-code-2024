import { Position } from "./Position";
import { range2D } from "./range2D";
import assert from "node:assert";

// TODO: needs a GridPosition to hold these values more nicely

export class Grid<PosValue = any> {
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

  get positions(): Position<PosValue>[] {
    return range2D(this.width, this.height).map((pos) => new Position(pos.x, pos.y, this.items[pos.y][pos.x]));
  }

  isInBounds(pos: Position) {
    return 0 <= pos.x && pos.x < this.width && 0 <= pos.y && pos.y < this.height;
  }

  itemAt(pos: Position) {
    assert(this.isInBounds(pos), `pos ${pos.toString()} is out of bounds`);
    return new Position(pos.x, pos.y, this.items[pos.y][pos.x]);
  }

  itemAtOrNull(pos: Position) {
    if (!this.isInBounds(pos)) {
      return null;
    }

    return new Position(pos.x, pos.y, this.items[pos.y][pos.x]);
  }
}
