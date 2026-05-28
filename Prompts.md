# Prompts.md

## AI Learning & Debugging Notes — Sprint 07 Registration Wizard

This document contains AI-assisted learning, debugging, and architectural discussions used while building the multi-step registration wizard for Sprint 07.

The primary focus was understanding React form architecture, validation handling, state persistence, and deployment workflows rather than directly copying generated implementations.

---

“How should I architect a multi-step onboarding wizard in React using conditional rendering instead of React Router?”

### Outcome

Learned how to switch between steps using a step state variable and conditional rendering:

* Step 1 → Personal Info
* Step 2 → Account Details
* Step 3 → Review & Submit

This matched the sprint requirement of keeping the wizard on a single route.

---

“How can I preserve user-entered data when navigating between Next and Back steps?”

### Outcome

Learned about lifting state to the parent component and maintaining a unified form state so input values persist correctly across step transitions.

---

“How should I split a registration wizard into reusable React components?”

### Outcome

Learned component structuring by separating the form into:

* PersonalInfoStep
* AccountDetailsStep
* ReviewSubmitStep

This improved readability, maintainability, and organization of the project.

---

“What is the advantage of react-hook-form compared to using multiple useState hooks?”

### Outcome

Understood how react-hook-form:

* Simplifies form handling
* Reduces unnecessary re-renders
* Improves performance in larger forms
* Works efficiently with validation libraries

---

“How do I integrate Zod validation with react-hook-form?”

### Outcome

Implemented schema validation using:

* zod
* zodResolver
* react-hook-form

Validation rules included:

* Required fields
* Email regex validation
* Minimum password length
* Confirm password matching

---

“How can I implement real-time validation instead of validating only on submit?”

### Outcome

Used:

```js id="x0drqz"
mode: "onChange"
```

This enabled live error rendering while typing.

---

“How do I disable the Next button until the current step is valid?”

### Outcome

Learned conditional button disabling using validation state and field checking before moving to the next step.

---

“How do I implement a show/hide password eye toggle in React?”

### Outcome

Used local boolean state to dynamically switch password fields between:

* password
* text

This improved form UX and matched sprint requirements.

---

“How do I prevent forms from refreshing the page during navigation?”

### Outcome

Learned that buttons inside forms default to submit behavior and fixed navigation buttons using:

```js id="e59x8w"
type="button"
```

---

“Why was Vite showing import resolution errors?”

### Outcome

Fixed:

* Incorrect import paths
* File naming mismatches
* Component folder structure issues

Also learned about Vercel/Linux case sensitivity during deployment.

---

“How should I structure CSS for a multi-step form UI?”

### Outcome

Improved:

* Layout consistency
* Responsive spacing
* Fixed container heights
* Password field alignment
* Progress bar styling
* Error message visibility

---

“How do I deploy a Vite React project to Vercel?”

### Outcome

Learned:

* GitHub deployment workflow
* Production build handling
* Vercel project import process
* Vite deployment configuration

---

“How should I record the QA walkthrough video for this sprint?”

### Outcome

Prepared a structured walkthrough demonstrating:

* Real-time validation
* Password toggles
* Back button state persistence
* Review & Submit flow
* Successful deployment

---

## Final Notes

AI tools were primarily used for:

* Understanding React architecture
* Learning react-hook-form and Zod integration
* Debugging runtime and deployment issues
* Improving UI/UX structure
* Understanding enterprise form patterns

The final implementation, integration, debugging, testing, styling adjustments, deployment, and project organization were completed manually during development.
