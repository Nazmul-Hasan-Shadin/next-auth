import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
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
          role: userRole,
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
    CredentialProvider({
      name: "Credentials",
      credentials: {
        label: "email",
        type: "text",
        placeholder: "your-email",
      },
    }),
    CredentialProvider({
      credentials: {
        label: "password",
        type: "password",
        placeholder: "your ]-password",
      },

      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();
          if (foundUser) {
            console.log("user exist");
            const match = await bcrypt.comapre(
              credentials.password,
              foundUser.password
            );
            if (match) {
              console.log("good pass");
              delete foundUser.password;
              foundUser["role"] = "unverified email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) token.role = user.role;

      return token;
    },

    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
