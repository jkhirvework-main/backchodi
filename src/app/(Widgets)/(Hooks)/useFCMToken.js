'use client'
import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseApp from '../../../../firebase';
import { addFcmToken } from '@/app/user/actions/UserAction';

const useFcmToken = () => {
    const [token, setToken] = useState('');
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                    const messaging = getMessaging(firebaseApp);

                    // Request notification permission
                    const permission = await Notification.requestPermission();
                    setNotificationPermissionStatus(permission);

                    if (permission === 'granted') {
                        const currentToken = await getToken(messaging, {
                            vapidKey: 'BFYMbIdpLzBj1jyp-_H1o_KAO5BjmL6eF4lX9iet5T5UBkn_pLxwD-S7KECUsc5jJgnwbN3rRBstGQJQ3fQlNVI', // Replace with your Firebase project's VAPID key
                        });


                        if (currentToken) {
                            await addFcmToken(currentToken);
                            setToken(currentToken);
                        } else {
                            console.log('No registration token available. Request permission to generate one.');
                        }
                    }
                }
            } catch (error) {
                console.log('Error retrieving token:', error);
            }
        };

        retrieveToken();
    }, []);

    return { token, notificationPermissionStatus };
};

export default useFcmToken;