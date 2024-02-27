import { Component, EventEmitter, Output, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IMAGE_FORMAT_VALIDATION, imageFormatValidator } from "../../../../misc/validation/image-format.validator";
import { IMAGE_SIZE_VALIDATION, imageSizeValidator } from "../../../../misc/validation/image-size.validator";
import { MAX_VALIDATION, MIN_VALIDATION, REQUIRED_VALIDATION } from "../../../../misc/constants/validations";
import { GroupedSelectFieldOption } from "../../../elements/input/select-field/select-field.component";
import { LIST_ITEM_CATEGORY } from "../../../../misc/constants/item-category";
import { ItemCategory } from "../../../../misc/enums/item-category.enum";
import { EnumUtil } from "../../../../misc/util/enum.util";
import { MAX_LUGGAGE_WEIGHT } from "../../../../misc/constants/application";
import { FormMode } from "../../../../misc/enums/form-mode.enum";
import { ModalService } from "../../../../services/modal.service";


/**
 * @interface ItemInformation
 * @description The type of the item information
 */
export interface ItemInformation {
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
   * @description The dimension of the item
   * @type {ItemSize}
   */
  itemSize: ItemSize;

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
 * @interface ItemSize
 * @description The type of the item size
 */
interface ItemSize {
  /**
   * @description The width of the item
   * @type {number}
   */
  width: number;

  /**
   * @description The height of the item
   * @type {number}
   */
  height: number;

  /**
   * @description The depth of the item
   * @type {number}
   */
  depth: number;
}

/**
 * @type ItemInformationForm
 * @description The type of the item information form
 */
type ItemInformationForm = FormGroup<
  { image: FormControl<File>; 
    itemName: FormControl<string>; 
    itemCategory: FormControl<string>; 
    itemWeight: FormControl<number>; 
    itemQuantity: FormControl<number>; 
    itemSize: FormGroup<
      { depth: FormControl<any>; 
        width: FormControl<any>; 
        height: FormControl<any>; }>; 
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
export class GhItemInformationComponent {
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
   * @description The name of the item size field
   * @type {string}
   */
  private readonly itemSizeField = "itemSize";

  /**
   * @description The name of the item size width field
   * @type {string}
   */
  protected readonly widthField = this.itemSizeField+".width";

  /**
   * @description The name of the item size height field
   * @type {string}
   */
  protected readonly heightField = this.itemSizeField+".height";

  /**
   * @description The name of the item size depth field
   * @type {string}
   */
  protected readonly depthField = this.itemSizeField+".depth";

  /**
   * @description The maximum luggage weight
   * @type {number}
   */
  protected readonly maxLuggageWeight = MAX_LUGGAGE_WEIGHT;

  /**
   * @description The error messages of the upload image field
   */
  protected readonly imageErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.uploadPhoto.errors.required"],
    [IMAGE_FORMAT_VALIDATION, "moduleList.client.sendItems.content.itemInformation.uploadPhoto.errors.format"],
    [IMAGE_SIZE_VALIDATION, "moduleList.client.sendItems.content.itemInformation.uploadPhoto.errors.size"]
  ]);

