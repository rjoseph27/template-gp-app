import { AfterContentChecked, ChangeDetectorRef, Directive, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CurrentFormService } from "../../services/current-form.service";
import { UsersService } from "../../services/users.service";
import { COUNTRY_INFO_LIST } from "../../misc/constants/countries/countries";

/**
 * @class BaseRequestComponent
 * @description The base request component
 */
@Directive()
export class BaseRequestComponent implements AfterContentChecked {
  /**
   * @description The activated route service
   * @type {ActivatedRoute}
   */
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);

  /**
   * @description The router service
   * @type {Router}
   */
  protected readonly router: Router = inject(Router);
 
  /**
   * @description The country of the user
   * @type {string}
   */
  protected readonly userCountry = this.route.snapshot.data['userInfo'].country;

  /**
   * @description The currency of the user
   * @type {string}
   */
  protected readonly currency = COUNTRY_INFO_LIST.find(x => x.name === this.userCountry).currency;

  /**
   * @description The users service
   * @type {UsersService}
   */
  protected readonly usersService = inject(UsersService); 

  /**
   * @description The current form service
   * @type {CurrentFormService}
   */
  protected readonly currentFormService: CurrentFormService = inject(CurrentFormService);

  /**
   * @description The change detector reference
   * @type {ChangeDetectorRef}
  */
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  /** @inheritdoc */
  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }
}