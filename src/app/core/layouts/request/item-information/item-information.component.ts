import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IMAGE_FORMAT_VALIDATION, imageFormatValidator } from "../../../../misc/validation/image-format.validator";
import { IMAGE_SIZE_VALIDATION, imageSizeValidator } from "../../../../misc/validation/image-size.validator";
import { MAX_VALIDATION, MIN_VALIDATION, REQUIRED_VALIDATION } from "../../../../misc/constants/validations";
import { GroupedSelectFieldOption } from "../../../elements/input/select-field/select-field.component";
import { LIST_ITEM_CATEGORY_OPTION } from "../../../../misc/constants/item-category";
import { ItemCategory } from "../../../../misc/enums/item-category.enum";
import { MAX_LUGGAGE_WEIGHT } from "../../../../misc/constants/application";
import { FormMode } from "../../../../misc/enums/form-mode.enum";
import { ModalService } from "../../../../services/modal.service";
import { GhFile } from "../../../elements/input/upload-image/upload-image.component";
import { ITEM_INFORMATION_IMAGE_FOLDER, ImageUtil } from "../../../../misc/util/image.util";
import { ItemsStatus } from "../../../../client/orders/base-orders.component";
import { INTEGER_VALIDATION, integerValidator } from "../../../../misc/validation/integer.validator";


/**
 * @interface ItemInformation
 * @description The type of the item information
 */
export interface ItemInformation {
  /**
   * @description The id of the item information
   * @type {number}
   */
  id?: number;

  /**
   * @description The image of the item
   * @type {File}
   */
  image: File;

  /**
   * @description The name of the item
   * @type {string}
   */
  itemName: string;

  /**
   * @description The category of the item
   * @type {ItemCategory}
   */
  itemCategory: ItemCategory;

  /**
   * @description The status of the item
   * @type {ItemsStatus}
   */
  status?: ItemsStatus;

  /**
   * @description The weight of the item
   * @type {number}
   */
  itemWeight: number;

  /**
   * @description The quantity of the item
   * @type {ItemSize}
   */
  itemQuantity: number;

  /**
   * @description The extra notes of the item
   * @type {string}
   */
  extraNotes: string;

  /**
   * @description The reason for shipping the item
   * @type {string}
   */
  reasonShipping: string;
}

/**
 * @type ItemInformationForm
 * @description The type of the item information form
 */
type ItemInformationForm = FormGroup<
  { image: FormControl<GhFile>; 
    itemName: FormControl<string>; 
    itemCategory: FormControl<string>; 
    itemWeight: FormControl<number>; 
    itemQuantity: FormControl<number>;
    extraNotes: FormControl<string>; 
    reasonShipping: FormControl<string>;
  }>;

/**
  * @interface ItemInformationBody
  * @description The type of the item information body 
  */
interface ItemInformationBody {
  /**
   * @description The id of the item information
   * @type {number}
   */
  id: number;

  /**
   * @description The form mode of the item information
   * @type {FormMode}
   */
  formMode: FormMode;

  /**
   * @description The item information
   * @type {ItemInformationForm}
   */
  itemInformation: ItemInformationForm;

  /**
   * @description The item information cache
   * @type {ItemInformation}
   */
  cache?: ItemInformationForm;
}

/**
 * @class GhItemInformationComponent
 * @description The item information component for the application
 */
@Component({
  selector: 'gh-item-information',
  templateUrl: './item-information.component.html',
  styleUrl: './item-information.component.scss',
  providers: [ModalService]
})
export class GhItemInformationComponent implements OnInit {
  /**
   * @description The item information list
   * @type {ItemInformationBody[]}
   */
  protected readonly itemInformationList: ItemInformationBody[] = [];

  /**
   * @description The modal service
   * @type {ModalService}
   */
  private readonly modalService: ModalService = inject(ModalService);

  /**
   * @description The form mode
   * @type {FormMode}
   */
  protected readonly formMode = FormMode;

