export class Business {

  private static readonly METERS_IN_MILE = 1609.34;
  /** Name of the business. */
  public name: string;
  /** Phone number for the business. */
  public phoneNumber: string;
  /** Distance from the current location. */
  public distance: string;
  /** URL Image for business. */
  public imageUrl: string;
  /** First line of the business address. */
  public basicAddress: string;
  /** Business rating. */
  public rating: number;
  /** Price of business. */
  public price: string;
  /** Yelp website URL */
  public yelpURL: string;

  public constructor(json) {
    this.name = json.name;
    this.phoneNumber = json.display_phone;
    this.distance = (json.distance/Business.METERS_IN_MILE).toFixed(1);
    this.imageUrl = json.image_url;
    this.basicAddress = json.location.address1;
    this.rating = json.rating;
    this.price = json.price;
    this.yelpURL = json.url;
  }

  public toLongString() {
    return this.name + "\n"
        + "\t" + this.basicAddress + "\n"
        + "\tDistance: " + this.distance + " miles\n"
        + "\tRating: " + this.rating + "\n"
        + "\tPrice: " + this.price + "\n"
        + "\tPhone: " + this.phoneNumber
  }

  public toShortString() {
    return this.name + "\n"
        + "\t" + this.basicAddress + "\n"
        + "\tDistance: " + this.distance + " meters\n"
  }
}
