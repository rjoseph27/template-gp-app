import { AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DELETE_ICON } from '../../../misc/constants/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @interface ColumnConfig
 * @description The column configuration
 */
export interface ColumnConfig {
    /**
     * @description The name of the column
     * @type {string}
     */
    columnName: string;

    /**
     * @description The value accessor for the column
     * @type {(row: any) => any}
     */
    valueAccessor: (row: any) => any;

    /**
     * @description The template for the column
     * @type {TemplateRef<any>}
     */
    template?: TemplateRef<any>;
}

/**
 * @class GhTableComponent
 * @description The table component
 */
@Component({
  selector: 'gh-table',
  templateUrl: 'table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class GhTableComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * @description The data source for the table
   * @type {MatTableDataSource<any>}
   */
  protected readonly dataSource = new MatTableDataSource<any>(/* Your data array */);
  
  /**
   * @description The backing store columns$
   * @type {BehaviorSubject<ColumnConfig[]>}
   */
  private readonly _columns$: BehaviorSubject<ColumnConfig[]> = new BehaviorSubject<ColumnConfig[]>([]);

  /**
   * @description The label of the table
   * @type {string}
   */
  @Input() label: string;

  /**
   * @description The backing store elements$
   * @type {BehaviorSubject<any>}
   */
  private readonly _elements$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  /**
   * @description The observable for the elements for the table
   * @type {Observable<any>}
   */
  protected readonly elements$: Observable<any> = this._elements$.asObservable();

  /**
   * @description The observable for the columns for the table
   * @type {Observable<ColumnConfig[]>}
   */
  protected readonly columns$: Observable<ColumnConfig[]> = this._columns$.asObservable();

  /**
   * @description The paginator for the table
   * @type {MatPaginator}
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * @description A boolean to determine if the elements of the table can delete
   * @type {boolean}
   */
  @Input() canDelete: boolean = false;

  /**
   * @description A boolean to determine if the elements of the table can add
   * @type {boolean}
   */
  @Input() canAdd: boolean = false;

  /**
   * @description The columns for the table
   */
  @Input() set columns(value: ColumnConfig[]) {
    if(this.canDelete) {
      value.push({
        columnName: 'global.common.delete',
        valueAccessor: () => null,
        template: this.canDeleteTemplate
      });
    }
    this._columns$.next(value);
  }
  
  /**
   * @description The icon for the delete icon.
   * @type {string}
   */
  protected readonly deleteIcon: string = DELETE_ICON;

  /**
   * @description The observable for the column names
   * @type {Observable<string[]>}
   */
  protected columnNames$: Observable<string[]> = this._columns$.pipe(map(column => column.map(col => col.columnName)));

  /**
   * @description The id property for the table
   * @type {string}
   */
  @Input() idProperty: string;

  /**
   * @description The elements of the table
   * @type {any}
   */
  @Input() set elements(value: any) {
    this._elements$.next(value);
    this.dataSource.data = value;
  } 
  get elements(): any {
    return this._elements$.getValue();
  }

  /**
   * @description The event emitter for the elements
   * @type {EventEmitter<any>}
   */
  @Output() elementsChange = new EventEmitter<any>();

  /**
   * @description The template for the empty table
   * @type {TemplateRef<any>}
   */
  @Input() emptyTemplate: TemplateRef<any>;

  /**
   * @description The item factory to create a new element
   * @type {() => any}
   */
  @Input() itemFactory: () => any;

  /**
   * @description The delete factory to delete an element
   * @type {(element: any) => void}
   */
  @Input() deleteFactory: (element: any) => void;

  /**
   * @description The template for the delete button
   * @type {TemplateRef<any>}
   */
  @ViewChild('canDeleteTemplate', { static: true }) canDeleteTemplate: TemplateRef<any>;

  /**
   * @description Deletes an element from the table
   * @param index The index of the element to delete
   * @returns {void}
   */
  protected deleteElement(element: any): void {
    this.elements = this.elements.filter((e: any) => e[this.idProperty] !== element[this.idProperty]);
    this.deleteFactory(element);
    this.elementsChange.emit(this.elements);
  }

  /**
   * @description Adds an element to the table
   * @returns {void}
   */
  protected add() {
    this.elements = [...this.elements, this.itemFactory()];
    this.elementsChange.emit(this.elements);
  }
}
