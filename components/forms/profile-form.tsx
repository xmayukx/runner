"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserProfileSchema, User } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type props = {
  user: User;
  onUpdate?: any;
};

function ProfileForm({ user, onUpdate }: props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: "onChange",
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      email: user.email,
      name: user.name || "",
    },
  });

  const handleSubmit = async (value: z.infer<typeof EditUserProfileSchema>) => {
    setIsLoading(true);
    await onUpdate(value);
    setIsLoading(false);
  };

  useEffect(() => {
    form.reset({
      email: user.email,
      name: user.name || "",
    });
  }, [user]);
  return (
    <Form {...form}>
      <form
        className=" flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> User full name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={true}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Email address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="eg: johndoe@abc.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className=" self-start ">
          {isLoading ? (
            <>
              <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
              Saving
            </>
          ) : (
            "Save User Settings"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
