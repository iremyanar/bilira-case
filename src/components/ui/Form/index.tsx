import type { ReactNode } from "react";
import type {
  UseFormReturn,
  SubmitHandler,
} from "react-hook-form";
import {
  FormProvider,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodTypeAny } from "zod";
import { z } from "zod";                 // <-- değer (namespace) importu

import Button from "../Button";

interface FormProps<T extends ZodTypeAny> {
  schema: T;
  defaultValues?: z.infer<T>;
  onSubmit: SubmitHandler<z.infer<T>>;
  children:
  | ReactNode
  | ((methods: UseFormReturn<z.infer<T>>) => ReactNode);
  submitLabel?: string;
}

export default function Form<T extends ZodTypeAny>({
  schema,
  defaultValues,
  onSubmit,
  children,
  submitLabel = "Submit",
}: FormProps<T>) {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });


  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto"
      >
        {typeof children === "function" ? children(methods) : children}

        <div className="mt-6">
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </FormProvider>
  );
}

/* -------------------------------------------------------------
   Controlled vs. Uncontrolled

   // Uncontrolled
   <Input {...methods.register("fullName")} />

   // Controlled
   const { control } = methods;
   <Controller control={control} name="email" ... />
-------------------------------------------------------------- */
