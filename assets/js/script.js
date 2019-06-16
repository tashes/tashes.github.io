// Data manager
(async function () {
    let DATA = await fetch('./data/main/data.json').then(r => r.json());
    document.querySelector('#aboutme_cont_text').innerHTML = DATA.about;
})();

(function () {
    // Projects Manager
    (async function () {
        document.querySelector('#projects_list').innerHTML = "";
        let DATA = await fetch('./data/projects.json').then(r => r.json());
        DATA.map(function (project) {
            let el = document.createElement('a');
            el.href = project.link;
            el.innerHTML = `<article class="project"><h2>${ project.name }</h2><p>${ project.description }</p></article>`;
            return el;
        }).forEach(function (project) {
            document.querySelector('#projects_list').appendChild(project);
        });
        document.querySelector('#projects_list_showmore').classList.add('hide');
    })();
})();