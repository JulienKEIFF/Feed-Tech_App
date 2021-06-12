interface RssLink {
    link: string;
    name: string;
}

const rssLinks: Array<RssLink> = [
    //FR
    {link: "https://www.jesuisundev.com/feed/", name: "Je suis un dev"},
    {link: "https://news.humancoders.com/items/feed.rss", name: "Human Coders - News"},
    {link: "https://blog.humancoders.com/feed/", name: "Human Coders - Blog"},
    {link: "https://www.journalduhacker.net/rss", name: "Journal du hacker"},
    {link: "https://www.lalutineduweb.fr/blog/feed/", name: "La lutine du web"},
    {link: "https://putaindecode.io/api/articles/feeds/desc/feed.xml", name: "Putain de code"},
    {link: "http://www.planete-php.fr/rss.php", name: "Planete PHP Fr"},
    //EN
    {link: "https://css-tricks.com/feed/", name: "CSS Trick"},
    {link: "https://hacks.mozilla.org/feed/", name: "Hack Mozilla"},
    {link: "https://developers.google.com/web/updates/atom.xml", name: "Google Web Update"},
    {link: "http://reactjs.org/feed.xml", name: "React"},
    {link: "https://bitsofco.de/rss/", name: "BitsofCode"},
]

export { rssLinks }