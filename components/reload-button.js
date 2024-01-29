'use strict';

function ReloadButton() {
    const state = { rotate: 0 };

    function rotate() {
        state.rotate = state.rotate + 360;
        document.querySelector('#reload-button').style.transform = 'rotateZ(' + state.rotate + 'deg)';
    };

    function setNewColorScheme() {
        location.hash = '';
        return false;
    }

    return e('a', { href: '#', className: 'rotate', id: 'reload-button', onClick: setNewColorScheme, onMouseDown: rotate, onTouchStart: rotate },
        e('i', { className: 'fas fa-sync' })
    );
}

ReactDOM.render(e(ReloadButton), document.querySelector('#reload-button-container'));
