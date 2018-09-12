"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isRequiredForA11y = _interopRequireDefault(require("prop-types-extra/lib/isRequiredForA11y"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: (0, _isRequiredForA11y.default)(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),

  /**
   * Sets the direction the Popover is positioned towards.
   */
  placement: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Popover.
   */
  positionTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Popover.
   */
  positionLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "top" position value for the Popover arrow.
   */
  arrowOffsetTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Popover arrow.
   */
  arrowOffsetLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Title content
   */
  title: _propTypes.default.node
};
var defaultProps = {
  placement: 'right'
};

var Popover =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Popover, _React$Component);

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
        props = (0, _objectWithoutProperties2.default)(_props, ["placement", "positionTop", "positionLeft", "arrowOffsetTop", "arrowOffsetLeft", "title", "className", "style", "children"]);

    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = (0, _extends3.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));
    var outerStyle = (0, _extends3.default)({
      display: 'block',
      top: positionTop,
      left: positionLeft
    }, style);
    var arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft
    };
    return _react.default.createElement("div", (0, _extends3.default)({}, elementProps, {
      role: "tooltip",
      className: (0, _classnames.default)(className, classes),
      style: outerStyle
    }), _react.default.createElement("div", {
      className: "arrow",
      style: arrowStyle
    }), title && _react.default.createElement("h3", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'title')
    }, title), _react.default.createElement("div", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'content')
    }, children));
  };

  return Popover;
}(_react.default.Component);

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('popover', Popover);

exports.default = _default;
module.exports = exports["default"];