import isbot from '../src/index.js'
import { amend } from '../src/amend/index.js'
import list from '../src/list.json'

(function () {
  const textarea = document.querySelector('textarea')
  const output = document.querySelector('output')
  let timer

  const query = window.location.search.replace(/\?ua=(.*)$/, '$1')

  amend(list)
  const pattern = new RegExp(list.join('|'), 'i')

  textarea.innerHTML = query
    ? decodeURIComponent(query)
    : navigator.userAgent
  textarea.addEventListener('keyup', change)
  textarea.addEventListener('paste', change)
  textarea.addEventListener('focus', () => textarea.select())
  check()

  function change ({ target: { value } }) {
    clearTimeout(timer)
    timer = setTimeout(check, 200, value)
  }

  function check (value = textarea.innerHTML) {
    value = value.trim()
    output.childNodes.forEach(child => child.parentNode?.removeChild(child))
    if (value === '') {
      output.appendChild(
        document.createTextNode(
          'Insert user agent string in the text box'
        )
      )
      return
    }

    const result = isbot(value)
    output.appendChild(
      document.createTextNode(
        result
          ? `I think so, yes\nThe pattern that I recognise is "${find(value)}"`
          : 'I don\'t think so, no\nI could not find a pattern I recognise'
      )
    )

    output.className = ''
    setTimeout(() => { output.className = 'highlight' }, 100)
  }

  function find (ua) {
    const match = ua.match(pattern)
    return match && match[0]
  }
})()
