export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      academic_records: {
        Row: {
          assignment_rate: number | null
          backlogs: number | null
          course: string
          created_at: string
          exam_score: number | null
          gpa: number | null
          id: string
          semester: string
          student_id: string
        }
        Insert: {
          assignment_rate?: number | null
          backlogs?: number | null
          course: string
          created_at?: string
          exam_score?: number | null
          gpa?: number | null
          id?: string
          semester: string
          student_id: string
        }
        Update: {
          assignment_rate?: number | null
          backlogs?: number | null
          course?: string
          created_at?: string
          exam_score?: number | null
          gpa?: number | null
          id?: string
          semester?: string
          student_id?: string
        }
        Relationships: []
      }
      activities: {
        Row: {
          activity_name: string
          activity_type: string
          created_at: string
          id: string
          participation_date: string
          student_id: string
        }
        Insert: {
          activity_name: string
          activity_type: string
          created_at?: string
          id?: string
          participation_date: string
          student_id: string
        }
        Update: {
          activity_name?: string
          activity_type?: string
          created_at?: string
          id?: string
          participation_date?: string
          student_id?: string
        }
        Relationships: []
      }
      alerts: {
        Row: {
          alert_type: string
          assigned_to: string | null
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          severity: string
          student_id: string
        }
        Insert: {
          alert_type: string
          assigned_to?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          severity: string
          student_id: string
        }
        Update: {
          alert_type?: string
          assigned_to?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          severity?: string
          student_id?: string
        }
        Relationships: []
      }
      attendance: {
        Row: {
          course: string
          created_at: string
          date: string
          id: string
          status: string
          student_id: string
        }
        Insert: {
          course: string
          created_at?: string
          date: string
          id?: string
          status: string
          student_id: string
        }
        Update: {
          course?: string
          created_at?: string
          date?: string
          id?: string
          status?: string
          student_id?: string
        }
        Relationships: []
      }
      chat_logs: {
        Row: {
          created_at: string
          id: string
          message: string
          sender: string
          sentiment: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          sender: string
          sentiment?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          sender?: string
          sentiment?: string | null
          user_id?: string
        }
        Relationships: []
      }
      counseling_sessions: {
        Row: {
          counselor_id: string | null
          created_at: string
          id: string
          notes: string | null
          scheduled_at: string
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          counselor_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          scheduled_at: string
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          counselor_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          scheduled_at?: string
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      mood_surveys: {
        Row: {
          created_at: string
          id: string
          mood_score: number
          notes: string | null
          sleep_hours: number | null
          stress_level: number
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood_score: number
          notes?: string | null
          sleep_hours?: number | null
          stress_level: number
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood_score?: number
          notes?: string | null
          sleep_hours?: number | null
          stress_level?: number
          student_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          student_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          student_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          student_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      risk_scores: {
        Row: {
          burnout_risk: number | null
          created_at: string
          dropout_risk: number | null
          id: string
          overall_score: number
          reasons: Json | null
          risk_level: string
          stress_risk: number | null
          student_id: string
          suggested_actions: Json | null
        }
        Insert: {
          burnout_risk?: number | null
          created_at?: string
          dropout_risk?: number | null
          id?: string
          overall_score: number
          reasons?: Json | null
          risk_level: string
          stress_risk?: number | null
          student_id: string
          suggested_actions?: Json | null
        }
        Update: {
          burnout_risk?: number | null
          created_at?: string
          dropout_risk?: number | null
          id?: string
          overall_score?: number
          reasons?: Json | null
          risk_level?: string
          stress_risk?: number | null
          student_id?: string
          suggested_actions?: Json | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "faculty" | "counselor" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["student", "faculty", "counselor", "admin"],
    },
  },
} as const
