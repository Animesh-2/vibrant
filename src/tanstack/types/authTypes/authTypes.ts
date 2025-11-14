export interface SignupRequest {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface SignupResponse {
  statusCode: number;
  message: string;
  timestamp: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  type: "signup" | "signin";
}

export interface VerifyOtpResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  data: {
    token: string;
  };
}

export interface ResendOtpRequest {
  email: string;
  type: "signup" | "signin";
}

export interface ResendOtpResponse {
  statusCode: number;
  message: string;
  timestamp: string;
}

export interface SigninRequest {
  email: string;
}

export interface SigninResponse {
  statusCode: number;
  message: string;
  timestamp: string;
}
