import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

const applySetCookie = (target: NextResponse, source: Response) => {
  const setCookie = source.headers.get("set-cookie");

  if (setCookie) {
    target.headers.set("Set-Cookie", setCookie);
  }

  return target;
};

const isSessionValid = async (response: Response) => {
  if (!response.ok) {
    return false;
  }

  try {
    const data = (await response.clone().json()) as { success?: boolean };
    return data.success !== false;
  } catch {
    return true;
  }
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionUrl = new URL("/api/auth/session", request.url);

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute) {
    if (accessToken) {
      return NextResponse.next();
    }

    if (!refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      const response = await fetch(sessionUrl, {
        headers: {
          Cookie: cookieHeader,
        },
      });

      if (!(await isSessionValid(response))) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      return applySetCookie(NextResponse.next(), response);
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isPublicRoute) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!refreshToken) {
      return NextResponse.next();
    }

    try {
      const response = await fetch(sessionUrl, {
        headers: {
          Cookie: cookieHeader,
        },
      });

      if (await isSessionValid(response)) {
        return applySetCookie(
          NextResponse.redirect(new URL("/", request.url)),
          response,
        );
      }
    } catch {
      // User is not authenticated, allow access to public routes
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
