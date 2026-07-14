create extension if not exists pgcrypto;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.program_days (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs (id) on delete cascade,
  sequence integer not null check (sequence between 1 and 31),
  name text not null,
  focus text not null,
  summary text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (program_id, sequence)
);

create table if not exists public.program_day_exercises (
  id uuid primary key default gen_random_uuid(),
  program_day_id uuid not null references public.program_days (id) on delete cascade,
  exercise_key text not null,
  exercise_name text not null,
  position integer not null,
  target_sets integer not null check (target_sets > 0),
  rep_range text not null,
  cue text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (program_day_id, position),
  unique (program_day_id, exercise_key)
);

create table if not exists public.workout_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  program_id uuid references public.programs (id) on delete set null,
  program_day_id uuid references public.program_days (id) on delete set null,
  day_sequence integer not null,
  day_name text not null,
  status text not null check (status in ('in_progress', 'completed')),
  session_note text,
  started_at timestamptz not null default timezone('utc', now()),
  finished_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workout_session_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_session_id uuid not null references public.workout_sessions (id) on delete cascade,
  exercise_key text not null,
  exercise_name text not null,
  position integer not null,
  target_sets integer not null check (target_sets > 0),
  rep_range text not null,
  cue text not null,
  exercise_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (workout_session_id, position)
);

create table if not exists public.workout_sets (
  id uuid primary key default gen_random_uuid(),
  workout_session_exercise_id uuid not null references public.workout_session_exercises (id) on delete cascade,
  set_number integer not null check (set_number > 0),
  weight_kg numeric(8,2),
  reps integer,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (workout_session_exercise_id, set_number)
);