  /**
   * @description The name of the upload image field
   * @type {string}
   */
  protected readonly imageField = "image";

  /**
   * @description The name of the item name field
   * @type {string}
   */
  protected readonly itemNameField = "itemName"

  /**
   * @description The name of the item category field
   * @type {string}
   */
  protected readonly itemCategoryField = "itemCategory";

  /**
   * @description The name of the item weight field
   * @type {string}
   */
  protected readonly itemWeightField = "itemWeight"

  /**
   * @description The name of the item quantity field
   * @type {string}
   */
  protected readonly itemQuantityField = "itemQuantity"

  /**
   * @description The name of the extra notes field
   * @type {string}
   */
  protected readonly extraNotesField = "extraNotes";

  /**
   * @description The name of the reason shipping field
   * @type {string}
   */
  protected readonly reasonShippingField = "reasonShipping";

  /**
   * @description The maximum luggage weight
   * @type {number}
   */
  protected readonly maxLuggageWeight = MAX_LUGGAGE_WEIGHT;

  /**
   * @description A boolean to indicate if the item information is editable
   * @type {boolean}
   */
  @Input() isEditable = true;

  /**
   * @description The error messages of the upload image field
   */
  protected readonly imageErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.itemInformation.uploadPhoto.errors.required"],
    [IMAGE_FORMAT_VALIDATION, "global.itemInformation.uploadPhoto.errors.format"],
    [IMAGE_SIZE_VALIDATION, "global.itemInformation.uploadPhoto.errors.size"]
  ]);

  /**
   * @description The error messages of the item name field
   * @type {Map<string, string>}
   */
  protected readonly itemNameErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.itemInformation.itemName.errors.required"]
  ]);

  /**
   * @description The error messages of the item category field
   * @type {Map<string, string>}
   */
  protected readonly itemCategoryErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.itemInformation.itemCategory.errors.required"]
  ]);

  /**
   * @description The error messages of the item weight field
   * @type {Map<string, string>}
   */
  protected readonly itemWeightErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.itemInformation.itemWeight.errors.required"],
    [MAX_VALIDATION, "global.itemInformation.itemWeight.errors.max"],
    [MIN_VALIDATION, "global.itemInformation.itemWeight.errors.min"]
  ]);

  /**
   * @description The error messages of the item quantity field
   * @type {Map<string, string>}
   */
  protected readonly itemQuantityErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "global.itemInformation.itemQuantity.errors.required"],
    [INTEGER_VALIDATION, "global.itemInformation.itemQuantity.errors.integer"],
    [MIN_VALIDATION, "global.itemInformation.itemQuantity.errors.min"]
  ]);

  /**
   * @description The item information select options
   * @type {GroupedSelectFieldOption[]}
   */
  protected itemInformationSelectOptions: GroupedSelectFieldOption[] = LIST_ITEM_CATEGORY_OPTION

  /**
   * @description The event emitter for the item information change
   * @type {EventEmitter<ItemInformation[]>}
   */
  @Output() itemInformationChange = new EventEmitter<ItemInformation[]>();

  /**
   * @description The item information
   * @type {ItemInformation[]}
   */
  @Input() itemInformation: ItemInformation[];

  /**
   * @description A boolean to indicate if the user can add or delete an item information
   * @type {boolean}
   */
  @Input() canAddOrDelete: boolean = true;
  
  /** @inheritdoc */
  ngOnInit(): void {
    if(this.itemInformation) {
      this.itemInformation.forEach(x => this.addNewItemInformation(x));
    }
    if(this.isEditable && this.canAddOrDelete) {
      this.addNewItemInformation();
    } 
  }

  /**
   * @description The method that updates the item information
   * @returns void
   */
  private updateItemInformation() {
    const list = this.itemInformationList.map(x => x.itemInformation.value as ItemInformation);
    this.itemInformationChange.emit(list as ItemInformation[]);
  }
  

  /**
   * @description The method that adds a new item information
   * @param itemInformation The item information
   * @returns void
   */
  private addNewItemInformation(itemInformation?: ItemInformation) {
    let image;
    if(itemInformation?.image) {
      if(typeof itemInformation.image === "string") {
        image = <GhFile>{};
        image.tempUrl = ImageUtil.getImageLink(ITEM_INFORMATION_IMAGE_FOLDER, itemInformation.image);
      } else {
        image = itemInformation.image;
      }    
    }

    const newItem: ItemInformationBody = {
      id: this.itemInformationList.length,
      formMode: itemInformation ? FormMode.VIEW : FormMode.CREATE,
      itemInformation: new FormGroup({
          image: new FormControl(image || <GhFile>{}, [Validators.required, imageFormatValidator, imageSizeValidator]),
          itemName: new FormControl(itemInformation?.itemName, [Validators.required]),
          itemCategory: new FormControl(itemInformation?.itemCategory as string, [Validators.required]),
          itemWeight: new FormControl(itemInformation?.itemWeight, [Validators.required, Validators.min(0.0001), Validators.max(MAX_LUGGAGE_WEIGHT)]),
          itemQuantity: new FormControl(itemInformation?.itemQuantity || 1, [Validators.required, Validators.min(1), integerValidator]),
          extraNotes: new FormControl(itemInformation?.extraNotes),
          reasonShipping: new FormControl(itemInformation?.reasonShipping, [Validators.required])
        })
    };

    this.itemInformationList.push(newItem)
  }

  /**
   * @description The method to save an item information
   * @param itemInformation The new item information
   * @returns void
   */
  protected saveItemInformation(itemInformation: ItemInformationBody) {
    itemInformation.formMode = FormMode.VIEW;
    this.updateItemInformation();
    this.addNewItemInformation();
  }

  /**
   * @description Set the form mode to edit
   * @param itemInformation The item information to edit
   * @returns void
   */
  protected goToEditMode(itemInformation: ItemInformationBody) {
    itemInformation.formMode = FormMode.EDIT;
    itemInformation.cache = itemInformation.itemInformation;
  }

  /**
   * @description Edit an item information
   * @param itemInformation The item information to edit
   * @returns void
   */
  protected editItemInformation(itemInformation: ItemInformationBody) {
    itemInformation.formMode = FormMode.VIEW;
    this.itemInformationList[itemInformation.id] = itemInformation;
    itemInformation.cache = undefined;
    this.updateItemInformation()
  }

  /**
   * @description The method to cancel an item information edit
   * @param itemInformation The item information to cancel
   * @returns void
   */
  protected cancelEditItemInformation(itemInformation: ItemInformationBody) {
    this.modalService.openModal({
      title: "global.itemInformation.modal.cancel.title",
      text: "global.itemInformation.modal.cancel.content",
      confirmCaption: "global.common.cancel",
      cancelCaption: "global.itemInformation.modal.cancel.button.stay"
    }).then(x => {
      if(x) {
        itemInformation.itemInformation = itemInformation.cache;
        itemInformation.formMode = FormMode.VIEW;
        itemInformation.cache = undefined;
        this.updateItemInformation();
      }
    });
  }

  /**
   * @description The method to delete an item information
   * @param itemInformation The item information to delete
   * @returns void
   */
  protected deleteItemInformation(itemInformation: ItemInformationBody) {
    this.modalService.openModal({
      title: "global.itemInformation.modal.delete.title",
      text: "global.itemInformation.modal.delete.content",
      confirmCaption: "global.common.delete",
      cancelCaption: "global.common.cancel"
    }).then(x => {
      if(x) {
        const index = this.itemInformationList.findIndex(x => x.id === itemInformation.id);
        this.itemInformationList.splice(index, 1);
        this.updateItemInformation();
      }
    });
  }
}
