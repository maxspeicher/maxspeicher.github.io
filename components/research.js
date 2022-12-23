'use strict';

class Research extends React.Component {
    render() {
        const highlightAuthor = MAX.content.research.highlightAuthor;
        const research = MAX.content.research.publications;
        const entries = [];

        var highlightAuthorHasBeenMentioned = false;

        for (var i=0; i<research.length; ++i) {
            var authors = research[i].authors;
            var authorList = [];

            for (var j=0; j<authors.length; ++j) {
                if (authors[j] === highlightAuthor) {
                    authorList.push(e('strong', null, authors[j].replace(' ', String.fromCharCode(160))));
                    highlightAuthorHasBeenMentioned = true;
                } else {
                    authorList.push(authors[j].replace(' ', String.fromCharCode(160)));
                }

                if (j === 2 && authors.length > 4 && highlightAuthorHasBeenMentioned) {
                    authorList.push(e('i', null, ' et al.'));
                    break;
                } else if (j === authors.length-2) {
                    if (authors.length === 2) {
                        authorList.push(' & ');
                    } else {
                        authorList.push(', & ');
                    }
                } else if (j < authors.length-2) {
                    authorList.push(', ');
                }
            }

            entries.push(
                e('p', null,
                    research[i].isNew ? e(NewFlag, { className: 'margin-right--inline', style: { height: '1em' }, type: 2 }) : '',
                    e('span', { className: 'margin-right--inline'}, e('a', { href: research[i].link, target: '_blank' }, e(Maxdown, { text: research[i].title }, null))),
                    e('span', { className: 'secondary' }, ...authorList),
                    research[i].award ? e('span', { className: 'block small-caps' }, research[i].award) : ''
                )
            );
        }

        return e('div', null,
            e(SectionTitle, { text: 'Research' }),
            ...entries,
            e('p', null,
                e('span', { className: 'lighter' } , 'More on '),
                e('a', { href: 'https://scholar.google.com/citations?user=uHCRUlQAAAAJ&hl=en', target: '_blank'},
                e('i', { className: 'fas fa-graduation-cap' }),
                    ' Google Scholar'
                )
            )
        );
    }
}

ReactDOM.render(e(Research), document.querySelector('#research'));
