import { useQuery } from '@tanstack/react-query';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import db from '../firebase-config';

// Custom hooks for optimized Firestore data fetching

export const useProjectInfo = () => {
  return useQuery({
    queryKey: ['project', 'info'],
    queryFn: async () => {
      const projectDoc = await getDoc(doc(db, 'project', 'info'));
      return projectDoc.exists() ? projectDoc.data() : null;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes - project info changes rarely
    cacheTime: 60 * 60 * 1000, // 1 hour cache
    refetchOnWindowFocus: false,
  });
};

export const useTasksByStatus = (status) => {
  return useQuery({
    queryKey: ['tasks', status],
    queryFn: async () => {
      const statusDoc = await getDoc(doc(db, 'tasks', status));
      return statusDoc.exists() ? statusDoc.data().items || [] : [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes - tasks change more frequently
    cacheTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
    enabled: !!status,
  });
};

export const useAllTasks = () => {
  const statuses = ['completed', 'active', 'pending', 'blocked'];
  
  return useQuery({
    queryKey: ['tasks', 'all'],
    queryFn: async () => {
      const tasksData = {};
      for (const status of statuses) {
        try {
          const statusDoc = await getDoc(doc(db, 'tasks', status));
          tasksData[status] = statusDoc.exists() ? statusDoc.data().items || [] : [];
        } catch (error) {
          console.error(`Error fetching ${status} tasks:`, error);
          tasksData[status] = [];
        }
      }
      return tasksData;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team_members'],
    queryFn: async () => {
      const membersSnapshot = await getDocs(collection(db, 'team_members'));
      const members = {};
      membersSnapshot.forEach(doc => {
        members[doc.id] = doc.data();
      });
      return members;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes - team members change rarely
    cacheTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
  });
};

export const useTeamMembersList = () => {
  return useQuery({
    queryKey: ['team_members', 'list'],
    queryFn: async () => {
      const membersSnapshot = await getDocs(collection(db, 'team_members'));
      return membersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
  });
};

export const useCalendarEvents = (memberId) => {
  return useQuery({
    queryKey: ['calendar', memberId],
    queryFn: async () => {
      if (!memberId) return null;
      const calendarDoc = await getDoc(doc(db, 'calendar', memberId));
      return calendarDoc.exists() ? calendarDoc.data().events || [] : [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - calendar events change frequently
    cacheTime: 10 * 60 * 1000, // 10 minutes cache
    refetchOnWindowFocus: false,
    enabled: !!memberId,
  });
};

export const useAllCalendarEvents = (teamMembers) => {
  return useQuery({
    queryKey: ['calendar', 'all'],
    queryFn: async () => {
      if (!teamMembers || teamMembers.length === 0) return {};
      
      const events = {};
      for (const member of teamMembers) {
        try {
          const calendarDoc = await getDoc(doc(db, 'calendar', member.id));
          if (calendarDoc.exists()) {
            events[member.id] = calendarDoc.data().events || [];
          }
        } catch (error) {
          console.error(`Error fetching calendar for ${member.name}:`, error);
          events[member.id] = [];
        }
      }
      return events;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes cache
    refetchOnWindowFocus: false,
    enabled: !!(teamMembers && teamMembers.length > 0),
  });
};

export const useChatMessages = (userId) => {
  return useQuery({
    queryKey: ['chats', userId, 'messages'],
    queryFn: async () => {
      if (!userId) return [];
      const chatRef = collection(db, 'chats', userId, 'messages');
      const snapshot = await getDocs(chatRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    staleTime: 60 * 1000, // 1 minute - chat messages are real-time
    cacheTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};
