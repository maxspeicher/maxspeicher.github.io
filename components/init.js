'use strict';

// Declare globally for all other components:
const e = React.createElement;



(() => {
    let lastColorScheme;
    let styleElement = null;



    /**
     * COOKIE MANAGEMENT
     * We don't wanna have to deal with cookie banners and GDPR. So let's just get rid of all the cookies that might have been set by subdomains.
     */

    const deleteAllCookies = (domain) => {
        const cookies = document.cookie.split(';');

        for (let i=0; i<cookies.length; ++i) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=' + domain + '; path=/';
        }
    }

    MAX.deleteCookiesForDomains.forEach(domain => {
        deleteAllCookies(domain);
    });



    /**
     * COLOR SCHEMES
     */

    const colorSchemes = {
        'blue': {
            background: '#f4f5f6',
            foreground: 'rgba(6, 83, 121, 1.0)',
            highlight: '#f863ab'
        },
        'bonay': {
            background: '#f3e2ca',
            foreground: 'rgba(0, 0, 178, 1.0)',
            highlight: '#f58ebd'
        },
        'mintgreen': {
            background: '#d2e1c8',
            foreground: 'rgba(31, 87, 76, 1.0)',
            highlight: '#fff203'
        },
        'mintgreen-inverted': {
            background: '#1f574c',
            foreground: 'rgba(210, 225, 200, 1.0)',
            highlight: '#cc00cc'
        }/*,
        'purple': {
            background: '#2d053d',
            foreground: 'rgba(35, 140, 197, 1.0)',
            highlight: '#AB3428'
        }*/
    };

    const addColorSchemeCSS = (colorSchemeId) => {
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

        lastColorScheme = colorSchemeId;
    }

    const setColorScheme = () => {
        let colorSchemeId = lastColorScheme;

        if (location.hash.substring(1) in colorSchemes) {
            colorSchemeId = location.hash.substring(1);
            addColorSchemeCSS(colorSchemeId);
        } else {
            // Get all the keys from the colorSchemes object
            const keys = Object.keys(colorSchemes);

            while (colorSchemeId === lastColorScheme) {
                // Pick a random key that's not the last color scheme used
                const randomIndex = Math.floor(Math.random() * keys.length);
                colorSchemeId = keys[randomIndex];
            }

            // Changing the hash will trigger the function for a second time, so no need to call addColorSchemeCSS here
            location.hash = '#' + colorSchemeId;
        }
    }

    window.addEventListener('hashchange', setColorScheme, false);

    setColorScheme();



    /**
     * FOR LINKING TO SECTIONS WITHIN THE PAGE
     */

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
    
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        
        anchors.forEach(anchor => {
          anchor.addEventListener('click', smoothScroll);
        });
    });
})();
