'use client'
import { useState, useEffect, useRef } from 'react'
import { alertService, AlertType } from '@/services/alerts-service'
import { v4 as uuidv4 } from 'uuid'

interface IAlertProps {
  id?: string
  fade?: boolean
}

export interface IAlert extends IAlertProps {
  type: string
  autoClose?: boolean
  itemId: string
  message: string
}

function Alert({ id = 'default-alert', fade = true }: IAlertProps) {
  const mounted = useRef<boolean>(false)
  const [alerts, setAlerts] = useState<IAlert[]>([])

  useEffect(() => {
    mounted.current = true

    // subscribe to new alert notifications
    const subscription = alertService.onAlert(id).subscribe((alert: IAlert) => {
      // clear alerts when an empty alert is received
      if (alert?.message) {
        // add alert to array with unique id
        alert.itemId = uuidv4()
        setAlerts((alerts) => [...alerts, alert])

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => removeAlert(alert), 3000)
        }
      }
    })

    // clean up function that runs when the component unmounts
    return () => {
      mounted.current = false

      // unsubscribe to avoid memory leaks
      subscription.unsubscribe()
    }
  }, [])

  const handleRemoveAlert = (alert: IAlert) => () => {
    setAlerts((alerts) => alerts.filter((item) => item.itemId !== alert.itemId))
  }

  function removeAlert(alert) {
    if (!mounted.current) return
    if (fade) {
      // fade out alert
      setAlerts((alerts) =>
        alerts.map((x) =>
          x.itemId === alert.itemId ? { ...x, fade: true } : x
        )
      )

      // remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId))
      }, 1000)
    } else {
      // remove alert
      setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId))
    }
  }

  function cssClasses(alert: IAlert) {
    if (!alert) return
    const classes = [
      'alert',
      'px-4 py-3 rounded relative flex hover:cursor-pointer',
    ]

    const alertTypeClass = {
      [AlertType.Success]:
        'bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md [&>span]:text-teal-900 [&>svg]:text-teal-500',
      [AlertType.Error]: 'bg-red-100 border border-red-400 text-red-700',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning',
    }

    classes.push(alertTypeClass[alert.type])

    if (alert.fade) {
      classes.push('fade')
    }

    return classes.join(' ')
  }

  if (!alerts.length) return null

  return (
    <div
      className={'fixed flex flex-col z-40 bottom-10 right-5 item-center gap-2'}
    >
      {alerts.map((alert, index) => (
        <div
          key={`${index + 'alert-' + alert.itemId}`}
          className={cssClasses(alert)}
          onClick={handleRemoveAlert(alert)}
        >
          <svg
            className="fill-current h-6 w-6 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
          <span className={'alert'}>{alert.message}</span>
        </div>
      ))}
    </div>
  )
}

export default Alert
