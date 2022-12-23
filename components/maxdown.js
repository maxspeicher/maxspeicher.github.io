'use strict';

/*
 * Simple markdown, Max style
 * I know this is not really markdown. It's my own adaptation to quickly & easily enable italics, bold font, and small caps.
 */
function parseMaxdown(s) {
    let r = s;

    const setup = [
        // italics first
        ['_', '<i>', '</i>'],
        // then bold font; “\\” because RegExp
        ['\\*', '<strong>', '</strong>'],
        // then small caps
        ['§', '<span style="font-variant: small-caps">', '</span>']
    ];

    const replaceMaxdown = function(input, indicator, startTag, endTag) {
        const re = new RegExp('(' + indicator + '[^' + indicator + ']+' + indicator + ')', 'g');
        
        return input.toString().replace(re, function(match, offset, string) {
            return startTag + match.substring(1, match.length-1) + endTag;
        });
    };

    for (let i=0; i<setup.length; ++i) {
        r = replaceMaxdown(r, setup[i][0], setup[i][1], setup[i][2]);
    }

    return r;
}

function Maxdown(props) {
    return e('span', { dangerouslySetInnerHTML: {__html: parseMaxdown(escapeHtml(props.text))} }, null);
}
