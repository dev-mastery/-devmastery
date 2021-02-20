import RSS from "rss";

export function feedOf(feedProps: FeedProps) {
  let { feedUrl, siteUrl, imageUrl, datePublished, ...feedOptions } = feedProps;
  let rss = new RSS({
    feed_url: feedUrl,
    site_url: siteUrl,
    image_url: imageUrl,
    pubDate: datePublished,
    ...feedOptions,
  });
  function add(itemProps: FeedItemProps) {
    rss.item(itemProps);
  }
  function toXml() {
    return rss.xml();
  }
  return Object.freeze({
    add,
    toXml,
  });
}

interface FeedProps {
  /**
   * Title of your site or feed.
   */
  title: string;
  /**
   * A short description of the feed.
   */
  description?: string;
  /**
   * Feed generator.
   */
  generator?: string;
  /**
   * URL to the rss feed.
   * feed_url
   */
  feedUrl: string;
  /**
   * URL to the site that the feed is for.
   * site_url
   */
  siteUrl: string;
  /**
   * Small image for feed readers to use.
   * image_url
   */
  imageUrl?: string;
  /**
   * URL to documentation on this feed.
   */
  docs?: string;
  /**
   * Who manages content in this feed.
   */
  managingEditor?: string;
  /**
   * Who manages feed availability and technical support.
   */
  webMaster?: string;
  /**
   * Copyright information for this feed.
   */
  copyright?: string;
  /**
   * The language of the content of this feed.
   */
  language?: string;
  /**
   * One or more categories this feed belongs to.
   */
  categories?: string[];
  /**
   * The publication date for content in the feed.
   * Accepts Date object or string with any format
   * JS Date can parse.
   * pubDate
   */
  datePublished?: Date | string;
  /**
   * Number of minutes feed can be cached before refreshing
   * from source.
   */
  // ttl?: number;
  /**
   * Where is the PubSubHub hub located.
   */
  // hub?: string;
  /**
   * Put additional namespaces in element
   * (without 'xmlns:' prefix).
   */
  custom_namespaces?: Object;
  /**
   * Put additional elements in the feed (node-xml syntax).
   */
  custom_elements?: any[];
}

interface FeedItemProps {
  /**
   * Title of this particular item.
   */
  title: string;
  /**
   * Content for the item. Can contain HTML but link and image
   * URLs must be absolute path including hostname.
   */
  description: string;
  /**
   * URL to the item. This could be a blog entry.
   */
  url: string;
  /**
   * A unique string feed readers use to know if an item is
   * new or has already been seen. If you use a guid never
   * change it. If you don't provide a guid then your item
   * urls must be unique.
   * Defaults to url.
   */
  guid?: string;
  /**
   * If provided, each array item will be added as a category
   * element.
   */
  categories?: string[];
  /**
   * If included it is the name of the item's creator. If not
   * provided the item author will be the same as the feed author.
   * This is typical except on multi-author blogs.
   */
  author?: string;
  /**
   * The date and time of when the item was created. Feed
   * readers use this to determine the sort order. Some readers
   * will also use it to determine if the content should be
   * presented as unread.
   * Accepts Date object or string with any format
   * JS Date can parse.
   */
  date: Date | string;
  /**
   * The latitude coordinate of the item for GeoRSS.
   */
  lat?: number;
  /**
   * The longitude coordinate of the item for GeoRSS.
   */
  long?: number;
  /**
   * Put additional elements in the item (node-xml syntax).
   */
  custom_elements?: any[];
  /**
   * An enclosure object.
   */
  enclosure?: EnclosureObject;
}

interface EnclosureObject {
  /**
   * URL to file object (or file).
   */
  url: string;
  /**
   * Path to binary file (or URL).
   */
  file?: string;
  /**
   * Size of the file.
   */
  size?: number;
  /**
   * If not provided, the MIME Type will be guessed based
   * on the extension of the file or URL, passing type to
   * the enclosure will override the guessed type.
   */
  type?: string;
}
