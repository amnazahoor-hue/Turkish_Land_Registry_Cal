import { NextResponse } from "next/server";

/** Stable v4 UUID for Chrome DevTools automatic workspace (localhost only). */
const DEVTOOLS_WORKSPACE_UUID = "587d2a4f-8c0a-45d2-ba1a-9c9354f1cac3";

/**
 * Chrome DevTools requests this on localhost for Automatic Workspace Folders.
 * @see https://developer.chrome.com/docs/devtools/automatic-workspaces
 */
export function GET() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json({
    workspace: {
      root: process.cwd().replace(/\\/g, "/"),
      uuid: DEVTOOLS_WORKSPACE_UUID,
    },
  });
}
