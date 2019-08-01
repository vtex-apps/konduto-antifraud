import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

function setKondutoFingerPrint(category_page: string) {
  var kdtFP = Konduto.getVisitorID()
  if (vtex) {
    vtex.deviceFingerprint = kdtFP
    Konduto.sendEvent('page', category_page)
  }
}

function handlePageEvent(eventType: string) {
  switch (eventType) {
    case 'homeView': {
      setKondutoFingerPrint('home')
      break
    }
    case 'productView': {
      setKondutoFingerPrint('product')
      break
    }
    case 'departmentView':
    case 'categoryView': {
      setKondutoFingerPrint('category')
      break
    }
    case 'accountView': {
      setKondutoFingerPrint('account')
      break
    }
    case 'internalSiteSearchView': {
      setKondutoFingerPrint('search')
      break
    }
  }
}

function handleAccountEvent(eventName: string) {
  switch (eventName) {
    case 'accountCreation': {
      setKondutoFingerPrint('account_creation')
      break
    }
    case 'passwordReset': {
      setKondutoFingerPrint('password_reset')
      break
    }
  }
}

export function handleEvents(e: PixelMessage) {
  const {
    data: { eventName, eventType },
  } = e
  var period = 300
  var limit = 20 * 1e3
  var nTry = 0
  var intervalID = setInterval(function() {
    var clear = limit / period <= ++nTry
    if (typeof Konduto !== 'undefined' && Konduto.sendEvent) {
      handlePageEvent(eventType)
      handleAccountEvent(eventName)
      clear = true
    }
    if (clear) {
      clearInterval(intervalID)
    }
  }, period)
}

if (canUseDOM) window.addEventListener('message', handleEvents)
