

    // Hash poller
    let txt = '';
    const ERRS = {
        '404': 'Sorry, the page your were looking for isn\'t here!'
    }
    const pages = {
        async home (hash) {
            // set state to loading
            App.state = 'loading';
            // get the pages
            let proarr = await fetch('/data/indicies/1.json').then(res => res.json());
            // Mutate objects
            let arr = proarr.map(function (ele) {
                if (ele.type === 'date') {
                    return {
                        type: 'date',
                        time: ele.time
                    };
                }
                else if (ele.type === 'article') {
                    return {
                        type: 'article',
                        time: ele.time,
                        text: ele.text,
                        tag: ele.tag
                    };
                }
            }).filter(r=>r);
            // Set them to array
            App.articles = arr;
            // Clear state from loading
            App.state = 'list';
            // Set the hash
            window.location.hash = hash;
        },
        async article (date, time) {
            // Set page state to article
            App.state = 'article';
            // Set article state to loading
            App.article.state = 'loading';
            App.article.loaded = 0;
            // get the page
            let propage = await fetch(`/data/entries/${date}-${time}.json`);
            // check if response is ok
            if (propage.ok === false) {
                // Display error
                App.article.error = propage.status;
                let flavtext = ERRS[propage.status] || "Sorry, something went terribly wrong!";
                App.article.error_flavour = flavtext;
                // Set article state to error
                App.article.state = 'error';
            }
            else {
                let page = await propage.json();
                // increment loaded
                App.article.loaded = 99;
                // set the time
                App.article.time = page.time;
                // set the tag
                App.article.tag = page.tag;
                // set the text
                App.article.text = page.contents;
                // increment loaded
                App.article.loaded = 100;
                // Display the page
                App.article.state = 'preview';
            }
        }
    };
    async function hashChanged (oldhash, newhash) {
        if (newhash === '' || newhash === '#/') {
            pages.home(newhash);
        }
        else if (/^#\/\d{8}\:\d{4}$/.test(newhash)) {
            let datetime = /^#\/(\d{8})\:(\d{4})$/.exec(newhash);
            pages.article(datetime[1], datetime[2]);
        }
    };
    let timer = setInterval(function () {
        if (window.location.hash !== txt) {
            // Callback
            hashChanged(txt, window.location.hash);
            txt = window.location.hash;
        }
    }, 100);


    const mdhtmlconv = new showdown.Converter();

    function switchtohome () {
        App.state = 'list';
        window.location.hash = '/';
    }

    // Vue
    const App = new Vue({
        el: '#app',
        data: {
            state: `loading`, // article or list or loading
            search: ``,
            articles: [],
            article: {
                state: 'preview',
                loaded: 48,
                time: '2018-10-14T01:19:25.495Z',
                text: '',
                tag: 'MedicineLife',
                error: 0,
                error_flavtext: ''
            }
        },
        methods: {
            moment,
            renderMD (text) {
                return mdhtmlconv.makeHtml(text);
            },
            handleSearch () {
                switchtohome()
            },
            handleTimeClick (time) {
                switchtohome();
                this.search = moment(time).format("DDMMYYYY");
            },
            handleTagClick (tag) {
                switchtohome();
                this.search = `#${tag}`;
            },
            handleArticleClick (item) {
                let fulltime = moment(item.time);
                this.search = '';
                window.location.hash = `/${fulltime.format("DDMMYYYY")}:${fulltime.format("hhmm")}`;
            }
        },
        computed: {
            article_html () {
                return mdhtmlconv.makeHtml(this.article.text);
            },
            articles_list () {
                let searchterm = this.search;
                // Decide what kind of search to do
                // Empty Search bar
                if (searchterm === '') {
                    return this.articles;
                }
                // Date String
                else if (/^\d{1,8}$/.test(searchterm) === true) {
                    return this.articles.filter((article) => {
                        if (moment(article.time).format("DDMMYYYY").indexOf(searchterm) > -1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })
                }
                // Strict Tag String
                else if (/^#.+$/.test(searchterm) === true) {
                    let searchterm_ = /^#(.+)$/.exec(searchterm)[1];
                    let articles = this.articles;
                    let len = articles.length;
                    let results = [];
                    let hold = {};
                    for (let i = 0; i < len; i++) {
                        let article = articles[i];
                        if (article.type === 'date') {
                            hold = article;
                        }
                        else if (article.type === 'article') {
                            // Check the article tag
                            if (article.tag.indexOf(searchterm_) > -1) {
                                // check if hold has been put already
                                if (hold !== {}) {
                                    results.push(hold);
                                    hold = {};
                                }
                                // add result
                                results.push(article);
                            }
                        }
                    }
                    return results;
                }
                // All Tag Search
                else if (/^#$/.test(searchterm) === true) {
                    let articles = this.articles;
                    let len = articles.length;
                    let results = [];
                    let hold = {};
                    for (let i = 0; i < len; i++) {
                        let article = articles[i];
                        if (article.type === 'date') {
                            hold = article;
                        }
                        else if (article.type === 'article') {
                            // Check the article tag
                            if (article.tag) {
                                // check if hold has been put already
                                if (hold !== {}) {
                                    results.push(hold);
                                    hold = {};
                                }
                                // add result
                                results.push(article);
                            }
                        }
                    }
                    return results;
                }
                // General Search
                else {
                    let articles = this.articles;
                    let len = articles.length;
                    let results = [];
                    let hold = {};
                    for (let i = 0; i < len; i++) {
                        let article = articles[i];
                        if (article.type === 'date') {
                            hold = article;
                        }
                        else if (article.type === 'article') {
                            // Check the article tag
                            if (article.text.search(searchterm) > -1) {
                                // check if hold has been put already
                                if (hold !== {}) {
                                    results.push(hold);
                                    hold = {};
                                }
                                // add result
                                results.push(article);
                            }
                        }
                    }
                    return results;
                }
            },
            bg () {
                // Get tag via state of page
                // let tag;
                // switch (this.state) {
                //     case "loading":
                //         return `439A86`;
                //     case "":
                // }
            }
        }
    });

    window.addEventListener('load', function () {
        if (window.location.hash === '') hashChanged(undefined, '');
    });