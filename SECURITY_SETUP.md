# Firebase Security Setup Guide

## Environment Variables Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual Firebase configuration values in `.env`:
   - Get these values from your Firebase Console → Project Settings
   - Replace placeholder values with your actual Firebase project details

## Firebase Authentication Setup

The new security rules require Firebase Authentication to be enabled:

1. Enable Firebase Authentication in your Firebase Console
2. Configure authentication providers (Email/Password, Google, etc.)
3. Update your application to handle user authentication

## Security Rules Overview

### Role-Based Access Control (RBAC)

The new `firestore.rules` implement:

- **Authentication Required**: All operations require authenticated users
- **Project Member Access**: Users must be in `team_members` collection to access project data
- **Personal Data Isolation**: Users can only access their own calendar and chat data
- **Team Calendar Access**: Project members can read other team members' calendars for scheduling

### Collection Access Rules

| Collection | Read Access | Write Access | Notes |
|------------|-------------|--------------|-------|
| `project/info` | Project members only | Denied (admin only) | Project metadata |
| `tasks/{status}` | Project members only | Project members only | Task management |
| `team_members/{id}` | All authenticated users | Document owner only | Team profiles |
| `calendar/{memberId}` | Owner + project members | Document owner only | Scheduling |
| `chats/{userId}` | Document owner only | Document owner only | Private messages |

## Data Structure Requirements

### Team Member Document Structure
```javascript
{
  name: "User Name",
  role: "Developer",
  notes: "Optional notes",
  // Add any additional fields needed
}
```

### Project Info Document Structure
```javascript
{
  status: {
    progress_percent: 75,
    next_milestone: "Feature Release",
    blockers: "API integration pending"
  },
  // Add project-specific fields
}
```

## Migration Steps

1. **Set up Firebase Authentication** before deploying new rules
2. **Create user accounts** for all team members
3. **Populate team_members collection** with user IDs as document IDs
4. **Update application code** to handle authentication state
5. **Test access patterns** before deploying to production

## Security Best Practices

- Environment variables are now properly isolated and not committed to version control
- All database access requires authentication
- Users can only access their own private data
- Project data is restricted to verified team members
- Default-deny policy for all unspecified collections

## Testing the Rules

Use the Firebase Console Firestore Rules Simulator to test:
1. Unauthenticated access (should be denied)
2. Authenticated user access to team data
3. Cross-user data access (should be denied)
4. Project member vs non-member access patterns
