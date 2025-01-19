// AI Agent Implementation
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import {
  deleteEmployee,
  getEmployeeDetails,
  insertDataInDB,
  updateEmplyoeeDetail,
} from "../_lib/action";

const groq = new Groq({ apiKey: process.env.OPENAI_API_KEY });

const systemMessage = process.env.SYSTEM_PROPMT!;

type Message = {
  role: any;
  content: string;
};

type Employee = {
  id: number;
  name: string;
  email: string;
  salary: string;
};

const tools: any = {
  getEmployeeDetails: getEmployeeDetails,
  insertDataInDB: insertDataInDB,
  deleteEmployee: deleteEmployee,
  updateEmplyoeeDetail: updateEmplyoeeDetail,
};

const messages: Message[] = [{ role: "system", content: systemMessage }];

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json(
      { error: "Query parameter 'prompt' is required." },
      { status: 400 }
    );
  }
  messages.push({ role: "user", content: JSON.stringify(prompt) });
  try {
    let responseMessage = "";
    let data = null;
    while (true) {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages,
        response_format: { type: "json_object" },
      });
      const result = response.choices[0]?.message.content as string;
      messages.push({ role: "assistant", content: result });
      const call = JSON.parse(result);
      console.log("----------------------------------------");
      console.log(call);
      console.log("----------------------------------------");
      if (call.type === "output") {
        responseMessage = `🤖 : ${call.output} `;
        data = call.data;
        break;
      } else if (call.type === "action") {
        const fn = tools[call.function];
        const output = await fn(call.data);
        const obj = { type: "observation", observation: output };
        messages.push({ role: "assistant", content: JSON.stringify(obj) });
      }
    }
    return NextResponse.json(
      { data: { message: responseMessage, data: data } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error with Groq API:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error:
          error.response?.data?.error?.message ||
          "An unexpected error occurred.",
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const employees: Employee[] | [] = await getEmployeeDetails();

    return NextResponse.json({ data: employees }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch employee details", details: errorMessage },
      { status: 500 }
    );
  }
}
