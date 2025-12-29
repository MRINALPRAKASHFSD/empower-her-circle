-- Create table for storing OTPs
CREATE TABLE public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  full_name TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  used BOOLEAN NOT NULL DEFAULT false
);

-- Create index for fast email lookups
CREATE INDEX idx_otp_codes_email ON public.otp_codes(email);

-- Enable RLS
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- No public access policies needed - only accessed via service role in edge function