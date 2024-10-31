export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      multiple_choices: {
        Row: {
          choices: string[]
          created_at: string
          id: number
          index: number
          question: string
          required: boolean
          svorm_id: number
        }
        Insert: {
          choices: string[]
          created_at?: string
          id?: number
          index: number
          question?: string
          required: boolean
          svorm_id: number
        }
        Update: {
          choices?: string[]
          created_at?: string
          id?: number
          index?: number
          question?: string
          required?: boolean
          svorm_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "multiple_choices_svorm_id_fkey"
            columns: ["svorm_id"]
            isOneToOne: false
            referencedRelation: "svorms"
            referencedColumns: ["id"]
          },
        ]
      }
      multiple_choices_answers: {
        Row: {
          choice: number
          created_at: string
          id: number
          question_id: number
        }
        Insert: {
          choice?: number
          created_at?: string
          id?: number
          question_id: number
        }
        Update: {
          choice?: number
          created_at?: string
          id?: number
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "multiple_choices_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "multiple_choices"
            referencedColumns: ["id"]
          },
        ]
      }
      simple_questions: {
        Row: {
          created_at: string
          id: number
          index: number
          question: string
          required: boolean
          svorm_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          index: number
          question?: string
          required: boolean
          svorm_id: number
        }
        Update: {
          created_at?: string
          id?: number
          index?: number
          question?: string
          required?: boolean
          svorm_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "simple_questions_svorm_id_fkey"
            columns: ["svorm_id"]
            isOneToOne: false
            referencedRelation: "svorms"
            referencedColumns: ["id"]
          },
        ]
      }
      simple_questions_answers: {
        Row: {
          answer: string
          created_at: string
          id: number
          question_id: number | null
        }
        Insert: {
          answer: string
          created_at?: string
          id?: number
          question_id?: number | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: number
          question_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "simple_questions_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "simple_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      svorms: {
        Row: {
          created_at: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string
        }
        Update: {
          created_at?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
