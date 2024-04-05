import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { GhDateProperties } from "../classes/gh-date";
import { LoadingService } from "../../services/loading.service";
import { ClientRequestsService } from "../../client/service/requests.service";
import { UsersService } from "../../services/users.service";
import { NavigationService } from "../../services/navigation.service";
import { ReportTrip } from "../../api/requests/requests.type";

/**
 * @enum TaskName
 * @description The task name
 */
export enum TaskName {
    /**
     * @description The notice for the gp to pick up
     * @type {string}
     */
    NOTICE_GP_TO_PICK_UP = 'NOTICE_GP_TO_PICK_UP',

    /**
     * @description The notice for the gp to be on way to airport
     * @type {string}
     */
    NOTICE_GP_TO_BE_ON_WAY_TO_AIRPORT = 'NOTICE_GP_TO_BE_ON_WAY_TO_AIRPORT',

    /**
     * @description The notice for the gp to be at first departure
     * @type {string}
     */
    NOTICE_GP_TO_BE_FIRST_DEPARTURE = 'NOTICE_GP_TO_BE_FIRST_DEPARTURE',

    /**
     * @description The notice for the gp to be at last arrival
     * @type {string}
     */
    NOTICE_GP_TO_BE_LAST_ARRIVAL = 'NOTICE_GP_TO_BE_FIRST_DEPARTURE',

    /**
     * @description The notice for the gp to be on way to destination
     * @type {string}
     */
    NOTICE_GP_TO_BE_ON_WAY_TO_DESTINATION = 'NOTICE_GP_TO_BE_ON_WAY_TO_DESTINATION',
}

/**
 * @interface Tasks
 * @description The structure of the tasks
 */
export interface Tasks {
    /**
     * @description The arguments of the task
     * @type {any}
     */
    args: any;

    /**
     * @description The name of the task
     * @type {TaskName}
     */
    name: TaskName,

    /**
     * @description The date of the task
     * @type {GhDateProperties}
     */
    date: GhDateProperties;
}

/**
 * @class GhTasksResolver
 * @description The base class for the tasks resolver
 */
@Injectable()
export abstract class GhTasksResolver implements Resolve<Tasks[]> {
  /**
  * @description The loading service
  * @returns {LoadingService}
  */
  private readonly loadingService: LoadingService = inject(LoadingService)

  /**
   * @description The requests service
   * @type {ClientRequestsService}
   */
  protected readonly requestsService = inject(ClientRequestsService);

  /**
  * @description The users service
  * @type {UsersService}
  */
  protected readonly userService: UsersService = inject(UsersService);

  /**
   * @description The navigation service
   * @type {NavigationService}
   */
  private readonly navigationService: NavigationService = inject(NavigationService);

  /**
   * @description A function that checks if the user is allowed to see the trip details
   * @type {(trip: ReportTrip) => Promise<boolean>}
   */
  abstract isUserAllowed: (trip :ReportTrip) => Promise<boolean>;

  /** @inheritdoc */
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Tasks[]> {
    this.loadingService.startLoading();
    const tripInfo = await this.requestsService.getTripInfo((<any>route.queryParams).id);
    const tasks = await this.requestsService.getTasks((<any>route.queryParams).id);
    if(!this.isUserAllowed(tripInfo)) {
      this.navigationService.redirectToMainPage()
      this.loadingService.endLoading();
      return undefined;
    }
    if(tripInfo) {
      this.loadingService.endLoading();
      return tasks;
    } else {
    this.navigationService.goToPreviousPage() 
      this.loadingService.endLoading();
      return undefined;
    }
  }
}