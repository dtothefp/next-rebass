import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n  margin: 0;\n  ", "\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  display: flex;\n  ", "\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

import React from "react";
import { memo } from 'react';
import { flexbox, spacing } from '@material-ui/system';
import styled from 'styled-components';
const FlexContainer = styled.form(_templateObject(), flexbox);
const Item = styled.p(_templateObject2(), spacing);
export default memo(function Item({
  eventName,
  name,
  destination
}) {
  return React.createElement(FlexContainer, null, React.createElement("div", null, React.createElement(Item, null, eventName)), React.createElement("div", null, React.createElement(Item, null, name)), React.createElement("div", null, React.createElement(Item, null, destination)));
});