import _inheritsLoose from "@babel/runtime/helpers/es6/inheritsLoose";
import PropTypes from 'prop-types';
import React from 'react';
var propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
var defaultProps = {
  label: 'Close'
};

var CloseButton =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CloseButton, _React$Component);

  function CloseButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CloseButton.prototype;

  _proto.render = function render() {
    var _props = this.props,
        label = _props.label,
        onClick = _props.onClick;
    return React.createElement("button", {
      type: "button",
      className: "close",
      onClick: onClick
    }, React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"), React.createElement("span", {
      className: "sr-only"
    }, label));
  };

  return CloseButton;
}(React.Component);

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;
export default CloseButton;