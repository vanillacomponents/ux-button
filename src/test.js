import 'utilise'
import 'browserenv'
import test from 'tape'
import scope from 'cssscope'
import button from './ux-button'

const style = window.getComputedStyle
    , o = once(document.body)('.container', 1)

once(document.head)
  ('style', 1)
    .html(scope(file('dist/ux-button.css'), 'ux-button'))

test('unit test - simple', t => {
  t.plan(1)

  const host = o('ux-button', 1).node()
  button.call(host, { label: 'foo' })

  t.equal(host.outerHTML, stripws`
    <ux-button tabindex="-1">
      <span>foo</span>
      <div class="spinner"></div>
    </ux-button>
  `, 'basic structure')

  o.html('')
})

test('unit test - spinning', t => {
  t.plan(2)

  const host = o('ux-button', 1).node()
  button.call(host, { label: 'foo', spinning: true })

  t.ok(includes(`class="is-spinning"`)(host.outerHTML), 'has class')
  t.ok(includes(`<span>foo</span>`)(host.outerHTML), 'has label')

  o.html('')
})

test('api test - spin', t => {
  t.plan(4)

  const host = tdraw(o('ux-button', 1).node(), button, { label: 'foo', spinning: true })

  time(  0, d => host.spin(true))
  time(300, d => {
    t.ok(includes(`class="is-spinning"`)(host.outerHTML), 'adds class')
    t.equal(style(raw('.spinner', host)).opacity, '1', 'style opaque')
  })

  time(310, d => host.spin(false))
  time(600, d => {
    t.notOk(includes(`class="is-spinning"`)(host.outerHTML), 'removes class')
    t.equal(style(raw('.spinner', host)).opacity, '0', 'style transparent')
  })

  o.html('')
})