# Prompts.md

## AI Learning & Debugging Notes — Sprint 07 Registration Wizard

This document contains AI-assisted learning, debugging, and architectural discussions used while building the multi-step registration wizard for Sprint 07.

The primary focus was understanding React form architecture, validation handling, state persistence, and deployment workflows rather than directly copying generated implementations.

---

## Phase 1 & 2 — Architecture & Feature Learning

---

**"How should I architect a multi-step onboarding wizard in React using conditional rendering instead of React Router?"**

### Outcome

Learned how to switch between steps using a `step` state variable and conditional rendering:

- Step 1 → Personal Info
- Step 2 → Account Details
- Step 3 → Review & Submit

This matched the sprint requirement of keeping the wizard on a single route.

---

**"How can I preserve user-entered data when navigating between Next and Back steps?"**

### Outcome

Learned about lifting state to the parent component and maintaining a unified form state so input values persist correctly across step transitions.

---

**"How should I split a registration wizard into reusable React components?"**

### Outcome

Learned component structuring by separating the form into:

- `PersonalInfoStep`
- `AccountDetailsStep`
- `ReviewSubmitStep`

This improved readability, maintainability, and organization of the project.

---

**"How do I implement real-time validation instead of validating only on submit?"**

### Outcome

Used `mode: "onChange"` in `useForm()` to enable live error rendering while typing.

---

**"How do I implement a show/hide password eye toggle in React?"**

### Outcome

Used local boolean `useState` to dynamically switch password input type between `password` and `text`. This improved form UX and matched sprint requirements.

---

**"How do I prevent forms from refreshing the page during navigation?"**

### Outcome

Learned that buttons inside `<form>` tags default to `type="submit"`. Fixed all navigation buttons by explicitly setting `type="button"`.

---

## Phase 3 — Enterprise Architecture (react-hook-form + Zod)

---

**"What is the advantage of react-hook-form compared to using multiple useState hooks?"**

### Outcome

Understood how `react-hook-form`:

- Manages all input state internally via uncontrolled refs
- Prevents unnecessary re-renders on every keystroke
- Improves performance in larger forms
- Integrates cleanly with schema validation libraries like Zod

---

**"How do I integrate Zod validation with react-hook-form?"**

### Outcome

Implemented schema-based validation using `zod`, `@hookform/resolvers/zod`, and `zodResolver`. Validation rules included:

- Required fields (`z.string().min(1, ...)`)
- Email regex (`z.string().regex(...)`)
- Minimum password length (`z.string().min(8, ...)`)
- Cross-field password match using `.refine()`

---

**"How does trigger() work in react-hook-form for per-step validation?"**

### Outcome

Learned that `trigger(["field1", "field2"])` validates only the specified fields without submitting the full form. This allowed per-step validation before advancing — Step 1 triggers `firstName`, `lastName`, `dob`; Step 2 triggers `email`, `password`, `confirmPassword`.

---

**"How does handleSubmit work in react-hook-form and when does it fire?"**

### Outcome

Understood that `handleSubmit(onSubmit)` runs the full Zod schema and only calls `onSubmit` if all fields pass. Attaching it directly to the `<form>` tag means any submit event — including programmatic ones — can trigger it unexpectedly.

---

## Bug Fix — Review Step Skipping Directly to Success Screen

---

**Problem:**
After completing Step 2 and clicking Next, the app skipped Step 3 (Review & Submit) entirely and jumped straight to the Registration Successful screen.

**Debugging process:**

Added a `console.log("step:", step, "reviewData:", reviewData)` above the return statement. The output showed:

```
step: 3 reviewData: Object
step: 3 reviewData: Object
Submitted Data: Object
```

This confirmed that `reviewData` was being set correctly, but `Submitted Data` was firing immediately after — meaning the form was auto-submitting the moment Step 3 rendered.

**Root cause:**

`handleSubmit(onSubmit)` was attached directly to the `<form>` tag via `onSubmit={handleSubmit(onSubmit)}`. When Step 3 rendered inside the form, a submit event was being triggered automatically, causing `onSubmit` to fire before the user clicked the Submit button.

**Fix applied:**

1. Removed `onSubmit={handleSubmit(onSubmit)}` from the `<form>` tag entirely.
2. Changed the Submit button from `type="submit"` to `type="button"`.
3. Created a `handleFinalSubmit` function that manually calls `handleSubmit(onSubmit)()` only when the Submit button is clicked.
4. Stored a snapshot of `getValues()` into a `reviewData` state variable inside `nextStep()` before advancing to Step 3, ensuring the data was available when `ReviewSubmitStep` rendered.


**Outcome:**

Step 3 now correctly renders the Review & Submit summary showing all entered data before the user confirms submission.

---

## Additional Debugging

---

**"Why was my ReviewSubmitStep component crashing silently?"**

### Outcome

The original `ReviewSubmitStep.jsx` had the full wizard JSX pasted inside it, referencing variables like `step`, `steps`, and `handleSubmit` that don't exist in that component's scope. This caused a silent crash on render. Fixed by rewriting the component to only receive and display the `data` prop.

---

**"Why does Vercel fail with import errors that work fine on localhost?"**

### Outcome

Learned that Vercel runs on Linux which is case-sensitive for file imports. `import Component from './component'` fails if the file is named `Component.jsx`. Fixed by ensuring all import paths match exact file casing.

---

## Final Notes

AI tools were used for:

- Understanding React architecture and component structure
- Learning `react-hook-form` and Zod integration patterns
- Debugging silent crashes and auto-submit behaviour
- Understanding why `handleSubmit` on a `<form>` tag can fire unexpectedly
- Improving UI/UX structure and CSS organisation

The final implementation, debugging, testing, styling, deployment, and project organisation were completed manually during development.
