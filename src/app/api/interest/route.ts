import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  confirmationMessage,
  validateInterest,
  type InterestPayload,
  type InterestRecord,
} from "@/lib/interest";

const dataFile = path.join(process.cwd(), "data", "interest-submissions.json");

type StoredSubmission = InterestRecord & {
  id: string;
  createdAt: string;
};

let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readSubmissions(): Promise<StoredSubmission[]> {
  try {
    const raw = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredSubmission[]) : [];
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }
    throw error;
  }
}

export async function POST(request: Request) {
  let body: InterestPayload;
  try {
    body = (await request.json()) as InterestPayload;
  } catch {
    return Response.json(
      {
        ok: false,
        message: "We could not read that. Please try again.",
        errors: {},
      },
      { status: 400 },
    );
  }

  const result = validateInterest(body);
  if (!result.ok) {
    return Response.json(
      { ok: false, message: result.message, errors: result.errors },
      { status: 400 },
    );
  }

  try {
    const stored = await enqueue(async () => {
      const submission: StoredSubmission = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...result.record,
      };
      const existing = await readSubmissions();
      existing.push(submission);
      await mkdir(path.dirname(dataFile), { recursive: true });
      await writeFile(dataFile, `${JSON.stringify(existing, null, 2)}\n`, "utf8");
      return submission;
    });

    return Response.json({
      ok: true,
      message: confirmationMessage(stored),
    });
  } catch {
    return Response.json(
      {
        ok: false,
        message:
          "We could not save your interest just now. Your answers are still here — please try again.",
        errors: {},
      },
      { status: 500 },
    );
  }
}
