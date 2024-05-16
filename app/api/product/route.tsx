import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
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
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      colors,
      sizes,
      price,
      expense,
    } = await req.json();

    if (
      !title ||
      !description ||
      !media ||
      !collections ||
      !price ||
      !expense
    ) {
      return new NextResponse("Not enough data", { status: 400 });
    }
    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      colors,
      sizes,
      price,
      expense,
    });

    await newProduct.save();

    if (category) {
      for (const categoryId of category) {
        const categories = await Category.findById(categoryId);
        
        if (categories) {
          categories.products?.push(newProduct._id);
          await categories.save();
        }
      }
    }
    
   
    return new NextResponse(newProduct, { status: 200 });
  } catch (err: any) {
    console.log('err', err.message);
    return new NextResponse(err.message, { status: 500 });
  }
};

////////////////GET

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "category", model: Category });
    return NextResponse.json(products, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse(err.message, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
