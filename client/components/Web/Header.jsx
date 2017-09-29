import React, {Component} from 'react';
import {connect} from 'react-redux';
import FloatingHeader from './Header/FloatingHeader';
import FixedHeader from './Header/FixedHeader';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollState: "top"  // "top", "scrolled"
    };

    this.scrollHandler = () => {
      if (window.scrollY > 100) {
        this.setState({scrollState: "scrolled"});
      } else {
        this.setState({scrollState: "top"});
      }
    };
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  render() {
    return (
      <div className="header">
        <FloatingHeader
          match={this.props.match}
          brandLogoUrl={this.props.brandLogoUrl}
          visibilityClass={this.state.scrollState === "scrolled" ? "shown" : "hidden"}
        />
        <FixedHeader
          match={this.props.match}
          brandLogoUrl={this.props.brandLogoUrl}
          visibilityClass={this.state.scrollState === "top" ? "shown" : "hidden"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  brandLogoUrl: state.home.brandLogoUrl
});

export default connect(mapStateToProps)(Header);
