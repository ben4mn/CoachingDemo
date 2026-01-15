# Atlas Coaching POC

A functional prototype that defines requirements for an AI-powered sales coaching platform through demonstration rather than documentation.

## Why This Exists

Traditional software development relies on Business Requirements Documents (BRDs) - lengthy written specifications that attempt to describe what software should do. This approach has well-known problems:

- **Interpretation gaps** between what's written and what's built
- **Stakeholder misalignment** discovered late in development
- **Expensive iteration cycles** when requirements are misunderstood
- **Abstract descriptions** that fail to capture UX nuances

**This POC flips that model.** Instead of writing about what we want, we built a working prototype that *shows* what we want. Stakeholders can click through real interfaces, experience actual workflows, and provide feedback on tangible interactions - not hypothetical descriptions.

The prototype becomes the specification.

## What This Prototype Defines

### 1. Individual Contributor Coaching View

**Intent:** Give sales ICs a personalized dashboard that surfaces actionable coaching without requiring manager intervention.

**Key requirements being demonstrated:**
- Real-time performance metrics with trend indicators (up/down/neutral)
- AI-generated coaching opportunities prioritized by impact
- Expandable coaching cards that explain the "why" behind recommendations
- Progress tracking for previously accepted coaching
- Strengths recognition alongside growth areas

**Open questions for production:**
- How frequently should metrics refresh?
- Who defines the coaching opportunity taxonomy?
- Should ICs be able to dismiss or snooze coaching items?

### 2. Manager Team View

**Intent:** Enable managers to identify which team members need attention and what kind of support would be most effective.

**Key requirements being demonstrated:**
- Team-level aggregated metrics (coverage, opportunities captured, NBV impact)
- Sortable team roster with risk indicators and performance quartiles
- Priority coaching list highlighting who needs immediate attention
- Behavior heatmap visualization for pattern recognition
- Quick-access to individual IC details

**Open questions for production:**
- What risk factors should trigger alerts?
- How should manager actions be tracked?
- Should managers see historical coaching effectiveness?

### 3. Conversation Intelligence

**Intent:** Transform call recordings into actionable insights without requiring managers to listen to hours of calls.

**Key requirements being demonstrated:**
- Call list with sentiment analysis at a glance
- Detailed call breakdown: summary, key quotes, objections, action items
- Objection tracking with resolution status
- AI-generated coaching insights per call
- Aggregated insights across all calls (themes, sentiment distribution, patterns)

**Open questions for production:**
- What's the latency expectation for call processing?
- How should PII be handled in transcripts?
- Should insights be editable by managers?

### 4. Atlas AI Assistant

**Intent:** Provide an always-available AI coach that can answer questions, surface relevant data, and guide users through the platform.

**Key requirements being demonstrated:**
- Sidebar chat interface accessible from any view
- Suggested prompts to guide first-time users
- Contextual responses with confidence indicators
- Source attribution for answers
- Conversational memory within session

**Open questions for production:**
- What data sources should Atlas have access to?
- How should Atlas handle questions it can't answer?
- Should conversations be persisted across sessions?

## Technical Implementation

### Stack
- **React 19** - Latest React with concurrent features
- **Vite 7** - Fast dev server and optimized builds
- **Tailwind CSS 4** - Utility-first styling with custom theme
- **Mock Data Layer** - JSON files simulating API responses

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for deployment
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/
│   ├── Chat/          # Atlas AI assistant
│   ├── Dashboard/     # Main views (IC, Manager, Conversations)
│   └── Shared/        # Reusable UI components
├── data/              # Mock data (simulates API responses)
├── App.jsx            # Root component with navigation
└── main.jsx           # Entry point
```

## Using This POC for Requirements

### For Stakeholders

1. **Click through everything** - Every button, every tab, every expandable section
2. **Note what feels right** - Which interactions match your mental model?
3. **Note what feels wrong** - Where does the flow break down?
4. **Ask "what if"** - What's missing? What edge cases aren't covered?

### For Product Managers

Use this prototype to:
- Run user research sessions with actual clickable interfaces
- Identify requirements gaps before engineering begins
- Align stakeholders on scope through demonstration
- Prioritize features based on user feedback on real interactions

### For Engineers

This POC establishes:
- Component architecture and naming conventions
- Data shape expectations (see `src/data/` for API contract hints)
- UI patterns and interaction models
- Styling system and design tokens

## What This Is Not

- **Not production code** - No error handling, no auth, no real API integration
- **Not a design system** - Styles are functional, not final
- **Not feature-complete** - Intentionally scoped to core workflows
- **Not optimized** - Performance, accessibility, and edge cases are deferred

## From POC to Production

### Phase 1: Validate
- [ ] Stakeholder walkthrough sessions
- [ ] Capture feedback on each feature area
- [ ] Identify must-have vs. nice-to-have requirements
- [ ] Document edge cases and error states needed

### Phase 2: Define
- [ ] Finalize API contracts based on mock data shapes
- [ ] Create detailed user stories from prototype interactions
- [ ] Define acceptance criteria using prototype as reference
- [ ] Prioritize backlog based on validated requirements

### Phase 3: Build
- [ ] Apply production design system to validated flows
- [ ] Implement real API integrations
- [ ] Add authentication and authorization
- [ ] Build out error handling and edge cases
- [ ] Performance optimization and accessibility audit

---

*Built with the philosophy that working software communicates requirements better than written documents ever could.*
