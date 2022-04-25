import isbot from '../src/index.js'
import { amend } from '../src/amend/index.js'
import list from '../src/list.json'

{
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

  function append(parent, tag, string) {
    if (tag) {
        const ele = document.createElement('kbd')
        ele.appendChild(document.createTextNode(string))
        parent.appendChild(ele)
    } else {
        parent.appendChild(document.createTextNode(string))
    }
  }

  function showMatch (output, ua) {
    const fragment = document.createDocumentFragment()
    append(fragment, null, 'I think so, yes\n')
    append(fragment, null, 'The substring ')
    append(fragment, 'kbd', isbot.find(ua))
    append(fragment, null, ' matches the pattern ')
    append(fragment, 'kbd', isbot.matches(ua)?.pop())
    output.appendChild(fragment)
  }
  function noMatch (output) {
    output.appendChild(
      document.createTextNode(
        'I don\'t think so, no\nI could not find a pattern I recognise'
      )
    )
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

    isbot(value)
      ? showMatch(output, value)
      : noMatch(output)

    output.className = ''
    setTimeout(() => { output.className = 'highlight' }, 100)
  }
}
