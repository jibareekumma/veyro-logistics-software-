

import { useNotifications } from '../../context/NotificationContext'

import "../../stylings/notifications/NotificationDot.scss"


const NotificationDot = function({ className }){

    const { unreadCount } = useNotifications()

    if (unreadCount === 0) {
        return null
    }

    return <>

        <span
            className={className ? `notif-dot ${className}` : 'notif-dot'}
            aria-label={`${unreadCount} unread notifications`}
        ></span>

    </>
}


export default NotificationDot;