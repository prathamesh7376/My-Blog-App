import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";

export async function POST(request) {
  await ConnectDB();

  try {
    const formData = await request.formData(); // Corrected capitalization
    const emailData = {
      email: `${formData.get("email")}`,
    };

    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json({ success: false, msg: "Subscription failed" });
  }
}

export async function GET(request) {
  const emails = await EmailModel.find();
  return NextResponse.json({ emails });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Email delete" });
}
