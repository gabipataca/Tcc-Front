# Tcc-Front: Academic Competition Management Dashboard

## Project Overview
Next.js 15 + TypeScript app for managing academic programming competitions. Supports admin, teacher, and student roles with real-time updates via SignalR WebSocket. Uses App Router with hybrid SSR/CSR patterns.

## Architecture Patterns

### Routing Structure
- **App Router** with route groups: `(auth)`, `admin`, `Competition`, `Profile`
- **API Routes** in `src/app/api/*/route.ts` act as BFF layer, proxying to backend with cookie handling
- **SSR Authentication**: `middleware.ts` validates JWT tokens server-side via `/Auth/validate` endpoint
- **Protected Routes**: Defined in `middleware.ts` with role-based access (`Admin`, `Teacher`, `Student`)

### Service Layer Architecture
Services in `src/services/*.ts` are static classes (no instances):
```typescript
class CompetitionService {
    static async getExistentCompetition() { /* ... */ }
}
```
- Use `apiRequest()` from `libs/apiClient.ts` for all HTTP calls
- Server-side routes receive cookies from `next/headers`, client-side from browser

### Context Providers (Global State)
Nested in `src/app/layout.tsx` in this order:
1. `ThemeRegistry` - MUI theme + Emotion cache
2. `SnackbarProviderC` - Notistack notifications
3. `UserContextProvider` - User data persisted to localStorage
4. `WebSocketContextProvider` - SignalR connection to `/hub/competition`
5. `CompetitionContextProvider` - Current competition state

**User Context Pattern**: `useUser()` hook provides `{ user, setUser }`. User stored in localStorage on mount/update.

### Type System
- **All types** in `src/types/` organized by domain (Auth, Competition, Exercise, etc.)
- **Request/Response pattern**: Separate `Requests.ts` and `Responses.ts` files
- **ServerSideResponse<T>**: Standard wrapper for API responses with `status`, `message`, `error`, `data`
- **PagedResult<T>**: Used for paginated endpoints

### Styling Approach
**Hybrid system**:
- **Tailwind CSS**: Layout, spacing, basic utilities (`className="w-full flex flex-col gap-2"`)
- **MUI Components**: Complex UI (@mui/material, @mui/x-data-grid)
- **Emotion/Styled**: Component-specific styles in `styles/index.tsx` files
- **SCSS Modules**: Some legacy components (e.g., `Button.module.scss`)

**Custom Styled Utility**: `src/utilities/styled.tsx` wraps MUI styled with prop filtering:
- Props prefixed with `$` are style props, not forwarded to DOM
- Example: `$secondary`, `$fullWidth`, `$rounded`

### Client/Server Boundary
- **"use client"** required for:
  - Components using hooks (useState, useEffect, useContext)
  - Event handlers (onClick, etc.)
  - MUI styled components
- **Server components** for layouts and pages where possible
- **API routes** always run server-side, never exposed to client

## Development Workflows

### Running Locally
```bash
npm run dev  # Starts with --experimental-https flag
```
Requires SSL certificates in `certificates/` folder for local HTTPS.

### Environment Variables
- **PRIVATE_API_URL**: Backend API URL for server-side requests
- **NEXT_PUBLIC_API_URL**: Backend API URL for client-side requests
- **NEXT_PUBLIC_API_URL_CUSTOM**: WebSocket hub URL (SignalR)

### Authentication Flow
1. User logs in via `/api/auth/login` (posts to backend `/Auth/Login`)
2. Backend returns JWT, API route sets `CompetitionAuthToken` httpOnly cookie
3. User data stored in `UserContext` + localStorage
4. Middleware validates on protected route access
5. WebSocket uses token from UserContext for SignalR auth

### Forms with react-hook-form
Standard pattern using `Controller`:
```tsx
<Controller
    name="fieldName"
    control={control}
    render={({ field, fieldState }) => (
        <Input error={fieldState.error} {...field} />
    )}
/>
```
Validation typically uses Yup or Zod schemas.

