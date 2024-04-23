"use client";

import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
});

const CategoryForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success('Category created successfully')
        router.push("/categories");
      }
    } catch (err) {
      console.log("[category Post]", err);
      toast.error('Failed to create Category')

    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl text-gray-500 font-semibold">Create Category</h1>

      <Separator className="bg-gray-400 mt-4 mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
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
                  <Textarea placeholder="description" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-10">
            <Button type="submit">Submit</Button>

            <Button type="button" onClick={() => router.push("/categories")}>
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
