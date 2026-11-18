import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      dob,
      cityState,
      priorTraining,
      programme,
      heardFrom,
      goal,
    } = body;

    if (!fullName || !phone || !dob || !cityState || !priorTraining || !programme) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // TODO: Save to Prisma (e.g. prisma.lead.create) or send email/WhatsApp notification
    console.log("New Actverse Enquiry:", {
      fullName,
      phone,
      dob,
      cityState,
      priorTraining,
      programme,
      heardFrom,
      goal,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 500 }
    );
  }
}