export default function uxButton(state) {
  const o = once(this)
      , { label, spinning } = state

  defaults(this, { spin })

  o.attr('tabindex', '-1')
    .classed('is-spinning', spinning)
    
  o('span', 1)
    .text(label)

  o('.spinner', 1)

  function spin(spinning) {
    state.spinning = spinning
    o.draw()
  }
}