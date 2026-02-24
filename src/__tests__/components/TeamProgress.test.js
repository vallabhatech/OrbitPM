import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamProgress from '../components/TeamProgress';

// Mock the hooks
jest.mock('../hooks/useFirestoreData', () => ({
  useTeamMembersList: jest.fn(),
}));

// Mock Nivo charts
jest.mock('@nivo/bar', () => ({
  ResponsiveBar: ({ data, indexBy, keys }) => (
    <div data-testid="responsive-bar">
      <div data-testid="bar-data">{JSON.stringify(data)}</div>
      <div data-testid="bar-index">{indexBy}</div>
      <div data-testid="bar-keys">{JSON.stringify(keys)}</div>
    </div>
  ),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock dicebear API
jest.mock('../utils/avatar', () => ({
  getAvatarUrl: (name) => `https://mock-avatar.com/${name}`,
}));

import { showToast } from '../utils/toast';
jest.mock('../utils/toast');

describe('TeamProgress Component', () => {
  const mockTeamMembers = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Frontend Developer',
      notes: 'Working on dashboard',
      completed: 5,
      inProgress: 2,
      pending: 1,
      blocked: 0,
      progress: 75,
      performance: 85,
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Backend Developer',
      notes: 'API integration',
      completed: 3,
      inProgress: 3,
      pending: 2,
      blocked: 1,
      progress: 60,
      performance: 92,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    showToast.success = jest.fn();
    showToast.error = jest.fn();
    showToast.firebaseError = jest.fn();
  });

  test('renders team member cards correctly', async () => {
    const { useTeamMembersList } = require('../hooks/useFirestoreData');
    useTeamMembersList.mockReturnValue({
      data: mockTeamMembers,
      isLoading: false,
      error: null,
    });

    render(<TeamProgress />);

    await waitFor(() => {
      expect(screen.getByText('Team Progress')).toBeInTheDocument();
    });

    // Check if team member names are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Check if roles are rendered
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  test('displays loading state correctly', async () => {
    const { useTeamMembersList } = require('../hooks/useFirestoreData');
    useTeamMembersList.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<TeamProgress />);

    // Should show loading spinner
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  test('displays error state correctly', async () => {
    const { useTeamMembersList } = require('../hooks/useFirestoreData');
    useTeamMembersList.mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error('Failed to fetch team members'),
    });

    render(<TeamProgress />);

    // Should show error toast
    await waitFor(() => {
      expect(showToast.firebaseError).toHaveBeenCalledWith(
        expect.any(Error),
        'Failed to load team members'
      );
    });
  });

  test('calculates task completion metrics correctly', async () => {
    const { useTeamMembersList } = require('../hooks/useFirestoreData');
    useTeamMembersList.mockReturnValue({
      data: mockTeamMembers,
      isLoading: false,
      error: null,
    });

    render(<TeamProgress />);

    await waitFor(() => {
      // Check task counts for first member
      expect(screen.getByText('5')).toBeInTheDocument(); // completed
      expect(screen.getByText('2')).toBeInTheDocument(); // in progress
      expect(screen.getByText('1')).toBeInTheDocument(); // pending
      expect(screen.getByText('0')).toBeInTheDocument(); // blocked
      
      // Check progress percentage
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });

  test('renders productivity chart without crashing', async () => {
    const { useTeamMembersList } = require('../hooks/useFirestoreData');
    useTeamMembersList.mockReturnValue({
      data: mockTeamMembers,
      isLoading: false,
      error: null,
    });

    render(<TeamProgress />);

    await waitFor(() => {
      const chart = screen.getByTestId('responsive-bar');
      expect(chart).toBeInTheDocument();
      
      // Verify chart data is passed correctly
      const chartData = screen.getByTestId('bar-data');
      expect(chartData).toBeInTheDocument();
    });
  });

  test('displays star for high performers', async () => {
    const highPerformer = {
      ...mockTeamMembers[0],
      performance: 95, // Above 90 threshold
    };

    const { useTeamMembersList } = require('../hooks/useFirestoreData');
    useTeamMembersList.mockReturnValue({
      data: [highPerformer],
      isLoading: false,
      error: null,
    });

    render(<TeamProgress />);

    await waitFor(() => {
      // Star icon should be present for high performers
      const starIcon = document.querySelector('[data-testid="star-icon"]');
      expect(starIcon).toBeInTheDocument();
    });
  });

  test('handles empty team data gracefully', async () => {
    const { useTeamMembersList } = require('../hooks/useFirestoreData');
    useTeamMembersList.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<TeamProgress />);

    await waitFor(() => {
      expect(screen.getByText('Team Progress')).toBeInTheDocument();
      
      // Should show empty state message
      expect(screen.getByText(/no team members/i)).toBeInTheDocument();
    });
  });

  test('member cards have correct accessibility attributes', async () => {
    const { useTeamMembersList } = require('../hooks/useFirestoreData');
    useTeamMembersList.mockReturnValue({
      data: mockTeamMembers,
      isLoading: false,
      error: null,
    });

    render(<TeamProgress />);

    await waitFor(() => {
      const memberCards = screen.getAllByTestId('member-card');
      expect(memberCards.length).toBe(2);
      
      // Check for proper ARIA labels
      memberCards.forEach((card, index) => {
        expect(card).toHaveAttribute('role', 'article');
        expect(card).toHaveAttribute('aria-label', expect.stringContaining(mockTeamMembers[index].name));
      });
    });
  });
});
