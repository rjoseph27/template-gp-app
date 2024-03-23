import { Component, Input } from "@angular/core";
import { TrackingPoint } from "./tracking.type";
import { BaseTrackingComponent } from "./base-tracking.component";

/**
 * @class GhTrackingComponent
 * @description The tracking component
 */
@Component({
    selector: 'gh-tracking',
    templateUrl: './tracking.component.html',
  })
  export class GhTrackingComponent extends BaseTrackingComponent {}