// src/mocks/browser.js
import { setupWorker } from 'msw'
import { handlers } from '../mocks/handlers'
import { boot } from 'quasar/wrappers'
// This configures a Service Worker with the given request handlers.

export default boot(() => {
  const worker = setupWorker(...handlers)
  worker.start()
})
