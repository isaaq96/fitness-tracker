alter function public.bootstrap_default_program_for_profile(uuid)
  set search_path = '';

alter function public.handle_new_user()
  set search_path = '';

revoke execute on function public.bootstrap_default_program_for_profile(uuid)
  from public, anon, authenticated;

revoke execute on function public.handle_new_user()
  from public, anon, authenticated;

revoke execute on function public.touch_updated_at()
  from public, anon, authenticated;

alter default privileges for role postgres in schema public
  revoke execute on functions from public, anon, authenticated;
