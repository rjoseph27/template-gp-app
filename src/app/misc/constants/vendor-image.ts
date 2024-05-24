/**
 * @description Get the vendor image
 * @type {object}
 */
export const VENDOR_IMAGE = {
    "GP_HUB": (filename: string) => "https://firebasestorage.googleapis.com/v0/b/gp-hub-test-server.appspot.com/o/items%2F"+filename+"?alt=media&token=1cd71787-e61a-4238-ac6e-e7103397a8e5",
    "SUNUZON_FR": (filename: string) => "https://m.media-amazon.com/images/I/"+filename
}