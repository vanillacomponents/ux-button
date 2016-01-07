import 'browserenv'
import 'utilise'
import { expect } from 'chai'
import test from 'tape'
import button from './ux-button'
const strip = ([ str ]) => str.replace(/[\s]{2,}/gim, '')

test('unit test - simple', t => {
  t.plan(1)

  const host = el('ux-button')
  button.call(host, { label: 'foo' })

  t.equal(host.outerHTML, strip`
    <ux-button tabindex="-1" class="">
      <span>foo</span>
      <div class="spinner"></div>
    </ux-button>
  `)
})

test('unit test - spinning', t => {
  t.plan(1)

  const host = el('ux-button')
  button.call(host, { label: 'foo', spinning: true })

  t.equal(host.outerHTML, strip`
    <ux-button tabindex="-1" class="is-spinning">
      <span>foo</span>
      <div class="spinner"></div>
    </ux-button>
  `)
})

test('api test - spin', t => {
  t.plan(2)

  const host = draw(el('ux-button'), button, { label: 'foo', spinning: true })

  host.spin(true)

  t.equal(host.outerHTML, strip`
    <ux-button tabindex="-1" class="is-spinning">
      <span>foo</span>
      <div class="spinner"></div>
    </ux-button>
  `)

  host.spin(false)

  t.equal(host.outerHTML, strip`
    <ux-button tabindex="-1" class="">
      <span>foo</span>
      <div class="spinner"></div>
    </ux-button>
  `)
})

function draw(host, fn, state) {
  host.state = state
  host.draw = d => fn.call(host, host.state)
  host.draw()
  return host
}