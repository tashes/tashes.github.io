

    const App = new Vue({
        el: '#app',
        data: {
            state: `article`, // article or list
            search: ``,
            bg: `https://wallpaper-house.com/data/out/4/wallpaper2you_35824.jpg`,
            articles: [
                {
                    type: 'date',
                    time: '2018-10-14'
                },
                {
                    type: 'article',
                    time: '2018-10-14T01:19:25.495Z',
                    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Netus et malesuada fames ac. Scelerisque varius morbi enim nunc. Mauris pharetra et ultrices neque. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Amet est placerat in egestas erat imperdiet sed euismod nisi. Tempus egestas sed sed risus pretium quam vulputate. Viverra justo nec ultrices dui sapien. At augue eget arcu dictum. Non nisi est sit amet facilisis. Lectus quam id leo in vitae. Adipiscing enim eu turpis egestas pretium aenean. Ornare suspendisse sed nisi lacus sed viverra tellus. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Aliquam sem et tortor consequat id porta. Eget dolor morbi non arcu. Aliquet lectus proin nibh nisl condimentum id venenatis. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Feugiat in ante metus dictum at tempor commodo.`,
                    tag: 'MedicalStudies'
                },
                {
                    type: 'date',
                    time: '2018-10-14'
                },
                {
                    type: 'article',
                    time: '2018-10-14T01:19:25.495Z',
                    text: `Some wonderful text about something or the other...`,
                    tag: 'MedicalStudies'
                },
                {
                    type: 'article',
                    time: '2018-10-14T01:19:25.495Z',
                    text: `Some wonderful text about something or the other...`,
                    tag: 'MedicalStudies'
                },
                
            ],
            article: {
                state: 'loading',
                loaded: 48,
                date: '14102018',
                time: '0804',
                text: ''
            }
        },
        methods: {
            moment,
            renderMD (text) {
                return text;
            }
        },
        computed: {
            article_html () {
                return "<h3>HI!</h3>";
            }
        }
    });
