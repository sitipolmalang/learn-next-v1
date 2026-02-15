import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const ADMIN_EMAIL = 'wahidikqbal@gmail.com';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'database',
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                const isAdminEmail =
                    typeof session.user.email === 'string' &&
                    session.user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

                session.user.role = isAdminEmail ? Role.ADMIN : user.role;

                if (isAdminEmail && user.role !== Role.ADMIN) {
                    await prisma.user.updateMany({
                        where: {
                            email: {
                                equals: ADMIN_EMAIL,
                                mode: 'insensitive',
                            },
                        },
                        data: {
                            role: Role.ADMIN,
                        },
                    });
                }
            }
            return session;
        },
        async signIn() {
            return true;
        },
    },
    pages: {
        signIn: '/login',
    },
});
