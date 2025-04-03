import { Member, Shift } from '@/types/member';

export const members: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    created_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    created_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    created_at: '2024-02-01T00:00:00Z'
  }
];

export const shifts: Shift[] = [
  {
    id: '1',
    member_id: '1',
    scheduled_date: '2024-02-01',
    scheduled_start: '09:00',
    scheduled_end: '17:00',
    clock_in: '2024-02-01T09:05:00Z',
    clock_out: '2024-02-01T17:10:00Z',
    created_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '2',
    member_id: '1',
    scheduled_date: '2024-02-02',
    scheduled_start: '09:00',
    scheduled_end: '17:00',
    clock_in: '2024-02-02T08:55:00Z',
    clock_out: null,
    created_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    member_id: '2',
    scheduled_date: '2024-02-01',
    scheduled_start: '10:00',
    scheduled_end: '18:00',
    clock_in: '2024-02-01T10:15:00Z',
    clock_out: '2024-02-01T17:30:00Z',
    created_at: '2024-02-01T00:00:00Z'
  },
  {
    id: '4',
    member_id: '3',
    scheduled_date: '2024-02-01',
    scheduled_start: '08:00',
    scheduled_end: '16:00',
    clock_in: null,
    clock_out: null,
    created_at: '2024-02-01T00:00:00Z'
  }
];