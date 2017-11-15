export class Business {

  private static readonly METERS_IN_MILE = 1609.34;
  private static readonly BLANK_IMAGE_PATH = "res://no-image.png"
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


  /**
   *  Constructor for the Business Entity
   *
   *  Pulls information from a JSON object defined by the Yelp
   *  Business Search API: https://www.yelp.com/developers/documentation/v3/business_search
   *
   */
  public constructor(json) {
    this.name = json.name;
    this.phoneNumber = json.display_phone;
    this.distance = (json.distance / Business.METERS_IN_MILE).toFixed(1);
    this.imageUrl = (json.image_url !== undefined && json.image_url) !== null ? json.image_url: Business.BLANK_IMAGE_PATH;
    this.basicAddress = json.location.address1;
    this.rating = json.rating;
    this.price = json.price;
    this.yelpURL = json.url;
  }

  /*
   *  Get long-format string information
   */
  public toLongString() {
    return this.name + "\n"
      + "\t" + this.basicAddress + "\n"
      + "\tDistance: " + this.distance + " miles\n"
      + "\tRating: " + this.rating + "\n"
      + "\tPrice: " + this.price + "\n"
      + "\tPhone: " + this.phoneNumber
  }

  /*
   *  Get short-format string information
   */
  public toShortString() {
    return this.name + "\n"
      + "\t" + this.basicAddress + "\n"
      + "\tDistance: " + this.distance + " meters\n"
  }
}
