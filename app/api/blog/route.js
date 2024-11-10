import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

// Get blogs or a specific blog
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

// Upload new blog
export async function POST(request) {
  try {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const filePath = path.join("./public", `${timestamp}_${image.name}`);
    await writeFile(filePath, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    await BlogModel.create(blogData);
    console.log("Blog saved");
    return NextResponse.json({ success: true, msg: "Blog added" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Error saving blog" }, { status: 500 });
  }
}

// Delete blog and remove associated image
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const imagePath = path.join("./public", blog.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });

    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}
