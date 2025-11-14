import { useMutation } from "@tanstack/react-query";
import {
  signupUser,
  verifyOtp,
  resendOtp,
  signinUser,
} from "../../services/authService/authService";

import {
  SignupRequest,
  SignupResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  SigninRequest,
  SigninResponse,
} from "../../types/authTypes/authTypes";

// Signup
export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signupUser,
  });
};

// Verify OTP
export const useVerifyOtp = () => {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpRequest>({
    mutationFn: verifyOtp,
  });
};

// Resend OTP
export const useResendOtp = () => {
  return useMutation<ResendOtpResponse, Error, ResendOtpRequest>({
    mutationFn: resendOtp,
  });
};

// Signin
export const useSignin = () => {
  return useMutation<SigninResponse, Error, SigninRequest>({
    mutationFn: signinUser,
  });
};
