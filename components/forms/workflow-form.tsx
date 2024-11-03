"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkflowSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toast } from "@/hooks/use-toast";
import { onCreateWorkflow } from "@/app/(main)/(pages)/workflows/_actions/workflow-connections";
import { useModal } from "@/providers/modal-provider";
type Props = {
  title?: string;
  subTitle?: string;
};

export default function WorkflowForm({ subTitle, title }: Props) {
  const { setClose } = useModal();
  const form = useForm<z.infer<typeof WorkflowSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const router = useRouter();

  const handleSubmit = async (value: z.infer<typeof WorkflowSchema>) => {
    const workflow = await onCreateWorkflow(value.name, value.description);

    console.log(workflow);
    if (workflow) {
      toast({
        title: `Workflow ${value.name} created`,
        description: "Workflow has been created successfully",
      });
      router.refresh();
    }
    setClose();
  };

  return (
    <Card className=" w-full max-w-[650px] border-none">
      {title && subTitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subTitle}</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Form {...form}>
          <form
            className=" flex flex-col gap-4 text-left"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className=" mt-4 ">
              {isLoading ? (
                <>
                  <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
                  Saving
                </>
              ) : (
                "Save Workflow Settings"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
