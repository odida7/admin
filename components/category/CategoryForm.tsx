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
import Loader from "../custom ui/Loader";
import Delete from "../custom ui/Delete";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
});

interface CategoryProps {
  initialData?: CategoryType | null;
}

const CategoryForm: React.FC<CategoryProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  const handleKey = (event: React.KeyboardEvent<HTMLInputElement>| React.KeyboardEvent<HTMLAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/category/${initialData._id}`
        : "/api/category";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Category ${initialData ? "Updated" : "created"}`);
        window.location.href = "/categories";
        router.push("/categories");
      }
    } catch (err) {
      console.log("[category Post]", err);
      toast.error("Failed to create Category");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="p-10">
      {initialData ? (
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-4xl text-gray-500 font-semibold">
            Edit Category
          </h1>

          <Delete id={initialData._id}/>
        </div>
      ) : (
        <h1 className="text-4xl text-gray-500 font-semibold">
          Create Category
        </h1>
      )}

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
                  <Input placeholder="Title" {...field} onKeyDown={handleKey}/>
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
                  <Textarea placeholder="description" {...field} rows={5} onKeyDown={handleKey} />
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
