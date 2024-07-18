export default function supabaseLoader({ src, width, quality }) {
  return `https://${process.env.NEXT_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/render/image/public/${src}?width=${width}&quality=${quality || 75}`;
}
