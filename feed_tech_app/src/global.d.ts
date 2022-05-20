export interface RssItem {
    title: string;
}

export interface RssFeed {
    _id: string;
    rssLink: string;
    rssDisplayName: string;
    language: string;
}

export interface RssGroup {
    _id: string;
    name: string;
    description: string;
}