import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { IAlert } from '@/components/Alert/Alert'

export const AlertType = {
  Success: 'Success',
  Error: 'Error',
  Info: 'Info',
  Warning: 'Warning',
}

interface IAlertOptions {
  id?: string
  fade?: boolean
  autoClose?: boolean
  readonly itemId: string
}

const alertSubject = new Subject()
const defaultId = 'default-alert'

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
  return alertSubject
    .asObservable()
    .pipe(filter((item: IAlert) => item && item?.id === id))
}

// core alert method
const alert = (alert: IAlert) => {
  alert.id = alert.id || defaultId
  alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose
  alertSubject.next(alert)
}

// clear alerts
const clear = (id = defaultId) => {
  alertSubject.next({ id })
}

// convenience methods
const success = (message: string, options?: IAlertOptions) => {
  alert({ ...options, type: AlertType.Success, message })
}

const error = (message: string, options?: IAlertOptions) => {
  alert({
    ...options,
    type: AlertType.Error,
    message: message || 'Something went wrong',
  })
}

const info = (message: string, options?: IAlertOptions) => {
  alert({ ...options, type: AlertType.Info, message })
}

const warn = (message: string, options?: IAlertOptions) => {
  alert({ ...options, type: AlertType.Warning, message })
}

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear,
}
