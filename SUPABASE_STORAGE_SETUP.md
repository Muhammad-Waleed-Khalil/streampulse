# Supabase Storage Setup for StreamPulse

This guide will help you set up Supabase Storage for thumbnail uploads.

## Step 1: Get Supabase API Keys

1. Go to your Supabase dashboard: https://app.supabase.com/project/ksqfczkegxnzqtibgmdd/settings/api
2. Copy the following values:
   - **Project URL** (e.g., `https://ksqfczkegxnzqtibgmdd.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

3. Add them to your `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL="https://ksqfczkegxnzqtibgmdd.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

## Step 2: Create Storage Bucket

1. Go to Storage in your Supabase dashboard: https://app.supabase.com/project/ksqfczkegxnzqtibgmdd/storage/buckets
2. Click **New bucket**
3. Configure the bucket:
   - **Name**: `stream-thumbnails`
   - **Public bucket**: ✅ Enable (so thumbnails are publicly accessible)
   - Click **Create bucket**

## Step 3: Configure Bucket Policies (Optional but Recommended)

If you want to add more security, you can set up Row Level Security (RLS) policies:

1. Go to Storage > Policies
2. Create policies for the `stream-thumbnails` bucket:

### Upload Policy
```sql
CREATE POLICY "Authenticated users can upload thumbnails"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'stream-thumbnails');
```

### Read Policy (Public)
```sql
CREATE POLICY "Anyone can view thumbnails"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'stream-thumbnails');
```

### Delete Policy
```sql
CREATE POLICY "Users can delete their own thumbnails"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'stream-thumbnails');
```

## Step 4: Restart Your Development Server

After adding the environment variables, restart your dev server:

```bash
npm run dev
```

## Step 5: Test the Upload

1. Log in to your application
2. Go to your stream dashboard
3. Click "Edit" on your stream info
4. Try uploading a thumbnail image
5. The image should upload to Supabase Storage and display in your stream

## Troubleshooting

### "Bucket not found" error
- Make sure you created the bucket named exactly `stream-thumbnails`
- Check that the bucket is set to **public**

### "Invalid API key" error
- Verify your environment variables are correct
- Make sure you copied the full keys without extra spaces
- Restart your dev server after updating `.env.local`

### Upload fails silently
- Check the browser console for errors
- Verify the image is under 4MB
- Ensure the file is a valid image format (PNG, JPG, GIF)

## Migration from UploadThing

The migration from UploadThing to Supabase Storage is complete! The following changes were made:

1. ✅ Removed `uploadthing` and `@uploadthing/react` packages
2. ✅ Installed `@supabase/supabase-js`
3. ✅ Created new upload API at `/api/upload/thumbnail`
4. ✅ Updated the upload component in `info-modal.tsx`
5. ✅ Removed old UploadThing configuration files

All existing thumbnails will continue to work. New uploads will be stored in Supabase Storage.
