'use strict';

function isInViewport(elem) {
    var bounding = elem.getBoundingClientRect();

    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

class SectionTitle extends React.Component {
    constructor(props) {
        super(props);
        this.element = React.createRef();
        this.typewriter = null;
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          750 + Math.round(Math.random() * 500)
        );

        this.typewriter = new Typewriter(this.element.current, { delay: 75 + Math.round(Math.random() * 75) });
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if (isInViewport(this.element.current)) {
            clearInterval(this.timerID);
            this.typewriter
                .typeString(this.props.text)
                .start();
        }
    }
    
    render() {
        return e('h2', { ref: this.element });
    }
}
