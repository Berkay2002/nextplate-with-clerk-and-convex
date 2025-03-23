import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get user by Clerk ID
export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
  },
});

// Create or update a user
export const createOrUpdateUser = mutation({
  args: { 
    userId: v.string(), 
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
      
    if (existingUser) {
      // Update user
      return await ctx.db.patch(existingUser._id, {
        email: args.email,
        name: args.name,
        imageUrl: args.imageUrl,
      });
    } else {
      // Create user
      return await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        imageUrl: args.imageUrl,
        onboardingCompleted: true,
      });
    }
  },
});

// Complete user onboarding
export const completeOnboarding = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
      
    if (!user) {
      throw new Error("User not found");
    }
    
    return await ctx.db.patch(user._id, {
      onboardingCompleted: true,
    });
  },
}); 