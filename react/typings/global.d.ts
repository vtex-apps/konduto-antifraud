/* Typings for `Konduto` */
export interface Konduto {
  sendEvent: Function
  getVisitorID: Function
}
export interface VTEX {
  deviceFingerprint: string
}

declare global {
  const Konduto: Konduto
  const vtex: VTEX
}
