"use client";

import CategoryForm from "@/components/category/CategoryForm";
import Loader from "@/components/custom ui/Loader";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { categoryId: string } }) => {
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState<CategoryType | null>(null);

  const fetchCategory = async () => {
    try {
      const res = await fetch(`/api/category/${params.categoryId}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log("data", data);
      setCategory(data);
      setLoading(false);
    } catch (err) {
      console.log("[Getcategory]", err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full">
      <CategoryForm initialData={category} />
    </div>
  );
};

export default page;
