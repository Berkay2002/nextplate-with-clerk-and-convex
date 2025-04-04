export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          created_at: string
          id: string
          round_id: string
          text: string
          user_id: string
          votes: number
        }
        Insert: {
          created_at?: string
          id?: string
          round_id: string
          text: string
          user_id: string
          votes?: number
        }
        Update: {
          created_at?: string
          id?: string
          round_id?: string
          text?: string
          user_id?: string
          votes?: number
        }
        Relationships: [
          {
            foreignKeyName: "comments_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          }
        ]
      }
      game_events: {
        Row: {
          created_at: string | null
          event_type: string
          game_id: string
          id: string
          payload: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          game_id: string
          id?: string
          payload?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          game_id?: string
          id?: string
          payload?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_events_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          }
        ]
      }
      game_players: {
        Row: {
          game_id: string
          id: string
          is_spectator: boolean
          joined_at: string
          user_id: string
        }
        Insert: {
          game_id: string
          id?: string
          is_spectator?: boolean
          joined_at?: string
          user_id: string
        }
        Update: {
          game_id?: string
          id?: string
          is_spectator?: boolean
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          }
        ]
      }
      games: {
        Row: {
          code: string
          created_at: string
          host_id: string
          id: string
          serendipity_image_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          host_id: string
          id?: string
          serendipity_image_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          host_id?: string
          id?: string
          serendipity_image_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string
          downvotes: number | null
          id: string
          is_fallback: boolean | null
          is_serendipity_eligible: boolean
          serendipity_wins: number
          source_url: string | null
          storage_path: string
          title: string
          uploader_id: string
          upvotes: number | null
          usage_count: number
          used_in_game: string | null
        }
        Insert: {
          created_at?: string
          downvotes?: number | null
          id?: string
          is_fallback?: boolean | null
          is_serendipity_eligible?: boolean
          serendipity_wins?: number
          source_url?: string | null
          storage_path: string
          title: string
          uploader_id: string
          upvotes?: number | null
          usage_count?: number
          used_in_game?: string | null
        }
        Update: {
          created_at?: string
          downvotes?: number | null
          id?: string
          is_fallback?: boolean | null
          is_serendipity_eligible?: boolean
          serendipity_wins?: number
          source_url?: string | null
          storage_path?: string
          title?: string
          uploader_id?: string
          upvotes?: number | null
          usage_count?: number
          used_in_game?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "images_used_in_game_fkey"
            columns: ["used_in_game"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      rounds: {
        Row: {
          created_at: string
          end_time: string | null
          game_id: string
          id: string
          image_id: string
          round_number: number
          start_time: string | null
          status: string
          winner_comment_id: string | null
          winner_user_id: string | null
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          game_id: string
          id?: string
          image_id: string
          round_number: number
          start_time?: string | null
          status?: string
          winner_comment_id?: string | null
          winner_user_id?: string | null
        }
        Update: {
          created_at?: string
          end_time?: string | null
          game_id?: string
          id?: string
          image_id?: string
          round_number?: number
          start_time?: string | null
          status?: string
          winner_comment_id?: string | null
          winner_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rounds_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rounds_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "fallback_images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rounds_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      serendipity_tracker: {
        Row: {
          current_index: number
          id: number
          last_updated: string
        }
        Insert: {
          current_index?: number
          id?: number
          last_updated?: string
        }
        Update: {
          current_index?: number
          id?: number
          last_updated?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          round_id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          round_id: string
          user_id: string
          vote_type?: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          round_id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "rounds"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      fallback_images: {
        Row: {
          created_at: string | null
          id: string | null
          is_fallback: boolean | null
          is_serendipity_eligible: boolean | null
          serendipity_wins: number | null
          source_url: string | null
          storage_path: string | null
          title: string | null
          uploader_id: string | null
          usage_count: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          is_fallback?: boolean | null
          is_serendipity_eligible?: boolean | null
          serendipity_wins?: number | null
          source_url?: string | null
          storage_path?: string | null
          title?: string | null
          uploader_id?: string | null
          usage_count?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          is_fallback?: boolean | null
          is_serendipity_eligible?: boolean | null
          serendipity_wins?: number | null
          source_url?: string | null
          storage_path?: string | null
          title?: string | null
          uploader_id?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
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
