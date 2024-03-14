import { AfterContentChecked, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { COUNTRY_INFO_LIST } from '../../misc/constants/countries/countries';
import { ClientRoutes } from '../../client.route';

/**
 * @class ClientAlertListComponent
 * @description The alert list component
 */
@Component({
    selector: 'client-alert-list',
    templateUrl: './alert-list.component.html',
    styleUrls: ['./alert-list.component.scss']
})
  export class ClientAlertListComponent implements AfterContentChecked {
   /**
   * @description The activated route service
   * @type {ActivatedRoute}
   */
    private readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * @description An observable for the currency
     * @type {Observable<Currency>}
     */
    protected readonly currency$ = this.route.data.pipe(map(data => COUNTRY_INFO_LIST.find(x => x.name === data['userInfo'].country).currency.currency));

    /**
     * @description An observable for the alert list
     * @type {Observable<AlertTableElement[]>}
     */
    protected readonly alertList$ = this.route.data.pipe(map(data => data['alertList']));

    /**
    * @description The change detector reference
    * @type {ChangeDetectorRef}
    */
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
    * @description The angular router service.
    * @type {Router}
    */
    private readonly router: Router = inject(Router);

    /** @inheritdoc */
    ngAfterContentChecked() {
      this.changeDetectorRef.detectChanges();
    }

    /**
     * @description Create an alert
     * @returns {void}
     */
    protected createAlert() {
      this.router.navigate([ClientRoutes.createAlert.fullPath()])
    }
  }