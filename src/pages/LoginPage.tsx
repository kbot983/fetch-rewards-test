import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import api from "@/lib/api";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = form.handleSubmit((data) => {
    api
      .post("/auth/login", data)
      .then((response) => {
        dispatch(setUser(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      });
  });

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="w-80 rounded-sm border bg-white p-4 md:p-8">
        <>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Foe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
          {isError && (
            <div className="mt-4 text-center text-sm text-red-500">
              Soemthing went wrong. Please try again.
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default LoginPage;
