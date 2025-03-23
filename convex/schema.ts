import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    onboardingCompleted: v.boolean(),
  }).index("by_userId", ["userId"]),
  
  // Add more tables as needed for your project
}); 