import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { COUNTRY_INFO_LIST } from "../../misc/constants/countries/countries";
import { Country } from "../../misc/enums/country.enum";
import { SuccursaleInfo } from "../../misc/constants/countries/countries.type";

/**
 * @interface SuccursaleByCountry
 * @description The succursale by country
 */
interface SuccursaleByCountry {
    /**
     * @description The country
     * @type {Country}
     */
    country: Country,

    /**
     * @description The regions
     * @type {[any, SuccursaleInfo][]}
     */
    regions: [any, SuccursaleInfo][]
}

/**
 * @component PartnerRegisterItemComponent
 * @description The register item component for the partner module
 */
@Component({
    selector: 'partner-register-item',
    templateUrl: './register-item.component.html',
    styleUrls: ['./register-item.component.scss']
  })
  export class PartnerRegisterItemComponent {
    /**
    * @description The activated route service
    * @type {ActivatedRoute}
    */
    private readonly route: ActivatedRoute = inject(ActivatedRoute);

    /**
    * @description An observable for the user info
    * @type {Observable<string>}
    */
    private readonly userInfo$ = this.route.data.pipe(map(data => data['userInfo']))

    /**
     * @description An observable for the user country
     * @type {Observable<Country>}
     */
    protected readonly country$ = this.userInfo$.pipe(map(userInfo => this.succursaleByCountry.find(x => x.regions.find(z => z[1].name === userInfo.succursale)).country)); 

    /**
     * @description The list of succursale by country
     * @type {SuccursaleByCountry[]}
     */
    private readonly succursaleByCountry = COUNTRY_INFO_LIST.map(x => ({
        country: x.name,
        regions: Array.from(x.succursales)
    }));
  }  