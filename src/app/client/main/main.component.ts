import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

/**
 * @component ClientMainComponent
 * @description The main component for the client module
 */
@Component({
  selector: 'client-main',
  templateUrl: './main.component.html',
})
export class ClientMainComponent {
  /**
   * @description The activated route service
   * @type {ActivatedRoute}
   */
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  /**
   * @description An observable for the user info
   * @type {Observable<string>}
   */
  private readonly userInfo$ = this.route.data.pipe(map(data => data['userInfo']));

  /**
   * @description An observable for the user full name
   * @type {Observable<string>}
   */
  protected readonly userFullName$ = this.userInfo$.pipe(map(userInfo => userInfo.firstName + ' ' + userInfo.lastName));
}
