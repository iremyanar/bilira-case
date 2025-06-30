# BiLira - Frontend Code Challenge

This is a single-page React application for creating and displaying a user profile.  
Built using **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **React Hook Form**, and **Zod**.

## 🚀 Tech Stack

- **React** 18.2.0 (latest stable)  
- **TypeScript**  
- **Vite**  
- **Tailwind CSS**  
- **React Hook Form**  
- **Zod**  
- **React Router DOM**  
- **Jest + React Testing Library** (unit & integration tests)

## 🧪 Getting Started

```bash
npm install
npm run dev        # open http://localhost:5173/create
```

## 📂 Folder Structure

```
src/
├─ components/
│  └─ ui/
│     ├─ Button.tsx
│     ├─ Input.tsx
│     └─ Form/
│         └─ index.tsx
├─ pages/
│  ├─ CreateUser.tsx
│  └─ SubmittedUser.tsx
├─ App.tsx
└─ main.tsx
```

## ✨ Features

- Two routes  
  - **/create** – Form page  
  - **/submitted** – Summary page  
- Form fields: Full Name, Email, Password, Remember Me  
- **Validation** with Zod  
  - Email format (`.email()`)  
  - Alphanumeric password (min 6, `/^[a-zA-Z0-9]*$/`)  
- Responsive Tailwind design  
- Navigation via `useNavigate`, data sent with route state

## 💡 Why React Hook Form & Zod?

We chose **React Hook Form** for its minimal re-renders, simplicity, and flexibility when creating reusable, abstracted form components. It integrates seamlessly with **Zod**, enabling powerful schema-based validation and full TypeScript support.

- `register` and `Controller` allow both uncontrolled and controlled usage.  
- `FormProvider` helps us abstract and reuse logic across the form.  
- **Zod** enables type-safe, declarative schemas with custom validations (e.g. regex-based password and email).

This combination ensured:  
- Clean validation and form control logic.  
- Fully reusable form components **without** external UI libraries.  
- Seamless Tailwind styling, total layout freedom, and testability.

> This design decision aligns with the challenge’s requirement to avoid relying on Ant Design or any third-party form abstractions.

## 🔒 Validation Schema

```ts
const createUserSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid e-mail address"),
  password: z
    .string()
    .min(6, "At least 6 characters")
    .regex(/^[a-zA-Z0-9]*$/, "Only letters & numbers allowed"),
  rememberMe: z.boolean().optional(),
});
```

## 🔁 Controlled vs Uncontrolled Inputs

```tsx
// Uncontrolled
<Input {...register("email")} />

// Controlled
<Controller
  control={methods.control}
  name="email"
  render={({ field }) => <Input {...field} />}
/>
```

*(Both examples are documented in `src/components/ui/Form/index.tsx`.)*

## 🎨 UI & Styling

- Centered, mobile-friendly layout with Tailwind  
- Reusable `<Button />` and `<Input />` components  
- Submitted data displayed as a card

## 🧪 Tests

> Run all tests with **`npm run test`**

### ✅ Input Component – Unit Tests

The custom `<Input />` component is covered with **7 focused unit tests** to ensure reliability and flexibility across different usage scenarios.

| Test Case | Description |
|-----------|-------------|
| ✅ Renders with label | Verifies that the label text is correctly displayed. |
| ✅ Shows validation error | Ensures validation error messages appear when the field is empty. |
| ✅ Placeholder support | Checks if the `placeholder` prop is correctly rendered. |
| ✅ Password input type | Confirms that `type="password"` renders a secure input field. |
| ✅ Default value rendering | Asserts that a given `defaultValue` is visible in the input. |
| ✅ Checkbox input support | Verifies the layout and label behavior when `type="checkbox"` is used. |
| ✅ Custom className | Tests whether additional classNames are applied correctly. |

### ✅ CreateUser Page – Integration Test

- Renders form fields, simulates valid user input, submits the form.
- Asserts navigation to `/submitted` route with correct data payload.

### ✅ SubmittedUser Page – Integration Test

- Verifies data (Full Name, Email, Password, Remember Me) is displayed.
- Asserts conditional rendering for "Remember Me: Yes".

## ⚛️ React 18 Info

React 19 is still in preview; React 18.2.0 is the latest stable release recommended for production.

## 🏗️ Build & Deploy

```bash
npm run build      # outputs dist/ folder
```

## ♻️ Reusable Components & Design Philosophy

Although the Ant Design Form component served as a reference for structure and best practices,  
this project **does not rely on Ant Design or any external UI library**.

All UI elements (`Form`, `Input`, `Button`) were implemented from scratch as reusable, fully decoupled components.  
This ensures flexibility, independence from third-party libraries, and alignment with the challenge’s requirement for abstraction.

**Example:**  
Instead of `<Form.Item>`, we use custom components with props like `label`, `error`, and `type`, styled with Tailwind.