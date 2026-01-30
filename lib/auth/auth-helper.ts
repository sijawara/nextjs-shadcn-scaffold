import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Helper untuk mendapatkan session di Server Components
 */
export async function getSession() {
    return await auth.api.getSession({
        headers: await headers(),
    });
}

/**
 * Middleware-like helper untuk Server Components
 * @param redirectTo path untuk redirect jika tidak auth
 */
export async function withAuth(redirectTo: string = "/login") {
    const session = await getSession();
    if (!session) {
        redirect(redirectTo);
    }
    return session;
}
