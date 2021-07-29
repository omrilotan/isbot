import { Isbot } from './isbot/index.js'

const createInterface = instance => Object.defineProperties(
  function isbot(ua) {
    return instance.test(ua)
  },
  {
    find: { get: () => ua => instance.find(ua) },
    extend: { get: () => list => instance.extend(list) },
    exclude: { get: () => list => instance.exclude(list) },
    spawn: { get: () => list => createInterface(instance.spawn(list)) }
  }
)

const isbot = createInterface(new Isbot())

export default isbot
