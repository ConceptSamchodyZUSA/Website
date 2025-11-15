# Admin Guide

## Access

- **Website**: https://conceptusa.pl
- **Admin Panel**: https://conceptusa.pl/admin
- **Password**: **ASK ADMIN**

## Email Configuration

**Email Address**: conceptusacars@gmail.com

### EmailJS Setup (Current)

Email notifications use EmailJS service with **auto-reply** feature.

1. **EmailJS Account**: dashboard.emailjs.com
2. **Two Email Templates**:
   - Template 1: Notification to company (conceptusacars@gmail.com)
   - Template 2: Auto-reply to customer (thank you message)

3. **Environment Variables** (in Vercel):
   - `REACT_APP_EMAILJS_SERVICE_ID` - Gmail service ID
   - `REACT_APP_EMAILJS_TEMPLATE_ID` - Company notification template
   - `REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID` - Customer auto-reply template
   - `REACT_APP_EMAILJS_PUBLIC_KEY` - Public API key

4. **Features**:
   - Customer receives instant thank you email
   - Company receives inquiry notification
   - Both emails styled with brand colors

**Full setup guide**: See `EMAILJS_SETUP.md`

**Free tier**: 200 emails/month (100 inquiries = 200 emails)

## Database (Supabase)

- **Project**: conceptusa
- **Tables**: `cars`, `inquiries`
- **Access**: Both anon (public) and service_role (admin) clients configured

### SQL Migrations
Run in Supabase Dashboard → SQL Editor when needed:
- `supabase-schema.sql` - Initial schema
- `supabase-migration-multiple-images.sql` - Multiple images support
- `supabase-migration-add-drivetrain.sql` - Drivetrain field
- `fix-inquiries-rls.sql` - Inquiry permissions

## Google Search Console

- **Property**: https://conceptusa.pl
- **Verification**: DNS TXT record (already configured)
- **Sitemap**: https://conceptusa.pl/sitemap.xml

### Indexing
1. Sitemaps → Add "sitemap.xml"
2. URL Inspection → Enter URL → Request indexing

## Deployment (Vercel)

- **Domain**: conceptusa.pl (home.pl DNS)
- **Auto-deploy**: Pushes to main branch
- **Email**: EmailJS (no server-side functions needed)

## Car Management

**Admin Panel Features**:
- Add/Edit/Delete cars
- Upload multiple images (drag to reorder)
- Filter by brand and availability
- Drivetrain options: RWD, FWD, AWD, 4WD

**Car Status**:
- `available` - Shown first in portfolio
- `sold` - Shown last with "SPRZEDANE" badge

## Contact Information

- **Email**: conceptusacars@gmail.com
- **Phone**: +48-691-795-116
- **Location**: Dębogórze, Poland
