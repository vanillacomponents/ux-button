'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <ux-button tabindex="-1">\n      <span>foo</span>\n      <div class="spinner"></div>\n    </ux-button>\n  '], ['\n    <ux-button tabindex="-1">\n      <span>foo</span>\n      <div class="spinner"></div>\n    </ux-button>\n  ']);

require('utilise');

require('browserenv');

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _cssscope = require('cssscope');

var _cssscope2 = _interopRequireDefault(_cssscope);

var _uxButton = require('./ux-button');

var _uxButton2 = _interopRequireDefault(_uxButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var style = window.getComputedStyle,
    o = once(document.body)('.container', 1);

once(document.head)('style', 1).html((0, _cssscope2.default)(file('dist/ux-button.css'), 'ux-button'));

(0, _tape2.default)('unit test - simple', function (t) {
  t.plan(1);

  var host = o('ux-button', 1).node();
  _uxButton2.default.call(host, { label: 'foo' });

  t.equal(host.outerHTML, stripws(_templateObject), 'basic structure');

  o.html('');
});

(0, _tape2.default)('unit test - spinning', function (t) {
  t.plan(2);

  var host = o('ux-button', 1).node();
  _uxButton2.default.call(host, { label: 'foo', spinning: true });

  t.ok(includes('class="is-spinning"')(host.outerHTML), 'has class');
  t.ok(includes('<span>foo</span>')(host.outerHTML), 'has label');

  o.html('');
});

(0, _tape2.default)('api test - spin', function (t) {
  t.plan(4);

  var host = tdraw(o('ux-button', 1).node(), _uxButton2.default, { label: 'foo', spinning: true });

  time(0, function (d) {
    return host.spin(true);
  });
  time(300, function (d) {
    t.ok(includes('class="is-spinning"')(host.outerHTML), 'adds class');
    t.equal(style(raw('.spinner', host)).opacity, '1', 'style opaque');
  });

  time(310, function (d) {
    return host.spin(false);
  });
  time(600, function (d) {
    t.notOk(includes('class="is-spinning"')(host.outerHTML), 'removes class');
    t.equal(style(raw('.spinner', host)).opacity, '0', 'style transparent');
  });

  o.html('');
});