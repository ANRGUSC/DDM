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
   * @type {string|number}
   * @required
   */
  id: (0, _isRequiredForA11y.default)(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),

  /**
   * Sets the direction the Tooltip is positioned towards.
   */
  placement: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Tooltip.
   */
  positionTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Tooltip.
   */
  positionLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "top" position value for the Tooltip arrow.
   */
  arrowOffsetTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Tooltip arrow.
   */
  arrowOffsetLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
var defaultProps = {
  placement: 'right'
};

var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Tooltip, _React$Component);

  function Tooltip() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tooltip.prototype;

  _proto.render = function render() {
    var _extends2;

    var _props = this.props,
        placement = _props.placement,
        positionTop = _props.positionTop,
        positionLeft = _props.positionLeft,
        arrowOffsetTop = _props.arrowOffsetTop,
        arrowOffsetLeft = _props.arrowOffsetLeft,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        props = (0, _objectWithoutProperties2.default)(_props, ["placement", "positionTop", "positionLeft", "arrowOffsetTop", "arrowOffsetLeft", "className", "style", "children"]);

    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = (0, _extends3.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));
    var outerStyle = (0, _extends3.default)({
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
      className: (0, _bootstrapUtils.prefix)(bsProps, 'arrow'),
      style: arrowStyle
    }), _react.default.createElement("div", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'inner')
    }, children));
  };

  return Tooltip;
}(_react.default.Component);

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('tooltip', Tooltip);

exports.default = _default;
module.exports = exports["default"];