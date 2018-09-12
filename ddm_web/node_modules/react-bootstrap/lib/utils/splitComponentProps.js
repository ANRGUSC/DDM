"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = splitComponentProps;

var _entries = _interopRequireDefault(require("@babel/runtime/core-js/object/entries"));

function splitComponentProps(props, Component) {
  var componentPropTypes = Component.propTypes;
  var parentProps = {};
  var childProps = {};
  (0, _entries.default)(props).forEach(function (_ref) {
    var propName = _ref[0],
        propValue = _ref[1];

    if (componentPropTypes[propName]) {
      parentProps[propName] = propValue;
    } else {
      childProps[propName] = propValue;
    }
  });
  return [parentProps, childProps];
}

module.exports = exports["default"];