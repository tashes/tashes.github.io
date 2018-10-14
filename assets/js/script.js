

    // Hash poller
    let txt = '';
    const pages = {
        async home () {
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
        }
    };
    async function hashChanged (oldhash, newhash) {
        if (newhash === '' || newhash === '#/') {
            pages.home();
        }
    };
    let timer = setInterval(function () {
        if (window.location.hash !== txt) {
            // Callback
            hashChanged(txt, window.location.hash);
            txt = window.location.hash;
        }
    }, 100);


    // Vue
    const App = new Vue({
        el: '#app',
        data: {
            state: `loading`, // article or list or loading
            search: ``,
            bg: `https://wallpaper-house.com/data/out/4/wallpaper2you_35824.jpg`,
            articles: [],
            article: {
                state: 'preview',
                loaded: 48,
                date: '14102018',
                time: '0804',
                text: '',
                tag: 'MedicineLife',
            }
        },
        methods: {
            moment,
            renderMD (text) {
                return text;
            },
            
        },
        computed: {
            article_html () {
                return "<h3>HI!</h3>";
            }
        }
    });

    window.addEventListener('load', function () {
        if (window.location.hash === '') hashChanged(undefined, '');
    });