import { query } from "./_generated/server";

// Check if the current user is authenticated
export const getAuthenticatedUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      return null;
    }
    
    return {
      id: identity.subject,
      name: identity.name,
      email: identity.email,
    };
  },
});

// Get user roles or permissions (example)
export const getUserRole = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      return null;
    }
    
    // You could fetch the user's role from a database here
    // For simplicity, we're just returning a default role
    return "user";
  },
}); 