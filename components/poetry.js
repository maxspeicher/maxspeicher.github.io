'use strict';

class Poetry extends React.Component {
    render() {
        const poems = MAX.content.poetry;
        const entries = [];

        for (var i=0; i<poems.length; ++i) {
            entries.push(
                e('p', null,
                    // poems[i].isNew ? e('span', { className: 'block' }, e(NewFlag, { style: { height: '2em', transform: 'rotate(-23deg)' } })) : '',
                    poems[i].isNew ? e(NewFlag, { className: 'margin-right--inline', style: { height: '1em' }, type: 2 }) : '',
                    e('span', { className: 'margin-right--inline' },
                        e('a', { href: poems[i].link, target: '_blank' },
                            e(Maxdown, { text: poems[i].title }, null)
                        ),
                        poems[i].nft ? e('span', { className: 'small-caps' }, ' ⟨', e('a', { href: poems[i].nft, target: '_blank'}, 'NFT'), '⟩') : ''
                    ),
                    e('span', { className: 'secondary' }, poems[i].publication)
                )
            );
        }

        return e('div', null,
            e(SectionTitle, { text: 'Poetry' }),
            ...entries,
            e('p', null,
                e('span', { className: 'lighter' } , 'More on '),
                e('a', { href: 'https://maxspeicher.substack.com', target: '_blank'},
                    e('i', { className: 'fas fa-bookmark' }),
                    ' Substack'
                )
            )
        );
    }
}

ReactDOM.render(e(Poetry), document.querySelector('#poetry'));
