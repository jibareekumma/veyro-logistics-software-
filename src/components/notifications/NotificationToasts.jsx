

import { useEffect } from 'react'

import "../../stylings/notifications/NotificationToasts.scss"


const TOAST_DURATION = 5000


const Toast = function({ toast, onDismiss, onOpen }){

    useEffect(function(){
        const timer = setTimeout(function(){
            onDismiss(toast.id)
        }, TOAST_DURATION)

        return function(){
            clearTimeout(timer)
        }
    }, [toast.id])

    const handleClose = function(e){
        e.stopPropagation()
        onDismiss(toast.id)
    }

    return <>

        <div
            className="notification-toast"
            role="status"
            onClick={function(){ onOpen(toast.id) }}
        >

            <div className="toast-text">
                <h5>{toast.title}</h5>
                <p>{toast.message}</p>
            </div>

            <button
                type="button"
                className="toast-close"
                aria-label="Dismiss notification"
                onClick={handleClose}
            >
                ×
            </button>

            <span className="toast-progress"></span>

        </div>

    </>
}


const NotificationToasts = function({ toasts, onDismiss, onOpen }){

    if (toasts.length === 0) {
        return null
    }

    return <>

        <div className="notification-toasts" aria-live="polite">
            {toasts.map(function(toast){
                return (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onDismiss={onDismiss}
                        onOpen={onOpen}
                    />
                )
            })}
        </div>

    </>
}


export default NotificationToasts;