  /**
   * @description The error messages of the item name field
   * @type {Map<string, string>}
   */
  protected readonly itemNameErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemName.errors.required"]
  ]);

  /**
   * @description The error messages of the item category field
   * @type {Map<string, string>}
   */
  protected readonly itemCategoryErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemCategory.errors.required"]
  ]);

  /**
   * @description The error messages of the item weight field
   * @type {Map<string, string>}
   */
  protected readonly itemWeightErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemWeight.errors.required"],
    [MAX_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemWeight.errors.max"],
    [MIN_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemWeight.errors.min"]
  ]);

  /**
   * @description The error messages of the item width field
   * @type {Map<string, string>}
   */
  protected readonly itemWidthErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemSize.width.errors.required"],
    [MIN_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemSize.width.errors.min"]
  ]);

  /**
   * @description The error messages of the item height field
   * @type {Map<string, string>}
   */
  protected readonly itemHeightErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemSize.height.errors.required"],
    [MIN_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemSize.height.errors.min"]
  ]);

  /**
   * @description The error messages of the item depth field
   * @type {Map<string, string>}
   */
  protected readonly itemDepthErrorCaptions = new Map<string, string>([
    [REQUIRED_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemSize.depth.errors.required"],
    [MIN_VALIDATION, "moduleList.client.sendItems.content.itemInformation.itemSize.depth.errors.min"]
  ]);

  /**
   * @description The item information select options
   * @type {GroupedSelectFieldOption[]}
   */
  protected itemInformationSelectOptions: GroupedSelectFieldOption[] = LIST_ITEM_CATEGORY.map(category => {
    return {
      label: category.name,
      options: Object.values(ItemCategory)
      .filter(x => x[0] === category.prefix)
      .map((key: string) => ({label: EnumUtil.getKeyByValue(ItemCategory, key), value: key}))
    }
  })

  /**
   * @description The event emitter for the item information change
   * @type {EventEmitter<ItemInformation[]>}
   */
  @Output() itemInformationChange = new EventEmitter<ItemInformation[]>();

  /**
   * @constructor
   */
  constructor() {
    this.addNewItemInformation();
  }

  /**
   * @description The method that updates the item information
   * @returns void
   */
  private updateItemInformation() {
    const list = this.itemInformationList.map(x => x.itemInformation.value as ItemInformation)
    list.pop();
    this.itemInformationChange.emit(list);
  }

  /**
   * @description The method that creates a new form factory
   * @param itemInformation The item information form
   * @returns The form group
   */
  private newFormFactory(itemInformation?: ItemInformationForm): FormGroup {
    return new FormGroup({
      image: new FormControl(itemInformation?.get(this.imageField).value || <File>{}, [Validators.required, imageFormatValidator, imageSizeValidator]),
      itemName: new FormControl(itemInformation?.get(this.itemNameField).value || '', [Validators.required]),
      itemCategory: new FormControl(itemInformation?.get(this.itemCategoryField).value || '', [Validators.required]),
      itemWeight: new FormControl(itemInformation?.get(this.itemWeightField).value || undefined, [Validators.required, Validators.min(0), Validators.max(MAX_LUGGAGE_WEIGHT)]),
      itemQuantity: new FormControl(itemInformation?.get(this.itemQuantityField).value || 1, [Validators.required, Validators.min(1)]),
      itemSize: new FormGroup({
        depth: new FormControl(itemInformation?.get(this.depthField).value || undefined, [Validators.required, Validators.min(0)]),
        width: new FormControl(itemInformation?.get(this.widthField).value || undefined, [Validators.required, Validators.min(0)]),
        height: new FormControl(itemInformation?.get(this.heightField).value || undefined, [Validators.required, Validators.min(0)])
      }),
      extraNotes: new FormControl(itemInformation?.get(this.extraNotesField).value || ''),
      reasonShipping: new FormControl(itemInformation?.get(this.reasonShippingField).value || '', [Validators.required])
    });
  }

  /**
   * @description The method that adds a new item information
   * @returns void
   */
  private addNewItemInformation() {
    const newItem: ItemInformationBody = {
      id: this.itemInformationList.length,
      formMode: FormMode.CREATE,
      itemInformation: this.newFormFactory()
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
    this.addNewItemInformation();
    this.updateItemInformation();
  }

  /**
   * @description Set the form mode to edit
   * @param itemInformation The item information to edit
   * @returns void
   */
  protected goToEditMode(itemInformation: ItemInformationBody) {
    itemInformation.formMode = FormMode.EDIT;
    itemInformation.cache = this.newFormFactory(itemInformation.itemInformation);
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
      title: "moduleList.client.sendItems.content.itemInformation.modal.cancel.title",
      text: "moduleList.client.sendItems.content.itemInformation.modal.cancel.content",
      confirmCaption: "global.common.cancel",
      cancelCaption: "moduleList.client.sendItems.content.itemInformation.modal.cancel.button.stay"
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
      title: "moduleList.client.sendItems.content.itemInformation.modal.delete.title",
      text: "moduleList.client.sendItems.content.itemInformation.modal.delete.content",
      confirmCaption: "global.common.delete",
      cancelCaption: "global.common.cancel"
    }).then(x => {
      if(x) {
        this.itemInformationList.splice(itemInformation.id, 1);
        this.updateItemInformation();
      }
    });
  }
}
