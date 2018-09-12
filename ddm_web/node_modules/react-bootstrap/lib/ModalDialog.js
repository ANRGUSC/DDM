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

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

var propTypes = {
  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: _propTypes.default.string
};

var ModalDialog =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(ModalDialog, _React$Component);

  function ModalDialog() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ModalDialog.prototype;

  _proto.render = function render() {
    var _extends2;

    var _props = this.props,
        dialogClassName = _props.dialogClassName,
        className = _props.className,
        style = _props.style,
        children = _props.children,
        props = (0, _objectWithoutProperties2.default)(_props, ["dialogClassName", "className", "style", "children"]);

    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
        bsProps = _splitBsProps[0],
        elementProps = _splitBsProps[1];

    var bsClassName = (0, _bootstrapUtils.prefix)(bsProps);
    var modalStyle = (0, _extends3.default)({
      display: 'block'
    }, style);
    var dialogClasses = (0, _extends3.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[bsClassName] = false, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'dialog')] = true, _extends2));
    return _react.default.createElement("div", (0, _extends3.default)({}, elementProps, {
      tabIndex: "-1",
      role: "dialog",
      style: modalStyle,
      className: (0, _classnames.default)(className, bsClassName)
    }), _react.default.createElement("div", {
      className: (0, _classnames.default)(dialogClassName, dialogClasses)
    }, _react.default.createElement("div", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'content'),
      role: "document"
    }, children)));
  };

  return ModalDialog;
}(_react.default.Component);

ModalDialog.propTypes = propTypes;

var _default = (0, _bootstrapUtils.bsClass)('modal', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], ModalDialog));

exports.default = _default;
module.exports = exports["default"];