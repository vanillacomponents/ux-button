'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uxButton;
function uxButton(state) {
  var o = once(this);
  var label = state.label;
  var spinning = state.spinning;

  defaults(this, { spin: spin });

  o.attr('tabindex', '-1').classed('is-spinning', spinning);

  o('span', 1).text(label);

  o('.spinner', 1);

  function spin(spinning) {
    state.spinning = spinning;
    o.draw();
  }
}