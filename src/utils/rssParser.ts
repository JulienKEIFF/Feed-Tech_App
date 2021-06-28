import Parser from 'rss-parser';
import { rssLinks } from './rssLinks'

const CORS = "https://cors.julienkeiff.fr/";

const parseURL = async (url: string): Promise<RssFeed> => {
  const parser: Parser<any> = new Parser();
  
  const feed: RssFeed = await parser.parseURL(CORS + url);
  return feed;
}

const getNewFeed = async (max: number) => {
  console.log('reload')
  const itemList: ItemRssFeed[] = []
  for (const key in rssLinks) {
    const link = rssLinks[key];
    const res = await parseURL(link.link);
    const maxIndex = res.items.length > 20 ? 20 : res.items.length;
    for (let i = 0; i < maxIndex; i++) {
      const item: ItemRssFeed = res.items[i];
      itemList.push(item);
    }
  }
  const sortedRSS = itemList.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
  return sortedRSS.slice(0, max);
}

export {
  parseURL,
  getNewFeed,
}

interface RssFeed {
  description: string;
  feedUrl: string;
  generator: string;
  image: object;
  items: ItemRssFeed[];
  language: string;
  lastBuildDate: string;
  link: string;
  paginationLinks: string;
  title: string;
}

interface ItemRssFeed {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  "dc:creator": string;
  comments: string; 
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string[];
  isoDate: string;
}
