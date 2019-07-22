import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

function setKondutoFingerPrint(category_page: string) {
	var kdtFP = Konduto.getVisitorID()
	if (vtex && vtex.deviceFingerprint) {
		vtex.deviceFingerprint = kdtFP
		Konduto.sendEvent('page', category_page)
		console.log('entrou na ', category_page)
	}
}

export function handleEvents(e: PixelMessage) {
	var period = 300
	var limit = 20 * 1e3
	var nTry = 0
	var intervalID = setInterval(function() {
		var clear = limit / period <= ++nTry
		if (typeof Konduto !== 'undefined' && Konduto.sendEvent) {
			switch (e.data.eventName) {
				case 'vtex:homeView': {
					setKondutoFingerPrint('home')
				}
				case 'vtex:productView': {
					setKondutoFingerPrint('product')
				}
			}
			clear = true
		}
		if (clear) {
			clearInterval(intervalID)
		}
	}, period)
}

if (canUseDOM) window.addEventListener('message', handleEvents)
