import Category from "@/lib/models/Category";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    const { title, description, image } = await req.json();

    const existing = await Category.findOne({ title });

    if (existing) {
      return new NextResponse("Category already exists", { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse("Title & Image is required", { status: 400 });
    }

    const newCategory = await Category.create({ 
        title, 
        description, 
        image 
    });

    await newCategory.save()

    return new NextResponse(newCategory, { status: 200 });


  } catch (err) {
    console.log("[category Post]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};



export const GET = async (req: NextRequest) => {
  try{
    await connectDB();
    const categories = await Category.find().sort({createdAt: 'desc'});
    return NextResponse.json(categories, { status: 200 });
  }catch(err){
    console.log("[category Get]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}