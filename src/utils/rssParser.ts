import Parser from 'rss-parser';

const CORS = "http://julienkeiff.fr:30080/";

const parseURL = async (url: string): Promise<any> => {
    const parser: Parser<any> = new Parser();
    
    const feed = await parser.parseURL(CORS + url);
    return feed;
}

export {
    parseURL,
}