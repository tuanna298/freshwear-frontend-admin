import { NotificationItem } from '@/components/custom/notification-float'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { API_URL } from '../common/constants'
import http from '../configs/http.config'

const useNotificationSSE = () => {
	const [notifications, setNotifications] = useState<NotificationItem[]>([])

	const markNotificationAsRead = useMutation({
		mutationKey: ['markNotificationAsRead'],
		mutationFn: (id: number) => http.get(API_URL + '/notification/read/' + id),
	})

	const markAllNotificationAsRead = useMutation({
		mutationKey: ['markAllNotificationAsRead'],
		mutationFn: () => http.get(API_URL + '/notification/read-all'),
	})

	useEffect(() => {
		// Create EventSource connection
		const eventSource = new EventSource(
			'http://localhost:3000/sse/notifications',
		)

		// Handle incoming notifications
		eventSource.onmessage = (event) => {
			try {
				const newNotification: NotificationItem[] = JSON.parse(event.data)?.data
				setNotifications(newNotification)
			} catch (error) {
				console.error('Error parsing notification:', error)
			}
		}

		// Handle connection errors
		eventSource.onerror = (error) => {
			console.error('SSE connection error:', error)
			eventSource.close()
		}

		// Cleanup on component unmount
		return () => {
			eventSource.close()
		}
	}, [])

	return {
		notifications,
		markNotificationAsRead,
		markAllNotificationAsRead,
	}
}

export default useNotificationSSE
