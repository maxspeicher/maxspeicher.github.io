'use strict';

function Title() {
    const [hash, setHash] = React.useState(location.hash);

    React.useEffect(() => {
        const onHashChange = () => setHash(location.hash);
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const state = { rotateM: 0, rotateS: 0 };
    const titleRegEx = /(.*){(.)}(.*){(.)}(.*)/.exec(escapeHtml(MAX.header.title.content));

    var htmlString, titleElement;

    function rotate() {
        state.rotateM = (state.rotateM + 90) % 360;
        state.rotateS = (state.rotateS - 45) % 360;
        
        document.querySelector('.m').style.transform = 'rotateZ(' + state.rotateM + 'deg)';
        document.querySelector('.s').style.transform = 'rotateZ(' + state.rotateS + 'deg)';
    };

    if (titleRegEx) {
        htmlString = (
            titleRegEx[1] +
            '<span class="rotate m">' + titleRegEx[2] + '</span>' +
            titleRegEx[3] + 
            '<span class="rotate s">' + titleRegEx[4] + '</span>' +
            titleRegEx[5]
        ).replace(/\./g, '<span class="highlight">.</span>');

        titleElement = e(
            'h1',
            null,
            e('a', { href: MAX.header.title.href + location.hash, onMouseEnter: rotate, onTouchStart: rotate,
                dangerouslySetInnerHTML: {__html: htmlString} },
                null
            )
        );
    } else {
        titleElement = e(
            'h1',
            null,
            e('a', { href: MAX.header.title.href + location.hash },
                MAX.header.title.content
            )
        );
    }

    return titleElement;
}

function Menu() {
    const [hash, setHash] = React.useState(location.hash);

    React.useEffect(() => {
        const onHashChange = () => setHash(location.hash);
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const menuEntries = [];

    for (var i=0; i<MAX.header.menu.length; ++i) {
        const entry = MAX.header.menu[i];

        menuEntries.push(
            e('a', {
                className: location.pathname.indexOf(entry.href) > -1 ? 'current-page' : '',
                href: entry.href.startsWith('http') ? entry.href : entry.href + location.hash,
                target: entry.href.startsWith('http') ? '_blank' : '_self'
            }, entry.text)
        );
    }

    return e('nav', null, ...menuEntries);
}

class Header extends React.Component {
    render() {
        return e('div', null, e(Title), e(Menu));
    }
}

ReactDOM.render(e(Header), document.querySelector('header'));
