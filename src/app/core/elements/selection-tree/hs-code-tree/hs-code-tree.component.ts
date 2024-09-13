import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, inject, Inject, QueryList, ViewChildren } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { HsCode } from "../../../../misc/constants/hs-code";
import { SelectFieldOption } from "../../input/select-field/select-field.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

/**
 * @interface AccordionItem
 * @description An interface for the accordion item
 */
interface AccordionItem {
    /**
     * @description The name of the accordion item
     * @type {string}
     */
    name: string;

    /**
     * @description The content of the accordion item
     * @type {SelectFieldOption[]}
     */
    content?: SelectFieldOption[];

    /**
     * @description The children of the accordion item
     * @type {AccordionItem[]}
     */
    children?: AccordionItem[];
  }

/**
 * @class GhHsCodeTreeComponent
 * @description The HS code tree component
 */
@Component({
    selector: 'gh-hs-code-tree',
    templateUrl: './hs-code-tree.component.html',
    styleUrls: ['./hs-code-tree.component.scss', '../../input/base-input-field.component.scss']
  })
  export class GhHsCodeTreeComponent implements AfterContentChecked {
    /**
     * @description The tree control for the HS code tree
     * @type {NestedTreeControl<AccordionItem>}
     */
    protected readonly accordionData: AccordionItem[] = HsCode;

    /**
     * @description The state of the pannel open
     * @type {boolean}
     */
    protected readonly pannelOpenState = HsCode.map(() => false);

    /**
     * @description The state of the sub pannel open
     * @type {boolean}
     */
    protected readonly subPannelOpenState = HsCode.map(x => x.children.map(() => false));

    /**
     * @description The search value
     * @type {string}
     */
    protected searchValue: string;

    /**
    * @description The change detector reference
    * @type {ChangeDetectorRef}
    */
    private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * @constructor
     * @param dialogRef The dialog reference 
     * @param data The data to be injected
     */
    constructor(
        public dialogRef: MatDialogRef<GhHsCodeTreeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string
      ) {}

    /** @inheritdoc */
    ngAfterContentChecked() {
        this.changeDetectorRef.detectChanges();
    }

      /**
       * @description A method that closes the dialog
       * @returns {void}
       */
      protected closeDialog(): void {
        this.dialogRef.close();
      }

      /**
       * @description A method that selects the code
       * @param code The code to be selected
       * @returns {void}
       */
      protected selectCode(code: string): void {
        this.dialogRef.close(code);
      }


      /**
       * @description A method that searches the HS code
       * @returns {void}
       */
      protected search(): void {
        const value = this.searchValue.toLowerCase().split(" ");
        const hsCode = this.accordionData.map(x => x.children.map(y => y.content)).flat(2);
        const filtered = hsCode.filter(x => value.every(y => x.label.toLowerCase().includes(y)));
        filtered.forEach((x,i) => {
            const chapter = x.value.substring(0,2);
            const chapterIndex = this.accordionData.findIndex(y => y.name.substring(0,2) === chapter);
            this.pannelOpenState[chapterIndex] = true;
            const heading = x.value.substring(0,4);
            const headingIndex = this.accordionData[chapterIndex].children.findIndex(y => y.name.substring(0,4) === heading);
            this.subPannelOpenState[chapterIndex][headingIndex] = true;
            if(i === 0) {
                setTimeout(() => document.getElementById("btn-"+x.value.substring(0,6)).focus(),100);
            }
        });
      }
  }