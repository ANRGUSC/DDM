"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Glyphicon = _interopRequireDefault(require("./Glyphicon"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var defaultProps = {
  bsRole: 'feedback'
};
var contextTypes = {
  $bs_formGroup: _propTypes.default.object
};

var FormControlFeedback =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(FormControlFeedback, _React$Component);

  function FormControlFeedback() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormControlFeedback.prototype;

  _proto.getGlyph = function getGlyph(validationState) {
    switch (validationState) {
      case 'success':
        return 'ok';

      case 'warning':
        return 'warning-sign';

      case 'error':
        return 'remove';

      default:
        return null;
    }
  };

  _proto.renderDefaultFeedback = function renderDefaultFeedback(formGroup, className, classes, elementProps) {
    var glyph = this.getGlyph(formGroup && formGroup.validationState);

    if (!glyph) {
      return null;
    }

    return _react.default.createElement(_Glyphicon.default, (0, _extends2.default)({}, elementProps, {
      glyph: glyph,
      className: (0, _classnames.default)(className, classes)
    }));
  };

  _proto.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        props = (0, _objectWithoutProperties2.default)(_props, ["className", "children"]);

    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);

    if (!children) {
      return this.renderDefaultFeedback(this.context.$bs_formGroup, className, classes, elementProps);
    }

    var child = _react.default.Children.only(children);

    return _react.default.cloneElement(child, (0, _extends2.default)({}, elementProps, {
      className: (0, _classnames.default)(child.props.className, className, classes)
    }));
  };

  return FormControlFeedback;
}(_react.default.Component);

FormControlFeedback.defaultProps = defaultProps;
FormControlFeedback.contextTypes = contextTypes;

var _default = (0, _bootstrapUtils.bsClass)('form-control-feedback', FormControlFeedback);

exports.default = _default;
module.exports = exports["default"];