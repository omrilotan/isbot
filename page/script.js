import isbot from '../src/index.js'
import { amend } from '../src/amend/index.js'
import list from '../src/list.json'

(function () {
  const textarea = document.querySelector('textarea')
  const output = document.querySelector('output')
  let timer

  const query = window.location.search.replace(/\?ua=(.*)$/, '$1')

  amend(list)

  textarea.childNodes.forEach(child => child.parentNode?.removeChild(child))
  textarea.appendChild(document.createTextNode(
    query
      ? decodeURIComponent(query)
      : navigator.userAgent
  )
  )
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
    while (output.firstChild) {
      output.removeChild(output.firstChild)
    }
    if (value === '') {
      output.appendChild(
        document.createTextNode(
          'Insert user agent string in the text box'
        )
      )
      return
    }

    if (isbot(value)) {
      const pattern = document.createElement('kbd')
      pattern.appendChild(
        document.createTextNode(isbot.matches(value)?.pop())
      )
      output.appendChild(
        document.createTextNode(
          'I think so, yes\nThe pattern that was matched is: '
        )
      )
      output.appendChild(pattern)
    } else {
      output.appendChild(
        document.createTextNode(
          'I don\'t think so, no\nI could not find a pattern I recognise'
        )
      )
    }

    output.className = ''
    setTimeout(() => { output.className = 'highlight' }, 100)
  }
})()
