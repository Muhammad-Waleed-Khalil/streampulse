# StreamPulse Setup Guide

## Current Status

✅ **Clerk middleware is fixed and working**
✅ **Development server running on:** http://localhost:3000
✅ **ngrok tunnel active at:** https://363029fd7225.ngrok-free.app

---

## Step-by-Step Setup Instructions

### Step 1: Configure Clerk Webhooks

1. **Go to Clerk Dashboard**
   - Visit: https://dashboard.clerk.com
   - Select your application

2. **Navigate to Webhooks**
   - Click on "Webhooks" in the left sidebar
   - Click "Add Endpoint"

3. **Configure the Webhook Endpoint**
   - **Endpoint URL:** `https://363029fd7225.ngrok-free.app/api/webhooks/clerk`
   - **Description:** User sync webhook (optional)
   - **Subscribe to events:**
     - ✅ `user.created`
     - ✅ `user.updated`
     - ✅ `user.deleted`

4. **Copy the Signing Secret**
   - After creating the webhook, Clerk will show you a signing secret
   - Copy this secret

5. **Update Your .env File**
   - The webhook secret is already in your `.env` file as `CLERK_WEBHOOK_SECRET`
   - If the secret is different, update line 3 in `.env` with the new value

---

### Step 2: Test User Registration

1. **Open your app:** http://localhost:3000

2. **Sign Up for a new account:**
   - Click "Login" button
   - Click "Sign up"
   - Create a new account with:
     - Email
     - **IMPORTANT:** Set a username (required for the app to work)
     - Password

3. **What happens behind the scenes:**
   - Clerk creates the user account
   - Clerk sends a `user.created` webhook to your app via ngrok
   - Your app receives the webhook at `/api/webhooks/clerk`
   - The webhook handler creates a user record in your database
   - A stream is automatically created for the user

4. **Access your dashboard:**
   - After sign up, you should be able to access: http://localhost:3000/u/YOUR_USERNAME
   - Replace `YOUR_USERNAME` with the username you set during registration

---

### Step 3: Verify Everything is Working

**Check if the webhook is receiving events:**
1. Go to Clerk Dashboard → Webhooks
2. Click on your webhook endpoint
3. Check the "Events" tab to see if events are being sent
4. Look for successful 200 responses

**Check your database:**
Run this command to see if users are being created:
```bash
npx prisma studio
```
This will open Prisma Studio where you can view your database records.

---

## Common Issues and Solutions

### Issue 1: "Unauthorized" Error
**Cause:** User is not signed in or doesn't exist in database
**Solution:**
- Make sure you're signed in
- Check that webhooks are configured correctly
- Verify the user exists in your database using Prisma Studio

### Issue 2: Webhook not receiving events
**Cause:** ngrok URL changed or webhook not configured
**Solution:**
- ngrok generates a new URL each time it starts (free tier)
- Update the webhook URL in Clerk Dashboard with the current ngrok URL
- Current ngrok URL: https://363029fd7225.ngrok-free.app

### Issue 3: User doesn't have a username
**Cause:** Username not set during registration
**Solution:**
- Go to Clerk Dashboard → Users
- Edit the user and add a username
- Or sign up again with a username

---

## Development Workflow

**Every time you start development:**

1. Start your Next.js dev server (already running):
   ```bash
   npm run dev
   ```

2. Start ngrok (already running):
   ```bash
   ngrok http 3000
   ```

3. **IMPORTANT:** Update Clerk webhook URL with the new ngrok URL
   - ngrok free tier generates a new URL each time
   - Copy the new ngrok URL from the terminal
   - Update in Clerk Dashboard → Webhooks

**Alternative:** Use ngrok's static domain (requires paid plan) or deploy to a staging environment.

---

## Production Deployment

When deploying to production:

1. Replace ngrok URL with your production domain in Clerk webhooks
2. Generate a new webhook signing secret for production
3. Update environment variables on your hosting platform
4. Redeploy your application

---

## Current Environment

- **Local Server:** http://localhost:3000
- **ngrok Tunnel:** https://363029fd7225.ngrok-free.app
- **ngrok Web Interface:** http://127.0.0.1:4040 (view webhook requests)
- **Webhook Endpoint:** https://363029fd7225.ngrok-free.app/api/webhooks/clerk

---

## Next Steps

1. ✅ Configure webhooks in Clerk Dashboard (see Step 1)
2. ✅ Create a test account (see Step 2)
3. ✅ Access your dashboard at `/u/YOUR_USERNAME`
4. ✅ Start building your streaming platform!

---

## Useful Commands

```bash
# Start development server
npm run dev

# Start ngrok tunnel
ngrok http 3000

# Open Prisma Studio (database viewer)
npx prisma studio

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

---

## Support

If you encounter any issues:
1. Check the ngrok web interface at http://127.0.0.1:4040 to see webhook requests
2. Check your Next.js dev server console for errors
3. Check Clerk Dashboard → Webhooks → Events for webhook delivery status
