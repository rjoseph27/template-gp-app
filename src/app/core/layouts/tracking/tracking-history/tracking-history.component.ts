import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { TrackingPoint } from "../tracking.type";
import { BehaviorSubject } from "rxjs";
import { ColumnConfig } from "../../../elements/table/table.component";
import { COUNTRY_INFO_LIST } from "../../../../misc/constants/countries/countries";
import { GhDate, GhDateProperties } from "../../../../misc/classes/gh-date";

/**
 * @class GhTrackingHistoryComponent
 * @description The tracking history component
 */
@Component({
    selector: 'gh-tracking-history',
    templateUrl: './tracking-history.component.html',
    styleUrls: ['./tracking-history.component.scss']
  })
  export class GhTrackingHistoryComponent implements OnInit {
    /**
     * @description The history of the tracking
     * @type {TrackingPoint[]}
     */
    @Input() history: TrackingPoint[]

    /**
     * @description The backing field for the columns
     * @type {BehaviorSubject<ColumnConfig[]>}
     */
    private readonly _columns$ = new BehaviorSubject<ColumnConfig[]>(undefined);

    /**
     * @description The columns
     * @type {Observable<ColumnConfig[]>}
     */
    protected readonly columns$ = this._columns$.asObservable();

    /**
     * @description The date template
     * @type {TemplateRef<any>}
     */
    @ViewChild('dateTemplate', { static: true }) dateTemplate: TemplateRef<any>;

    /**
     * @description The message template
     * @type {TemplateRef<any>}
     */
    @ViewChild('messageTemplate', { static: true }) messageTemplate: TemplateRef<any>;
    
    /** @inheritdoc */
    ngOnInit(): void {
            this._columns$.next([          
            {
                columnName: "tracking.history.table.date",
                valueAccessor: (row: TrackingPoint) => new GhDate(row.date)
                  .setTimeZone(new Date().getTimezoneOffset())
                  .getDate(),
                template: this.dateTemplate
            },
            {
                columnName: "tracking.history.table.message",
                valueAccessor: (row: TrackingPoint) => row.type,
                template: this.messageTemplate
            },
        ])
    }

    /**
    * @description Transforms a GhDateProperties object into a Date object
    * @param date The date to transform
    * @returns {Date}
    */
    protected getDate(date: GhDateProperties): Date {
        return new Date(date.year, date.month, date.day);
      }

    /**
     * @description Get the country of a city
     * @param city The city
     * @returns {string}
     */
    protected getCountry(city: string): string {
        return COUNTRY_INFO_LIST.find(x => x.regions.find(z => z === city)).name
    }
  }