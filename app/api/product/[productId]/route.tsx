

import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectDB();

    const product = await Product.findById(params.productId).populate({
      path: "category",
      model: Category,
    });
  
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(product), {
      status: 200,
      
    });
  } catch (err) {
    console.log("[productId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !collections || !price || !expense) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }

    const addedCategory = category.filter(
      (categoryId: string) => !product.category.includes(categoryId)
    );
    // included in new data, but not included in the previous data

    const removedCategory = product.category.filter(
      (categoryId: string) => !category.includes(categoryId)
    );
    // included in previous data, but not included in the new data

    // Update category
    await Promise.all([
      // Update added category with this product
      ...addedCategory.map((categoryId: string) =>
        Category.findByIdAndUpdate(categoryId, {
          $push: { products: product._id },
        })
      ),

      // Update removed category without this product
      ...removedCategory.map((categoryId: string) =>
        Category.findByIdAndUpdate(categoryId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        colors,
        price,
        expense,
      },
      { new: true }
    ).populate({ path: "category", model: Category });

    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log("[productId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {  
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(product._id);

    // Update collections
    await Promise.all(
      product.category.map((categoryId: string) =>
        Category.findByIdAndUpdate(categoryId, {
          $pull: { products: product._id },
        })
      )
    );

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[productId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