## Key Conventions

### Documentation
- **All documentation in English** regardless of code language (per `.github/instructions/docsTSInstructions.instructions.md`)
- **JSDoc style** for functions/classes with param and return descriptions
- **Interface properties**: Document each property inline within the interface

### Component Structure
```
ComponentName/
  index.tsx          # Main component export
  types/index.tsx    # TypeScript interfaces/types
  styles/index.tsx   # Styled components (if using Emotion)
  Component.module.scss  # SCSS module (legacy pattern)
```

### Import Aliases
```typescript
"@/*"        → "./src/*"
"@pages/*"   → "./src/components/pages/*"
```

### WebSocket Integration
SignalR connection established when user is authenticated:
- Hub URL: `${NEXT_PUBLIC_API_URL_CUSTOM}/hub/competition`
- Connection ID retrieved via `GetConnectionId` invocation
- Auto-reconnect enabled
- Access token factory returns user.token

### Role-Based Access
Three roles: `Admin`, `Teacher`, `Student`
- JWT claim key: `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`
- Parsed in `middleware.ts` from JWT token
- Protected routes array defines role requirements

## Common Patterns

### API Client Usage
```typescript
const response = await apiRequest<ResponseType, RequestType>(
    "/api/endpoint",
    {
        method: "POST",
        data: payload,
        // cookies auto-sent from browser or passed explicitly for SSR
    }
);
return response.data; // Handle ServerSideResponse<T>
```

### Snackbar Notifications
```typescript
const { enqueueSnackbar } = useSnackbar();
enqueueSnackbar("Message", { 
    variant: "success" | "error" | "warning",
    anchorOrigin: { vertical: "bottom", horizontal: "right" }
});
```

### Custom MUI Theme
Roboto font family defined in `src/theme.ts`, applied via `ThemeRegistry` wrapper using AppRouterCacheProvider.

## Testing & Linting
- **Linting**: `npm run lint` (ESLint with Next.js config)
- **No test suite** currently configured

## Deployment
Dockerfile uses multi-stage build:
1. Builder stage: npm install + build
2. Runner stage: production deps only, exposes port 3000

## External Dependencies
- **SignalR** (@microsoft/signalr): Real-time competition updates
- **MUI**: Primary component library
- **Tailwind**: Utility-first CSS
- **react-hook-form**: Form state management
- **notistack**: Snackbar notifications
- **axios**: HTTP client (wrapped in apiClient)

## SignalR Competition Hub Integration

### Context Architecture
The app uses `CompetitionHubProvider` (wraps `WebSocketContextProvider`) for real-time competition features:

**Location:** `src/contexts/CompetitionHubContext/`

**Specialized hooks available:**
- `useSubmissions()` - Exercise submission management and stats
- `useQuestions()` - Q&A system with real-time updates
- `useRanking()` - Live ranking calculation from submissions
- `useCompetitionStatus()` - Competition state, timers, connection status
- `useAdminActions()` - Admin/Teacher actions (change verdicts, block groups)

### Important Hub Patterns

**Async Processing:** Submissions are queued and processed by a background worker. Do NOT expect immediate response from `sendExerciseAttempt()`. Listen for `ReceiveExerciseAttemptResponse` event.

**Event Listeners:** All SignalR events are auto-registered in `CompetitionHubContext`. Check console logs with emojis (📡, 📝, ❓, 💬) for debugging.

**Types Location:** `src/types/SignalR/` contains all request/response types matching backend hub.

**Example Usage:**
```typescript
const { sendExerciseAttempt } = useSubmissions();
await sendExerciseAttempt({
  groupId: user.group.id,
  exerciseId: 1,
  languageType: 4, // Python
  code: "print('Hello')",
  competitionId: competition.id,
});
// Response comes via ReceiveExerciseAttemptResponse event
```

See `docs/SIGNALR_FRONTEND_IMPLEMENTATION.md` for complete implementation guide.
