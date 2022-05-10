import isbot from '..'
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

  function append (parent, tag, string) {
    if (tag) {
      const ele = document.createElement('kbd')
      ele.appendChild(document.createTextNode(string))
      parent.appendChild(ele)
    } else {
      parent.appendChild(document.createTextNode(string))
    }
  }

  function details (ua) {
    const fragment = document.createDocumentFragment()
    const is = isbot(ua)
    const found = is && isbot.find(ua)
    const pattern = found
        ? isbot.matches(ua)?.find(pattern => new RegExp(pattern, 'i').test(found))
        : null

    is
        ? append(fragment, null, 'I think so, yes\n')
        : append(fragment, null, 'I don\'t think so, no\nI could not find a pattern I recognise')
    found && append(fragment, null, 'The substring ')
    found && append(fragment, 'kbd', found)
    pattern && append(fragment, null, ' matches the pattern ')
    pattern && append(fragment, 'kbd', pattern)
    return fragment
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

    output.appendChild(details(value))

    output.className = ''
    setTimeout(() => { output.className = 'highlight' }, 100)
  }
}
