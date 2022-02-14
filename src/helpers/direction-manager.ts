import { Injectable } from "@nestjs/common";
import { Directions } from "../apis/direction/types/enum";

@Injectable()
export default class DirectionManager {
  private highestDegree: number = 360;
  private distanceBetweenHeadingAndTarget: number;

  getDirection(heading: number, target: number): string {
    this.distanceBetweenHeadingAndTarget = heading - target;

    if (this.distanceBetweenHeadingAndTarget > 0) {
      return this.getDirectionWhenHeadingIsGreaterThanTarget();
    }

    if (this.distanceBetweenHeadingAndTarget < 0) {
      return this.getDirectionWhenHeadingIsLowerThanTarget();
    }

    return Directions.Forward;
  }

  private getDirectionWhenHeadingIsGreaterThanTarget(): string {
    if ((this.highestDegree - this.distanceBetweenHeadingAndTarget) < this.distanceBetweenHeadingAndTarget) {
      return Directions.Right;
    }

    return Directions.Left;
  }

  private getDirectionWhenHeadingIsLowerThanTarget(): string {
    const distance = Math.abs(this.distanceBetweenHeadingAndTarget);

    if (this.highestDegree - distance > distance) {
      return Directions.Left;
    }

    return Directions.Right;
  }
}