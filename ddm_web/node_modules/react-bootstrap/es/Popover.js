import _extends from "@babel/runtime/helpers/es6/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/es6/objectWithoutProperties";
import _inheritsLoose from "@babel/runtime/helpers/es6/inheritsLoose";
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { bsClass, getClassSet, prefix, splitBsProps } from './utils/bootstrapUtils';
var propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: isRequiredForA11y(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /**
   * Sets the direction the Popover is positioned towards.
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Popover.
   */
  positionTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The "left" position value for the Popover.
   */
  positionLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The "top" position value for the Popover arrow.
   */
  arrowOffsetTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The "left" position value for the Popover arrow.
   */
  arrowOffsetLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Title content
   */
  title: PropTypes.node
};
var defaultProps = {
  placement: 'right'
};

var Popover =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Popover, _React$Component);

  function Popover() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Popover.prototype;

  _proto.render = function render() {
    var _extends2;

    var _props = this.props,
        placement = _props.placement,
        positionTop = _props.positionTop,
        positionLeft = _props.positionLeft,
        arrowOffsetTop = _props.arrowOffsetTop,
        arrowOffsetLeft = _props.arrowOffsetLeft,
        title = _props.title,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        props = _objectWithoutProperties(_props, ["placement", "positionTop", "positionLeft", "arrowOffsetTop", "arrowOffsetLeft", "title", "className", "style", "children"]);

    var _splitBsProps = splitBsProps(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = _extends({}, getClassSet(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));

    var outerStyle = _extends({
      display: 'block',
      top: positionTop,
      left: positionLeft
    }, style);

    var arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft
    };
    return React.createElement("div", _extends({}, elementProps, {
      role: "tooltip",
      className: classNames(className, classes),
      style: outerStyle
    }), React.createElement("div", {
      className: "arrow",
      style: arrowStyle
    }), title && React.createElement("h3", {
      className: prefix(bsProps, 'title')
    }, title), React.createElement("div", {
      className: prefix(bsProps, 'content')
    }, children));
  };

  return Popover;
}(React.Component);

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;
export default bsClass('popover', Popover);