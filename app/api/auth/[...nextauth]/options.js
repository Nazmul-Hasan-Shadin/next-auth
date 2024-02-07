import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("profile github:", profile);

        let userRole = "Github user";
        if (profile?.email === "nazmulhasan.shadin3@gmail.com") {
          userRole = "admin";
        }
        console.log(userRole);

        return {
          ...profile,
          role: userRole
        };
      },

      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      profile(profile) {
        console.log("profile Googel:", profile);

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },

      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) token.role = user.role;

      return token;
    },
  
  async session({ session, token }) {
    if (session?.user) session.user.role = token.role;
    return session
  },
}
}
