"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/store/auth-store";
import { authService } from "@/services/api-service";

const loginSchema = z.object({
  phone: z.string().min(1, {
    message: "Phone number is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form definition
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      // Mock login for development
      if (
        data.phone === "9912345678" &&
        data.password === "anyCode2024@admin123"
      ) {
        return { token: "mockToken123" };
      }

      return authService.login(data.phone, data.password);
    },
    onSuccess: (data) => {
      if (data?.token) {
        login(data.token);
        router.push("/dashboard");
      } else {
        setErrorMessage(t("auth.invalidCredentials"));
      }
    },
    onError: () => {
      setErrorMessage(t("auth.invalidCredentials"));
    },
  });

  // Form submission handler
  const onSubmit = (data: LoginFormValues) => {
    setErrorMessage(null);
    loginMutation.mutate(data);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-8 bg-card rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{t("auth.login")}</h1>
        <p className="text-muted-foreground">{t("dashboard.welcome")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.phoneNumber")}</FormLabel>
                <FormControl>
                  <Input placeholder="09XXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.password")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMessage && (
            <div className="p-3 bg-destructive/15 text-destructive rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
            variant="gradient"
          >
            {loginMutation.isPending ? t("common.loading") : t("auth.login")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
