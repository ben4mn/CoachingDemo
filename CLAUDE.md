# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Important:** Claude Code should operate from this `atlas-coaching-poc/` directory (not the parent folder) when making changes to the app.

## Project Overview

Atlas Coaching POC - A React 19 dashboard for an AI-powered sales coaching platform. Provides managers and ICs with coaching insights, team performance metrics, and conversation intelligence.

## Development Commands

```bash
npm run dev      # Start dev server with HMR (Vite)
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

**Note:** No test framework is configured.

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS 4 (via Vite plugin)
- ESLint 9 (flat config format)
- No TypeScript, no state management library

## Architecture

### Entry Points
- `src/main.jsx` - React entry, renders App into #root
- `src/App.jsx` - Root component with tab navigation state and chat sidebar overlay

### Component Structure

**Views** (`src/components/Dashboard/`):
- `ICView.jsx` - Individual contributor dashboard with metrics and coaching opportunities
- `ManagerView.jsx` - Team dashboard with sortable roster and risk indicators
- `ConversationPanel.jsx` - Call intelligence with sentiment analysis and coaching insights

**Chat** (`src/components/Chat/`):
- `AtlasChat.jsx` - Sidebar chat interface with suggested prompts and typing indicators

**Shared** (`src/components/Shared/`):
- `Header.jsx` - Top nav with "Ask Atlas" trigger
- `Navigation.jsx` - Tab routing (my-coaching, team-view, conversations)
- `MetricCard.jsx` - KPI display with trend indicators
- `CoachingItem.jsx` - Expandable coaching cards with type/priority/impact
- `SentimentBadge.jsx`, `QuartileBadge.jsx` - Status indicators

### Data Layer

Mock JSON files in `src/data/`:
- `mockUsers.json` - User profiles, metrics, team members, coaching items
- `mockCalls.json` - Call records with sentiment, quotes, objections, action items
- `chatResponses.json` - Predefined Q&A pairs for chat

### Styling

Custom theme colors defined in `src/index.css`:
- `--color-eg-blue: #000099` (primary/Expedia brand)
- `--color-pacific-blue: #4248ED` (secondary)
- `--color-midnight-blue: #020247` (dark)

## Key Patterns

- **Tab Navigation**: State-based routing via conditional rendering in App.jsx
- **Props-Only Data Flow**: No Redux/Context, components receive data via props
- **Expandable Sections**: CoachingItem uses local state for expand/collapse
- **Sidebar Overlay**: Chat panel uses fixed positioning with transition animations
