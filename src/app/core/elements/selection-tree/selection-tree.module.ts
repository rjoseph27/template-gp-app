import { NgModule } from "@angular/core";
import { GhHsCodeTreeComponent } from "./hs-code-tree/hs-code-tree.component";
import { GhSelectionTreeComponent } from "./selection-tree.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';


/**
 * @module SelectionTreeModule
 * @description The selection tree module
 */
@NgModule({
    declarations: [
        GhHsCodeTreeComponent,
        GhSelectionTreeComponent
    ],
    imports: [
      CommonModule,
      TranslateModule,
      FormsModule,
      MatIconModule,
      MatExpansionModule
    ],
    exports: [
        GhSelectionTreeComponent
    ]
  })
  export class SelectionTreeModule { }