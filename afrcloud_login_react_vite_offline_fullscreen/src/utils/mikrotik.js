const isPlaceholder = (v) => {
  if (typeof v !== 'string') return true
  const t = v.trim()
  if (!t) return true
  // MikroTik variables are like $(something)
  return t.startsWith('$(') && t.endsWith(')')
}

export function getMT() {
  const MT = window.MT || {}
  return {
    // Branding
    identity: !isPlaceholder(MT.identity) ? MT.identity : "AFRCloud-NET",

    // Links
    linkLoginOnly: !isPlaceholder(MT.linkLoginOnly) ? MT.linkLoginOnly : '#',
    linkLogin: !isPlaceholder(MT.linkLogin) ? MT.linkLogin : '',
    linkLogout: !isPlaceholder(MT.linkLogout) ? MT.linkLogout : '',
    linkStatus: !isPlaceholder(MT.linkStatus) ? MT.linkStatus : '',
    linkRedirect: !isPlaceholder(MT.linkRedirect) ? MT.linkRedirect : '',

    // Dest/original
    linkOrig: !isPlaceholder(MT.linkOrig) ? MT.linkOrig : '',
    linkOrigEsc: !isPlaceholder(MT.linkOrigEsc) ? MT.linkOrigEsc : '',

    // CHAP
    chapId: !isPlaceholder(MT.chapId) ? MT.chapId : '',
    chapChallenge: !isPlaceholder(MT.chapChallenge) ? MT.chapChallenge : '',

    // Errors
    error: !isPlaceholder(MT.error) ? MT.error : '',
    errorOrig: !isPlaceholder(MT.errorOrig) ? MT.errorOrig : '',

    // User/session info
    trial: !isPlaceholder(MT.trial) ? MT.trial : '',
    username: !isPlaceholder(MT.username) ? MT.username : '',
    ip: !isPlaceholder(MT.ip) ? MT.ip : '',
    mac: !isPlaceholder(MT.mac) ? MT.mac : '',
    macEsc: !isPlaceholder(MT.macEsc) ? MT.macEsc : '',
    bytesIn: !isPlaceholder(MT.bytesIn) ? MT.bytesIn : '',
    bytesOut: !isPlaceholder(MT.bytesOut) ? MT.bytesOut : '',
    remainBytesIn: !isPlaceholder(MT.remainBytesIn) ? MT.remainBytesIn : '',
    remainBytesOut: !isPlaceholder(MT.remainBytesOut) ? MT.remainBytesOut : '',
    uptime: !isPlaceholder(MT.uptime) ? MT.uptime : '',
    sessionTimeLeft: !isPlaceholder(MT.sessionTimeLeft) ? MT.sessionTimeLeft : '',
    refreshTimeout: !isPlaceholder(MT.refreshTimeout) ? MT.refreshTimeout : ''
  }
}

export { isPlaceholder }
