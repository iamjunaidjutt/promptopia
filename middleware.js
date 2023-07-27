import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
	const path = request.nextUrl.pathname;
	const isPublicPath = path === "/" || path === "/profile/:path";
	const token = request.cookies.get("next-auth.session-token")?.value || "";

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/", request.nextUrl));
	}
}

export const config = {
	matcher: ["/", "/profile", "/profile/:path", "/create-prompt"],
};
