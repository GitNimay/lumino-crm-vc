import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useAuth } from './AuthContext';

export interface AppNotification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
    link?: string;
}

interface NotificationContextType {
    notifications: AppNotification[];
    unreadCount: number;
    addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const { user } = useAuth();

    const unreadCount = notifications.filter(n => !n.read).length;

    const addNotification = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
        const newNotification: AppNotification = {
            ...notification,
            id: Math.random().toString(36).substring(7),
            timestamp: new Date(),
            read: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    useEffect(() => {
        if (!user) return;

        // Subscribe to Leads and Tasks changes
        const channel = supabase
            .channel('global-notifications')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'leads' },
                (payload: RealtimePostgresChangesPayload<any>) => {
                    // Removed user_id filter to ensure notifications appear for testing
                    if (payload.eventType === 'INSERT') {
                        const newLead = payload.new;
                        addNotification({
                            title: 'New Lead',
                            message: `${newLead.name || 'Unknown'} from ${newLead.company || 'Unknown Company'} was added.`,
                            type: 'success',
                            link: '/pipeline'
                        });
                    } else if (payload.eventType === 'UPDATE') {
                        const newLead = payload.new;
                        const oldLead = payload.old;
                        if (newLead.stage !== oldLead.stage) {
                            addNotification({
                                title: 'Lead Moved',
                                message: `${newLead.name} moved to ${newLead.stage}`,
                                type: 'info',
                                link: '/pipeline'
                            });
                        }
                    }
                }
            )
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'tasks' },
                (payload: RealtimePostgresChangesPayload<any>) => {
                    const newTask = payload.new;
                    addNotification({
                        title: 'New Task',
                        message: `${newTask.title} due on ${new Date(newTask.due_date).toLocaleDateString()}`,
                        type: 'info',
                        link: '/tasks'
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotification,
                markAsRead,
                markAllAsRead,
                clearNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
