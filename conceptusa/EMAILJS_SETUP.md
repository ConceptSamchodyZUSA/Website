# EmailJS Configuration Guide

## Step 1: Create EmailJS Account

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign up with your email (conceptusacars@gmail.com recommended)
3. Verify your email address

## Step 2: Add Email Service

1. Click **"Add New Service"**
2. Choose **"Gmail"**
3. Click **"Connect Account"** and sign in with conceptusacars@gmail.com
4. Service will be created automatically
5. Copy the **Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

### Template Settings:
- **Template Name**: Car Inquiry - CONCEPT USA
- **Subject**: Nowe zapytanie o samochód z USA - {{from_name}}

### Email Content (HTML):
```html
<h2>Nowe zapytanie o samochód z USA</h2>

<p><strong>Dane kontaktowe:</strong></p>
<ul>
  <li>Imię: {{from_name}}</li>
  <li>Email: {{from_email}}</li>
  <li>Telefon: {{phone}}</li>
</ul>

<p><strong>Preferencje samochodu:</strong></p>
<ul>
  <li>Marka: {{brand}}</li>
  <li>Model: {{model}}</li>
  <li>Rok produkcji: {{year}}</li>
  <li>Budżet: {{budget}}</li>
</ul>

<p><strong>Dodatkowe informacje:</strong></p>
<p>{{message}}</p>

<hr>
<p><small>Wiadomość wysłana ze strony conceptusa.pl</small></p>
```

4. **To Email**: {{to_email}} (or directly: conceptusacars@gmail.com)
5. **From Name**: {{from_name}}
6. **Reply To**: {{from_email}}
7. Copy the **Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

### Local Development (.env)
Create `.env` file in project root:

```bash
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### Vercel Production
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add three variables:
   - `REACT_APP_EMAILJS_SERVICE_ID` = service_xxxxxxx
   - `REACT_APP_EMAILJS_TEMPLATE_ID` = template_xxxxxxx
   - `REACT_APP_EMAILJS_PUBLIC_KEY` = xxxxxxxxxxxxxxx
3. Apply to: Production, Preview, Development
4. Redeploy (automatic after saving)

## Step 6: Test

1. Go to your website
2. Fill out the contact form
3. Submit
4. Check conceptusacars@gmail.com inbox
5. You should receive formatted email with inquiry details

## EmailJS Free Plan Limits

- **200 emails/month** (free)
- Upgrade to $15/month for 1000 emails if needed

## Troubleshooting

### "Failed to send email"
- Check if all environment variables are set correctly
- Verify Service ID, Template ID, and Public Key match EmailJS dashboard
- Check browser console for detailed error

### Emails not arriving
- Check spam folder
- Verify Gmail account is connected in EmailJS service
- Test template by clicking "Test it" button in EmailJS dashboard

### CORS errors
- EmailJS handles CORS automatically, no configuration needed
- If issue persists, check if EmailJS service is active

## Template Variables Reference

Variables you can use in EmailJS template:
- `{{from_name}}` - Customer name
- `{{from_email}}` - Customer email
- `{{phone}}` - Customer phone
- `{{brand}}` - Car brand
- `{{model}}` - Car model
- `{{year}}` - Production year
- `{{budget}}` - Budget in PLN
- `{{message}}` - Additional message
- `{{to_email}}` - Recipient (conceptusacars@gmail.com)
