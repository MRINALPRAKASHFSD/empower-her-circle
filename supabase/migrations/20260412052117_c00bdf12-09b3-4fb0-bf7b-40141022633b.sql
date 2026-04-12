
-- Security definer function to check if user is admin by email
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = _user_id
    AND email = 'prakashmrinal9@gmail.com'
  )
$$;

-- Admin can view all profiles
CREATE POLICY "Admin can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Admin can view all messages
CREATE POLICY "Admin can view all messages"
ON public.messages FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Admin can view all journal entries
CREATE POLICY "Admin can view all journal entries"
ON public.journal_entries FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Admin can view all emergency contacts
CREATE POLICY "Admin can view all emergency contacts"
ON public.user_emergency_contacts FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Admin can manage courses (insert, update, delete)
CREATE POLICY "Admin can insert courses"
ON public.courses FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin can update courses"
ON public.courses FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin can delete courses"
ON public.courses FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Admin can manage mentors (insert, update, delete)
CREATE POLICY "Admin can insert mentors"
ON public.mentors FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admin can update mentors"
ON public.mentors FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin can delete mentors"
ON public.mentors FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));
