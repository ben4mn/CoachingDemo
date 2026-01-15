# Atlas Coaching POC - V2 Release

## What's New (January 2025)

This release addresses the key gaps identified in the Mockup vs PRD analysis. The changes transform Atlas from a post-call analytics tool into a differentiated real-time coaching platform.

---

## 1. Live Call Coaching (NEW)

**What it does:** Provides real-time, contextual coaching prompts during partner calls.

**How to review:**
- Click the **"Active Call"** tab in the navigation
- You'll see a simulated live call with Sunset Beach Resort
- Use the stage buttons to progress through: Discovery → Value → Objection → Close
- Each stage shows 2 coaching prompts with:
  - Specific suggestion (e.g., "Ask about their competitive positioning challenges")
  - Why it matters (e.g., "Top performers ask 30% more open-ended questions")
  - Link to relevant Seismic training content
  - Feedback buttons (Helpful / Not relevant)

**Key features:**
- Live timer showing call duration
- Partner context sidebar (account tier, VB adoption, YTD bookings)
- Open objections from previous calls highlighted
- Topics that resonate with this partner shown

---

## 2. Post-Call Review & Automation (NEW)

**What it does:** "Before you sync" workflow giving sellers control over CRM updates and follow-up emails.

**How to review:**
- From the Active Call view, click **"End Call"**
- You'll see the Post-Call Review screen with:
  - Editable call summary (auto-generated)
  - CRM fields to update (checkboxes to include/exclude)
  - Draft follow-up email with suggested Seismic content attachments
  - Action items extracted from the call
- Click "Approve & Sync" to see the confirmation

**Key features:**
- Seller maintains control - nothing syncs without approval
- Email draft is fully editable
- Content suggestions from Seismic can be attached

---

## 3. Top Performer Benchmarking (NEW)

**What it does:** Shows how the seller compares to top 20% performers with trend visualization.

**How to review:**
- Click **"My Coaching"** tab
- Scroll to the new **"How You Compare to Top Performers"** section
- Three benchmark cards show:
  - Open-ended questions per call (You: 4.2 vs Top: 6.1)
  - VB pitch rate (You: 62% vs Top: 80%)
  - Objection resolution rate (You: 71% vs Top: 85%)
- Each card includes:
  - Trend sparkline showing last 7 calls
  - Gap to close
  - Insight explaining why it matters
  - Link to relevant training content

---

## 4. Manager Coaching Intelligence (ENHANCED)

**What it does:** Provides managers with evidence-backed coaching recommendations for each team member.

**How to review:**
- Click **"Team View"** tab
- Click on **Marcus Johnson** or **David Kim** (high-risk team members)
- The row expands to show:
  - Recent calls with sentiment indicators
  - Specific behavior gaps with **actual call snippets as evidence**
  - Strengths to reinforce
  - Coaching history with outcomes
  - "Schedule Coaching Session" button

**Key features:**
- Evidence from actual calls (e.g., "Partner: 'The pricing seems high' - Marcus moved on without addressing")
- Specific suggestions with training content links
- "Priority: Coach Next" sidebar now shows evidence snippets

---

## 5. Trust & Transparency (ENHANCED)

**What it does:** Explains why insights are being shown and builds trust in AI recommendations.

**How to review:**
- Go to **"My Coaching"** tab
- Click on any coaching opportunity to expand it
- Click **"Why am I seeing this?"** to see:
  - Data sources (Recent call analysis, Top performer benchmark, Deal outcome patterns)
  - Confidence score (87%)
  - Privacy note explaining data usage

**Also appears in:**
- Live coaching prompts (confidence scores shown)
- Team member detail view (evidence attribution)

---

## Navigation Changes

The app now has **4 tabs** instead of 3:
1. **My Coaching** - Personal dashboard with benchmarking
2. **Team View** - Manager dashboard with expandable team details
3. **Conversations** - Call history (unchanged)
4. **Active Call** - NEW: Live call coaching mode

When in a live call, the Active Call tab shows a red **"LIVE"** badge.

---

## Files Changed

### New Components
- `LiveCallMode.jsx` - Live call coaching interface
- `LivePromptCard.jsx` - Real-time coaching prompts
- `PostCallReview.jsx` - Post-call review workflow
- `TeamMemberDetail.jsx` - Expanded team member view
- `BenchmarkCard.jsx` - Top performer comparison
- `TrendSparkline.jsx` - Trend visualization
- `InsightAttribution.jsx` - Trust/transparency component

### New Data
- `mockLiveCall.json` - Live call simulation data

### Enhanced
- `ICView.jsx` - Added benchmarking section
- `ManagerView.jsx` - Added expandable team member detail
- `CoachingItem.jsx` - Added "Why am I seeing this?"
- `mockUsers.json` - Added benchmarks and coaching evidence
- `mockCalls.json` - Added post-call data structure

---

## Testing Checklist

- [ ] Live Call: Progress through all 4 stages
- [ ] Live Call: Verify prompts change per stage
- [ ] Live Call: End call and review Post-Call Review screen
- [ ] My Coaching: Check 3 benchmark cards display correctly
- [ ] My Coaching: Expand coaching items and click "Why am I seeing this?"
- [ ] Team View: Click Marcus Johnson to see evidence
- [ ] Team View: Click David Kim to see evidence
- [ ] Team View: Verify "Priority: Coach Next" shows snippets

---

## Questions for Review

1. Does the Live Call Mode feel differentiated from post-call analytics?
2. Is the Post-Call Review workflow intuitive for sellers?
3. Are the benchmark comparisons meaningful and actionable?
4. Does the evidence in Manager View provide enough context for coaching?
5. Is the "Why am I seeing this?" explanation clear and trust-building?
