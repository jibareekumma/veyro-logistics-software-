

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { hasSession } from '../api/auth'
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../api/notifications'
import NotificationToasts from '../components/notifications/NotificationToasts'


const POLL_INTERVAL = 30000
const MAX_TOASTS = 3


const NotificationContext = createContext({
    items: [],
    unreadCount: 0,
    isLoaded: false,
    markRead: function(){},
    markAllRead: function(){},
    refresh: function(){}
})


const useNotifications = function(){
    return useContext(NotificationContext)
}


const NotificationProvider = function({ children }){

    const [items, setItems] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [toasts, setToasts] = useState([])

    const lastSeenId = useRef(null)

    const location = useLocation()
    const navigate = useNavigate()

    const dismissToast = function(id){
        setToasts(function(prev){
            return prev.filter(function(toast){ return toast.id !== id })
        })
    }

    const refresh = async function(){
        if (!hasSession()) {
            lastSeenId.current = null
            setItems([])
            setUnreadCount(0)
            setToasts([])
            setIsLoaded(false)
            return
        }

        try {
            const data = await getNotifications()
            const results = Array.isArray(data.results) ? data.results : []
            const newest = results.reduce(function(max, item){
                return item.id > max ? item.id : max
            }, 0)

            if (lastSeenId.current === null) {
                lastSeenId.current = newest
            } else {
                const fresh = results.filter(function(item){
                    return item.id > lastSeenId.current && !item.is_read
                })
                if (newest > lastSeenId.current) {
                    lastSeenId.current = newest
                }
                if (fresh.length > 0) {
                    setToasts(function(prev){
                        return [...fresh, ...prev].slice(0, MAX_TOASTS)
                    })
                }
            }

            setItems(results)
            setUnreadCount(data.unread_count || 0)
            setIsLoaded(true)
        } catch (error) {
            return
        }
    }

    const markRead = async function(id){
        const target = items.find(function(item){ return item.id === id })
        if (!target || target.is_read) {
            return
        }

        setItems(function(prev){
            return prev.map(function(item){
                return item.id === id ? { ...item, is_read: true } : item
            })
        })
        setUnreadCount(function(prev){
            return Math.max(0, prev - 1)
        })

        try {
            await markNotificationRead(id)
        } catch (error) {
            refresh()
        }
    }

    const markAllRead = async function(){
        setItems(function(prev){
            return prev.map(function(item){
                return { ...item, is_read: true }
            })
        })
        setUnreadCount(0)

        try {
            await markAllNotificationsRead()
        } catch (error) {
            refresh()
        }
    }

    const openToast = function(id){
        markRead(id)
        dismissToast(id)
        navigate('/notifications')
    }

    useEffect(function(){
        refresh()
    }, [location.pathname])

    useEffect(function(){
        const tick = function(){
            if (!document.hidden) {
                refresh()
            }
        }

        const onFocus = function(){
            refresh()
        }

        const timer = setInterval(tick, POLL_INTERVAL)
        window.addEventListener('focus', onFocus)

        return function(){
            clearInterval(timer)
            window.removeEventListener('focus', onFocus)
        }
    }, [])

    const value = {
        items: items,
        unreadCount: unreadCount,
        isLoaded: isLoaded,
        markRead: markRead,
        markAllRead: markAllRead,
        refresh: refresh
    }

    return <>

        <NotificationContext.Provider value={value}>
            {children}
            <NotificationToasts
                toasts={toasts}
                onDismiss={dismissToast}
                onOpen={openToast}
            />
        </NotificationContext.Provider>

    </>
}


export { NotificationProvider, useNotifications }