create or replace function public.bootstrap_default_program_for_profile(profile_uuid uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  new_program_id uuid;
  day_id uuid;
begin
  if exists (
    select 1
    from public.programs
    where owner_profile_id = profile_uuid
      and is_active = true
  ) then
    return;
  end if;

  insert into public.programs (owner_profile_id, name)
  values (profile_uuid, 'ForgeFlow Starter Program')
  returning id into new_program_id;

  insert into public.program_days (program_id, sequence, name, focus, summary)
  values
    (new_program_id, 1, 'Day 1 - Upper Strength', 'Stable upper-body strength', 'Heavy upper-body work built around stable rows and presses that keep spinal loading under control.'),
    (new_program_id, 2, 'Day 2 - Lower A', 'Quad and glute emphasis', 'Lower-body work with quad and glute bias while keeping the lower back as quiet as possible.'),
    (new_program_id, 3, 'Day 3 - Pull', 'Back, rear delts, biceps', 'Pull-dominant hypertrophy with chest support and cable work instead of lower-back-loading rows.'),
    (new_program_id, 4, 'Day 4 - Push', 'Chest, shoulders, triceps', 'Push hypertrophy with quality volume, stable machine patterns, and quick access to previous numbers.'),
    (new_program_id, 5, 'Day 5 - Lower B', 'Posterior chain and calves', 'Posterior chain work with hip thrusts, ham curls, and anti-rotation core instead of deadlift-heavy loading.'),
    (new_program_id, 6, 'Day 6 - Delts / Arms', 'Low-fatigue pump work', 'A lower-fatigue pump day built around shoulders and arms with minimal spinal stress.');

  select id into day_id from public.program_days where program_id = new_program_id and sequence = 1;
  insert into public.program_day_exercises (program_day_id, exercise_key, exercise_name, position, target_sets, rep_range, cue) values
    (day_id, 'incline-dumbbell-press', 'Incline dumbbell press', 1, 4, '5-8', 'Heavy but controlled'),
    (day_id, 'chest-supported-row', 'Chest-supported row', 2, 4, '6-8', 'No bent-over rowing'),
    (day_id, 'machine-chest-press', 'Machine chest press', 3, 3, '6-10', 'Stable setup'),
    (day_id, 'neutral-grip-lat-pulldown', 'Neutral-grip lat pulldown', 4, 3, '6-10', 'Avoid swinging'),
    (day_id, 'seated-dumbbell-lateral-raise', 'Seated dumbbell lateral raise', 5, 4, '10-15', 'Strict form'),
    (day_id, 'cable-triceps-pressdown', 'Cable triceps pressdown', 6, 3, '10-15', 'Smooth lockout'),
    (day_id, 'incline-dumbbell-curl', 'Incline dumbbell curl', 7, 3, '10-15', 'Full stretch');

  select id into day_id from public.program_days where program_id = new_program_id and sequence = 2;
  insert into public.program_day_exercises (program_day_id, exercise_key, exercise_name, position, target_sets, rep_range, cue) values
    (day_id, 'leg-press', 'Leg press', 1, 4, '8-12', 'Keep lower back pinned'),
    (day_id, 'hack-or-pendulum-squat', 'Hack squat or pendulum squat', 2, 3, '8-12', 'Only if back feels fine'),
    (day_id, 'supported-bulgarian-split-squat', 'Supported Bulgarian split squat', 3, 3, '8-12', 'Use support for balance'),
    (day_id, 'leg-extension', 'Leg extension', 4, 3, '12-15', 'Hard squeeze at top'),
    (day_id, 'seated-hamstring-curl', 'Seated hamstring curl', 5, 3, '10-15', 'Controlled eccentric'),
    (day_id, 'standing-or-seated-calf-raise', 'Standing or seated calf raise', 6, 4, '10-15', 'Pause in the stretch'),
    (day_id, 'dead-bug', 'Dead bug', 7, 3, '8-12 / side', 'Slow and braced');

  select id into day_id from public.program_days where program_id = new_program_id and sequence = 3;
  insert into public.program_day_exercises (program_day_id, exercise_key, exercise_name, position, target_sets, rep_range, cue) values
    (day_id, 'pull-ups-or-assisted', 'Pull-ups or assisted pull-ups', 1, 4, '6-10', 'No kipping'),
    (day_id, 'chest-supported-t-bar-row', 'Chest-supported T-bar row', 2, 3, '8-12', 'Low-back spared'),
    (day_id, 'single-arm-cable-row', 'Single-arm cable row', 3, 3, '10-12', 'Pull elbow to hip'),
    (day_id, 'wide-grip-pulldown', 'Wide-grip pulldown', 4, 3, '10-12', 'Long range'),
    (day_id, 'rear-delt-cable-fly', 'Rear delt cable fly', 5, 3, '12-20', 'Control the arc'),
    (day_id, 'dumbbell-hammer-curl', 'Dumbbell hammer curl', 6, 3, '10-12', 'Neutral wrist'),
    (day_id, 'cable-curl', 'Cable curl', 7, 3, '12-15', 'Elbows still');

  select id into day_id from public.program_days where program_id = new_program_id and sequence = 4;
  insert into public.program_day_exercises (program_day_id, exercise_key, exercise_name, position, target_sets, rep_range, cue) values
    (day_id, 'flat-dumbbell-press', 'Flat dumbbell press', 1, 4, '8-12', 'No excessive leg drive'),
    (day_id, 'seated-machine-shoulder-press', 'Seated machine shoulder press', 2, 3, '8-12', 'Prefer machine over standing barbell'),
    (day_id, 'cable-fly-low-to-high', 'Cable fly, low-to-high', 3, 3, '12-15', 'Smooth squeeze'),
    (day_id, 'pec-deck-or-machine-fly', 'Pec deck or machine fly', 4, 3, '12-15', 'Controlled stretch'),
    (day_id, 'dumbbell-lateral-raise', 'Dumbbell lateral raise', 5, 4, '12-20', 'No swing'),
    (day_id, 'overhead-cable-triceps-extension', 'Overhead cable triceps extension', 6, 3, '10-15', 'Long-head focus'),
    (day_id, 'rope-pressdown-drop-set', 'Rope pressdown drop set', 7, 2, '10-12 + drop', 'Finisher without elbow flare');

  select id into day_id from public.program_days where program_id = new_program_id and sequence = 5;
  insert into public.program_day_exercises (program_day_id, exercise_key, exercise_name, position, target_sets, rep_range, cue) values
    (day_id, 'hip-thrust', 'Hip thrust machine or barbell hip thrust', 1, 4, '8-12', 'Main deadlift substitute'),
    (day_id, 'lying-hamstring-curl', 'Lying hamstring curl', 2, 4, '8-12', 'Heavy hamstring work'),
    (day_id, 'reverse-lunge-or-step-up', 'Smith machine reverse lunge or step-up', 3, 3, '8-12 / leg', 'Controlled pelvis'),
    (day_id, 'cable-pull-through', 'Cable pull-through', 4, 3, '10-15', 'Hinge without spinal load'),
    (day_id, 'hip-abduction-machine', 'Hip abduction machine', 5, 3, '15-20', 'Glute burn'),
    (day_id, 'calf-raise', 'Calf raise', 6, 4, '10-15', 'Full stretch'),
    (day_id, 'pallof-press', 'Pallof press', 7, 3, '10-12 / side', 'Brace hard');

  select id into day_id from public.program_days where program_id = new_program_id and sequence = 6;
  insert into public.program_day_exercises (program_day_id, exercise_key, exercise_name, position, target_sets, rep_range, cue) values
    (day_id, 'incline-smith-press', 'Incline Smith machine press', 1, 3, '8-12', 'Stable upper chest press'),
    (day_id, 'cable-lateral-raise', 'Cable lateral raise', 2, 4, '12-20', 'One arm at a time'),
    (day_id, 'rear-delt-machine-fly', 'Rear delt machine fly', 3, 3, '12-20', 'Smooth path'),
    (day_id, 'machine-preacher-curl', 'Machine preacher curl', 4, 3, '10-12', 'Stay strict'),
    (day_id, 'ez-bar-curl', 'EZ-bar curl', 5, 3, '10-12', 'No sway'),
    (day_id, 'close-grip-machine-press', 'Close-grip machine press or dip machine', 6, 3, '8-12', 'Safer than weighted dips'),
    (day_id, 'single-arm-cable-triceps-extension', 'Single-arm cable triceps extension', 7, 3, '12-15', 'Full lockout'),
    (day_id, 'lateral-raise-mechanical-drop-set', 'Lateral raise mechanical drop set', 8, 2, 'Strict reps then partials', 'Optional finisher');
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;

  perform public.bootstrap_default_program_for_profile(new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.programs enable row level security;
alter table public.program_days enable row level security;
alter table public.program_day_exercises enable row level security;
alter table public.workout_sessions enable row level security;
alter table public.workout_session_exercises enable row level security;
alter table public.workout_sets enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "programs_own_all"
  on public.programs for all
  using (owner_profile_id = auth.uid())
  with check (owner_profile_id = auth.uid());

create policy "program_days_through_program"
  on public.program_days for all
  using (
    exists (
      select 1
      from public.programs
      where public.programs.id = program_days.program_id
        and public.programs.owner_profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.programs
      where public.programs.id = program_days.program_id
        and public.programs.owner_profile_id = auth.uid()
    )
  );

create policy "program_day_exercises_through_day"
  on public.program_day_exercises for all
  using (
    exists (
      select 1
      from public.program_days
      join public.programs on public.programs.id = public.program_days.program_id
      where public.program_days.id = program_day_exercises.program_day_id
        and public.programs.owner_profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.program_days
      join public.programs on public.programs.id = public.program_days.program_id
      where public.program_days.id = program_day_exercises.program_day_id
        and public.programs.owner_profile_id = auth.uid()
    )
  );

create policy "workout_sessions_own_all"
  on public.workout_sessions for all
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

create policy "workout_session_exercises_through_session"
  on public.workout_session_exercises for all
  using (
    exists (
      select 1
      from public.workout_sessions
      where public.workout_sessions.id = workout_session_exercises.workout_session_id
        and public.workout_sessions.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.workout_sessions
      where public.workout_sessions.id = workout_session_exercises.workout_session_id
        and public.workout_sessions.profile_id = auth.uid()
    )
  );

create policy "workout_sets_through_session_exercises"
  on public.workout_sets for all
  using (
    exists (
      select 1
      from public.workout_session_exercises
      join public.workout_sessions
        on public.workout_sessions.id = public.workout_session_exercises.workout_session_id
      where public.workout_session_exercises.id = workout_sets.workout_session_exercise_id
        and public.workout_sessions.profile_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.workout_session_exercises
      join public.workout_sessions
        on public.workout_sessions.id = public.workout_session_exercises.workout_session_id
      where public.workout_session_exercises.id = workout_sets.workout_session_exercise_id
        and public.workout_sessions.profile_id = auth.uid()
    )
  );

create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute procedure public.touch_updated_at();

create trigger programs_touch_updated_at
before update on public.programs
for each row execute procedure public.touch_updated_at();

create trigger program_days_touch_updated_at
before update on public.program_days
for each row execute procedure public.touch_updated_at();

create trigger program_day_exercises_touch_updated_at
before update on public.program_day_exercises
for each row execute procedure public.touch_updated_at();

create trigger workout_sessions_touch_updated_at
before update on public.workout_sessions
for each row execute procedure public.touch_updated_at();

create trigger workout_session_exercises_touch_updated_at
before update on public.workout_session_exercises
for each row execute procedure public.touch_updated_at();

create trigger workout_sets_touch_updated_at
before update on public.workout_sets
for each row execute procedure public.touch_updated_at();
