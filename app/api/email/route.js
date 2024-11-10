import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";

export async function POST(request) {
  await ConnectDB();

  try {
    const formData = await request.formData();
    const emailData = {
      email: formData.get("email"), // Simplified string interpolation
    };

    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json(
      { success: false, msg: "Subscription failed" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const emails = await EmailModel.find();
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = await request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, msg: "Email ID not provided" },
        { status: 400 }
      );
    }

    const email = await EmailModel.findById(id);
    if (!email) {
      return NextResponse.json(
        { success: false, msg: "Email not found" },
        { status: 404 }
      );
    }

    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Email deleted" });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json(
      { success: false, msg: "Failed to delete email" },
      { status: 500 }
    );
  }
}
