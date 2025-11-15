# Admin Guide

## Access

- **Website**: https://conceptusa.pl
- **Admin Panel**: https://conceptusa.pl/admin
- **Password**: **ASK ADMIN**

## Email Configuration

**Email Address**: conceptusacars@gmail.com

### Gmail SMTP Setup (Vercel)
1. Enable 2-Step Verification at https://myaccount.google.com/security
2. Generate App Password: Security → App passwords → Select "Mail" + "Other"
3. Add to Vercel Environment Variables:
   - `GMAIL_USER=conceptusacars@gmail.com`
   - `GMAIL_APP_PASSWORD=[16-character code]`

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
- **Functions**: `/api/send-email.js` for contact form

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
