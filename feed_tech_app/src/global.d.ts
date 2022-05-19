export interface RssItem {
    title: string;
}

export interface RssFeed {
    _id: string;
    rssLink: string;
    rssDisplayName: string;
    language: string;
}