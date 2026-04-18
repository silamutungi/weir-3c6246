export type AlertStatus = 'pending' | 'approved' | 'disputed' | 'removed'

export interface WeirAlert {
  id: string
  user_id: string
  platform: string
  content_url: string
  match_confidence: number
  status: AlertStatus
  detected_at: string
  resolved_at: string | null
  earnings_amount: number | null
  created_at: string
  deleted_at: string | null
}

export interface WeirLicense {
  id: string
  user_id: string
  licensee_name: string
  platform: string
  license_type: string
  fee_amount: number
  status: 'active' | 'expired' | 'draft'
  start_date: string
  end_date: string | null
  created_at: string
  deleted_at: string | null
}

export interface WeirProfile {
  id: string
  user_id: string
  display_name: string
  bio: string | null
  social_handles: Record<string, string>
  total_earnings: number
  created_at: string
  updated_at: string
}

export interface WeirEarning {
  id: string
  user_id: string
  alert_id: string | null
  license_id: string | null
  platform: string
  earning_type: string
  amount: number
  paid_at: string | null
  created_at: string
}
