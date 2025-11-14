import apiClient from "@/tanstack/api/apiClient";
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

export const signupUser = async (body: SignupRequest): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse>(`/v1/auth/signup`, body);
  return response.data;
};

export const verifyOtp = async (body: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const response = await apiClient.post<VerifyOtpResponse>(`/v1/auth/verify-otp`, body);
  return response.data;
};

export const resendOtp = async (body: ResendOtpRequest): Promise<ResendOtpResponse> => {
  const response = await apiClient.post<ResendOtpResponse>(`/v1/auth/resend-otp`, body);
  return response.data;
};

export const signinUser = async (body: SigninRequest): Promise<SigninResponse> => {
  const response = await apiClient.post<SigninResponse>(`/v1/auth/signin`, body);
  return response.data;
};
