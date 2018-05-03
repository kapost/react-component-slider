import debounce from 'lodash.debounce';
import React from 'react';
import PropTypes from 'prop-types';

const { node, func } = PropTypes;

const arrowWidth = 20;

class ComponentSlider extends React.Component {
  static displayName = 'ComponentSlider';

  static propTypes = {
    children: node.isRequired,
    renderLeftArrow: func,
    renderRightArrow: func,
  };

  static defaultProps = {
    renderLeftArrow: () => <span>&larr;</span>,
    renderRightArrow: () => <span>&rarr;</span>,
  };

  constructor(props) {
    super(props);

    this.setSliderRef = element => {
      this.slider = element;
    };
    this.setSliderContentRef = element => {
      this.sliderContent = element;
    };

    this.state = {
      marginLeft: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize());
    this.resetMargin();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize());
  }

  resetMargin = () => {
    if (this.slider && this.sliderContent) {
      this.setState({ marginLeft: 0 });
    }
  }

  //   slider width
  //        |  content width
  //        v        |
  // ~~~~~~~~~~~~~~  v
  // ~~~~~~~~~~~~~~~~~~~~
  // ______________
  // |             |----|
  // |             |

  // if we are currently paginated to the right less than / equal the width of
  // the slider container, then we can paginate back left all the way;
  // otherwise there is not enough space, so we only shift left the amount of
  // the width of the slider container

  handleLeftClicked = () => {
    const currentMarginLeft = this.state.marginLeft;
    const sliderWidth = this.slider.offsetWidth;
    let marginLeft;

    if (currentMarginLeft > sliderWidth) {
      marginLeft = currentMarginLeft - sliderWidth;
    } else {
      marginLeft = 0;
    }

    this.setState({ marginLeft });
  }

  // if the amount of width left is less than / equal the width of the slider
  // container, we can shift left enough to show the entire remaining width;
  // otherwise we shift the length of the slider container; note the extra
  // 20px to account for margins for the arrows

  handleRightClicked = () => {
    const currentMarginLeft = this.state.marginLeft;
    const sliderWidth = this.slider.offsetWidth;
    const contentWidth = this.sliderContent.offsetWidth;
    const remainingWidth = contentWidth - (sliderWidth - arrowWidth) - currentMarginLeft;
    let marginLeft;

    if (remainingWidth > 0) {
      if (remainingWidth <= sliderWidth) {
        marginLeft = currentMarginLeft + remainingWidth;
      } else {
        marginLeft = currentMarginLeft + sliderWidth;
      }
    } else {
      marginLeft = currentMarginLeft;
    }

    this.setState({ marginLeft });
  }

  handleResize = () => {
    this.updateFn = this.updateFn || debounce(() => { this.resetMargin(); }, 200);
    return this.updateFn;
  }

  // Show left arrow if we are tabbed over at all (margin left not 0)

  renderLeftArrow = () => {
    if (this.state.marginLeft !== 0) {
      return (
        <button className="caret caret-left" onClick={this.handleLeftClicked}>
          {this.props.renderLeftArrow()}
        </button>
      );
    }
    return null;
  }


  // When the 'content' of a slider exceeds the width of the slider itself
  // the right arrow should show; remaining width is the current width of
  // the content minus the width of the slider container

  renderRightArrow = () => {
    const currentMarginLeft = this.state.marginLeft;
    const sliderWidth = this.slider ? this.slider.offsetWidth : 0;
    const contentWidth = this.sliderContent ? this.sliderContent.offsetWidth : 0;
    const remainingWidth = contentWidth - (sliderWidth - arrowWidth) - currentMarginLeft;

    if (remainingWidth > 0) {
      return (
        <button className="caret caret-right" onClick={this.handleRightClicked}>
          {this.props.renderRightArrow()}
        </button>
      );
    }
    return null;
  }

  render = () => {
    return (
      <div className="component-slider" ref={this.setSliderRef}>
        {this.renderLeftArrow()}
        <div className="slider-container">
          <div
            className="slider-content"
            ref={this.setSliderContentRef}
            style={{ marginLeft: `-${this.state.marginLeft}px` }}
          >
            {this.props.children}
          </div>
        </div>
        {this.renderRightArrow()}
      </div>
    );
  }
}

export default ComponentSlider;
