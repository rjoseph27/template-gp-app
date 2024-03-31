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
   * @description A boolean to determine if the elements of the table can edit
   * @type {boolean}
   */
  @Input() canEdit: boolean = false;

  /**
   * @description A boolean to determine if the elements of the table can be viewed
   * @type {boolean}
   */
  @Input() canView: boolean = false;

  /**
   * @description The page size for the table
   * @type {number}
   */
  @Input() pageSize = 5

  /**
   * @description A boolean to determine if the elements of the table can add
   * @type {boolean}
   */
  @Input() canAdd: boolean = false;

  /**
   * @description A boolean to determine if the elements of the table can select
   * @type {boolean}
   */
  @Input() canSelect: boolean = false;

  /**
   * @description The columns for the table
   */
  @Input() set columns(value: ColumnConfig[]) {
    this._columns$.next(value);
    if(this.canSelect) {
      this._columns$.next([{
        columnName: 'global.common.select',
        valueAccessor: () => null,
        template: this.selectTemplate
      }, ...(value || [])])
    }
    if(this.canDelete || this.canEdit || this.canView) {
      this._columns$.next([...(this._columns$.value || []), {
        columnName: 'global.common.action',
        valueAccessor: () => null,
        template: this.actionTemplate
      }])
    }
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
   * @description The selected elements
   * @type {any[]}
   */
  protected selectedElements: any[] = [];

  /**
   * @description An event emitter for the selected elements
   * @type {EventEmitter<any[]>}
   */
  @Output() selectedElementsChange = new EventEmitter<any[]>();

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
    this.selectedElements = [];
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
   * @type {(element: any) => Promise<boolean>}
   */
  @Input() deleteFactory: (element: any) => Promise<boolean>;

  /**
   * @description The edit factory to edit an element
   * @type {(element: any) => void}
   */
  @Input() editFactory: (element: any) => void;

  /**
   * @description The view factory to view an element
   * @type {(element: any) => void}
   */
  @Input() viewFactory: (element: any) => void;

  /**
   * @description The template for the action buttons
   * @type {TemplateRef<any>}
   */
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;

  /**
   * @description The template for the select box
   * @type {TemplateRef<any>}
   */
  @ViewChild('selectTemplate', { static: true }) selectTemplate: TemplateRef<any>;

  /** @inheritdoc */
  ngAfterViewInit(): void {
    if(this.canDelete || this.canEdit || this.canView) {
      this._columns$.next([...(this._columns$.value || []), {
        columnName: 'global.common.action',
        valueAccessor: () => null,
        template: this.actionTemplate
      }])
    }

    this.dataSource.paginator = this.paginator;
  }

  /**
   * @description Deletes an element from the table
   * @param index The index of the element to delete
   * @returns {void}
   */
  protected async deleteElement(element: any): Promise<void> {
    const isDeleted = await this.deleteFactory(element);
    if(isDeleted) {
      this.elements = this.elements.filter((e: any) => e[this.idProperty] !== element[this.idProperty]);
      this.elementsChange.emit(this.elements);
    }
  }

  /**
   * @description Adds or removes an element from the selected elements
   * @param add Whether to add or remove the element
   * @param element The element to add or remove
   * @returns {void}
   */
  protected addRemoveSelectedElement(add: boolean, element: any): void {
    if(add) {
      this.selectedElements.push(element);
    } else {
      this.selectedElements = this.selectedElements.filter(e => e[this.idProperty] !== element[this.idProperty]);
    }
    this.selectedElementsChange.emit(this.selectedElements);
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
