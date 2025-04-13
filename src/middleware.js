import { NextRequest, NextResponse } from "next/server";


// export function middleware(request) {
//     // return NextResponse.redirect(new URL('/home', request.url))
//   }

export { auth as middleware } from "@/auth";