export interface Member {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface Shift {
  id: string;
  member_id: string;
  scheduled_date: string;
  scheduled_start: string;
  scheduled_end: string;
  clock_in: string | null;
  clock_out: string | null;
  created_at: string;
}
