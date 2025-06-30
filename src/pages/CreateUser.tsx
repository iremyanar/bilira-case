import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Form from "../components/ui/Form";
import Input from "../components/ui/Input";

// --- Zod şeması -------------------------------------------------
export const createUserSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please input your email"),
  password: z
    .string()
    .min(6, "Please input your password")
    .regex(/^[a-zA-Z0-9]*$/, "Only letters & numbers"),
  rememberMe: z.boolean().optional(),
});
// ----------------------------------------------------------------

export default function CreateUser() {
  const navigate = useNavigate();

  return (
    /* 🔹 tüm ekranı kaplayan fixed layer */
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center px-4">
      {/* 🔹 ortalanacak kart */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <Form
          schema={createUserSchema}
          defaultValues={{
            fullName: "",
            email: "",
            password: "",
            rememberMe: false,
          }}
          onSubmit={(data) => navigate("/submitted", { state: data })}
          submitLabel="Submit"
        >
          {({ register, formState: { errors } }) => (
            <>
              <Input
                label="Full Name *"
                {...register("fullName")}
                error={errors.fullName}
              />
              <Input
                label="Email *"
                type="email"
                {...register("email")}
                error={errors.email}
              />
              <Input
                label="Password *"
                type="password"
                {...register("password")}
                error={errors.password}
              />
              <Input
                label="Remember Me"
                type="checkbox"
                {...register("rememberMe")}
              />
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

