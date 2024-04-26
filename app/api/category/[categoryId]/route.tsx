import Category from "@/lib/models/Category";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    await connectDB();
    const category = await Category.findById(params.categoryId);

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "category not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log("[category Get]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    let category = await Category.findById(params.categoryId);
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "category not found" }),
        { status: 404 }
      );
    }
    const { title, description, image } = await req.json();
    if (!title || !image) {
      return new NextResponse("Title & Image is required", { status: 400 });
    }
    const newCategory = await Category.findByIdAndUpdate(
      params.categoryId,
      { title, description, image },
      { new: true }
    );
    return NextResponse.json(newCategory, { status: 200 });
  } catch (err) {
    console.log("[category Post]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    await Category.findByIdAndDelete(params.categoryId);
    return new NextResponse("Category deleted", { status: 200 });
  } catch (err) {
    console.log("[DeleteCategory]", err);
    return new NextResponse("DeleteCategory", { status: 500 });
  }
};
