export const authConfig = (
  currentTheme: string | undefined
): Record<
  string,
  {
    title: string;
    fields: { name: string; label: string; type: string }[];
    buttonText: string;
    footerText: string;
    footerLink: string;
    footerHref: string;
    image: string;
  }
> => ({
  login: {
    title: "Log In for existing account",
    fields: [
      { name: "email", label: "Mail ID", type: "email" },
    ],
    buttonText: "Log in",
    footerText: "Don’t have an account?",
    footerLink: "Sign up",
    footerHref: "/auth/signup",
    image: currentTheme == "dark" ? "/assets/form-image.png" : "/assets/form-image.png",
  },
  signup: {
    title: "Sign Up to create account",
    fields: [
      { name: "name", label: "User Name", type: "text" },
      { name: "email", label: "Mail ID", type: "email" },
      { name: "role", label: "Role", type: "dropdown" },
    ],
    buttonText: "Sign up",
    footerText: "Already have an account?",
    footerLink: "Login",
    footerHref: "/auth/login",
    image: currentTheme ? "/assets/form-image.png" : "/assets/form-image.png",
  },
  otp: {
    title: "OTP Verification",
    fields: [{ name: "otp", label: "OTP", type: "number" }],
    buttonText: "Verify",
    footerText: "",
    footerLink: "",
    footerHref: "",
    image: currentTheme ? "/assets/form-image.png" : "/assets/form-image.png",
  },
});
