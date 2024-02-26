import { Component } from "@angular/core";
import { FileType } from "../../../elements/input/upload-image/upload-image.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IMAGE_FORMAT_VALIDATION, imageFormatValidator } from "../../../../misc/validation/image-format.validator";
import { IMAGE_SIZE_VALIDATION, imageSizeValidator } from "../../../../misc/validation/image-size.validator";
import { MAX_VALIDATION, MIN_VALIDATION, REQUIRED_VALIDATION } from "../../../../misc/constants/validations";
import { GroupedSelectFieldOption } from "../../../elements/input/select-field/select-field.component";
import { LIST_ITEM_CATEGORY } from "../../../../misc/constants/item-category";
import { ItemCategory } from "../../../../misc/enums/item-category.enum";
import { EnumUtil } from "../../../../misc/util/enum.util";
import { MAX_LUGGAGE_WEIGHT } from "../../../../misc/constants/application";

/**
 * @interface ItemInformation
 * @description The item information interface
 */
interface ItemInformation {
  /**
   * @description The image of the item
   * @type {FileType}
   */
  image: FileType;

  /**
   * @description The name of the item
   * @type {string}
   */
  name:string;
}

/**
 * @class GhItemInformationComponent
 * @description The item information component for the application
 */
@Component({
  selector: 'gh-item-information',
  templateUrl: './item-information.component.html',
  styleUrl: './item-information.component.scss',
})
export class GhItemInformationComponent {
  protected readonly itemInformationForm = new FormGroup({
    image: new FormControl(<File>{}, [Validators.required, imageFormatValidator, imageSizeValidator]),
    itemName: new FormControl('', [Validators.required]),
    itemCategory: new FormControl('', [Validators.required]),
    itemWeight: new FormControl(undefined, [Validators.required, Validators.min(0), Validators.max(MAX_LUGGAGE_WEIGHT)]),
    itemQuantity: new FormControl(undefined, [Validators.required, Validators.min(1)]),
    itemSize: new FormGroup({
      depth: new FormControl(undefined, [Validators.required, Validators.min(0)]),
      width: new FormControl(undefined, [Validators.required, Validators.min(0)]),
      height: new FormControl(undefined, [Validators.required, Validators.min(0)])
    }),
    extraNotes: new FormControl(''),
    reasonShipping: new FormControl('', [Validators.required])
  });

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
}
