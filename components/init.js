'use strict';

const e = React.createElement;



/**
 * COOKIE MANAGEMENT 
 */

// We don't wanna have to deal with cookie banners and GDPR. So let's just get rid of all the cookies that might
// have been set by subdomains.
function deleteAllCookies(domain) {
    const cookies = document.cookie.split(';');

    for (let i=0; i<cookies.length; ++i) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=' + domain + '; path=/';
    }
}

for (var i=0; i<MAX.deleteCookiesForDomains.length; ++i) { // this comes from config.js
    deleteAllCookies(MAX.deleteCookiesForDomains[i]);
}



/**
 * COLOR SCHEMES
 */

const colorSchemes = {
    'mintgreen': {
        background: '#d2e1c8',
        foreground: 'rgba(31, 87, 76, 1.0)',
        highlight: '#fff203'
    },
    'mintgreen-inverted': {
        background: '#1f574c',
        foreground: 'rgba(210, 225, 200, 1.0)',
        highlight: '#030fff' //'#3d0b37'
    }/*,
    'purple': {
        background: '#2d053d',
        foreground: 'rgba(35, 140, 197, 1.0)',
        highlight: '#AB3428'
    }*/
};

let styleElement = null;

function addColorSchemeCSS(colorSchemeId) {
    const newStyle = `:root {
        --background: ${colorSchemes[colorSchemeId].background};
        --foreground: ${colorSchemes[colorSchemeId].foreground};
        --highlight: ${colorSchemes[colorSchemeId].highlight};
        --link-highligt: ${colorSchemes[colorSchemeId].foreground.replace('1.0', '.15')};
    }`;

    // If the new style is the same as the old one, do nothing
    if (styleElement && styleElement.innerHTML === newStyle) {
        return;
    }

    const style = document.createElement('style');
    style.innerHTML = newStyle;

    // Remove the previous style element if it exists
    if (styleElement) {
        document.head.removeChild(styleElement);
    }

    // Append the new style element and update the reference
    document.head.appendChild(style);
    styleElement = style;
}

function setColorScheme() {
    let colorSchemeId;

    if (location.hash.substring(1) in colorSchemes) {
        colorSchemeId = location.hash.substring(1);
        addColorSchemeCSS(colorSchemeId);
    } else {
        // Get all the keys from the colorSchemes object
        const keys = Object.keys(colorSchemes);

        // Pick a random key
        const randomIndex = Math.floor(Math.random() * keys.length);
        colorSchemeId = keys[randomIndex];

        // Changing the hash will trigger the function for a second time, so no need to call addColorSchemeCSS here
        location.hash = '#' + colorSchemeId;
    }
}

window.addEventListener('hashchange', setColorScheme, false);

setColorScheme();
