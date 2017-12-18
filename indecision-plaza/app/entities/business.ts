import { LangUtils } from "../common/LangUtils"
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


  /**
   *  Constructor for the Business Entity
   *
   *  Pulls information from a JSON object defined by the Yelp
   *  Business Search API: https://www.yelp.com/developers/documentation/v3/business_search
   *
   */
  public constructor(json) {
    this.name = LangUtils.exists(json.name) ? json.name : "No businesses found.";
    this.phoneNumber = LangUtils.exists(json.display_phone) ? json.display_phone : null;
    this.distance = LangUtils.exists(json.distance) ? (json.distance / Business.METERS_IN_MILE).toFixed(1) : null;
    this.imageUrl = LangUtils.exists(json.image_url) ? json.image_url : null;
    this.basicAddress = LangUtils.exists(json.location) ? json.location.address1 : null;
    this.rating = LangUtils.exists(json.rating) ? json.rating : null;
    this.price = LangUtils.exists(json.price) ? json.price : null;
    this.yelpURL = json.url;
  }

  /*
   *  Get long-format string information
   */
  public toLongString() {
    return this.name +
      + "\n\t" + this.basicAddress
      + "\n\tDistance: " + this.distance + " miles"
      + "\n\tRating: " + this.rating
      + "\n\tPrice: " + this.price
      + "\n\tPhone: " + this.phoneNumber
  }

  /*
   *  Get short-format string information
   */
  public toShortString() {
    return this.name + "\n"
      + "\t" + this.basicAddress + "\n"
      + "\tDistance: " + this.distance + " meters\n"
  }

  public static makeEmpty(): Business {
    return new Business({});
  }

  public static makeInit(): Business {
    return new Business({"name":"Press the button to get search results."});
  }
}
