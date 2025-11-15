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

## Step 3: Create Email Templates

You need to create **TWO** templates:

### Template 1: Notification to Company (conceptusacars@gmail.com)

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Settings:
   - **Template Name**: Car Inquiry - CONCEPT USA
   - **Subject**: Nowe zapytanie o samochód z USA - {{from_name}}
   - **To Email**: {{to_email}} (or directly: conceptusacars@gmail.com)
   - **From Name**: {{from_name}}
   - **Reply To**: {{from_email}}

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

4. Copy the **Template ID** (looks like: `template_xxxxxxx`)

---

### Template 2: Auto-Reply to Customer

1. Click **"Create New Template"** (second template)
2. Settings:
   - **Template Name**: Auto-Reply - Thank You
   - **Subject**: Dziękujemy za zapytanie! 🚗 CONCEPT USA
   - **To Email**: {{to_email}}
   - **From Name**: CONCEPT USA
   - **Reply To**: conceptusacars@gmail.com

### Email Content (HTML):
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #dc2626 0%, #2563eb 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🚗 CONCEPT USA</h1>
    <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Samochody z USA</p>
  </div>

  <div style="background: #f3f4f6; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1f2937; margin-top: 0;">Cześć {{to_name}}! 👋</h2>

    <p style="color: #374151; font-size: 16px; line-height: 1.6;">
      Dziękujemy za wysłanie zapytania przez naszą stronę!
    </p>

    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 20px 0;">
      <h3 style="color: #1f2937; margin-top: 0;">📋 Twoje zapytanie:</h3>
      <pre style="color: #4b5563; font-family: Arial, sans-serif; white-space: pre-wrap; margin: 0;">{{inquiry_details}}</pre>
    </div>

    <p style="color: #374151; font-size: 16px; line-height: 1.6;">
      <strong>Skontaktujemy się z Tobą w ciągu 24 godzin</strong> z ofertą dopasowaną do Twoich oczekiwań! 🇺🇸
    </p>

    <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="color: #1e40af; margin: 0; font-size: 14px;">
        💡 <strong>Potrzebujesz szybszego kontaktu?</strong><br>
        Zadzwoń do nas: <a href="tel:+48691795116" style="color: #dc2626; text-decoration: none;">+48 691 795 116</a>
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #d1d5db; margin: 30px 0;">

    <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
      <strong>CONCEPT USA</strong><br>
      📧 conceptusacars@gmail.com<br>
      📱 +48 691 795 116<br>
      🌐 <a href="https://conceptusa.pl" style="color: #dc2626; text-decoration: none;">conceptusa.pl</a>
    </p>
  </div>
</div>
```

3. Copy the **Auto-Reply Template ID** (looks like: `template_yyyyyyy`)

---

## Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

### Local Development (.env)
Create `.env` file in project root:

```bash
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID=template_yyyyyyy
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### Vercel Production
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add **FOUR** variables:
   - `REACT_APP_EMAILJS_SERVICE_ID` = service_xxxxxxx
   - `REACT_APP_EMAILJS_TEMPLATE_ID` = template_xxxxxxx (notification to company)
   - `REACT_APP_EMAILJS_AUTOREPLY_TEMPLATE_ID` = template_yyyyyyy (auto-reply to customer)
   - `REACT_APP_EMAILJS_PUBLIC_KEY` = xxxxxxxxxxxxxxx
3. Apply to: Production, Preview, Development
4. Redeploy (automatic after saving)

## Step 6: Test

1. Go to your website
2. Fill out the contact form
3. Submit
4. Check **TWO** inboxes:
   - conceptusacars@gmail.com - should receive inquiry notification
   - Customer's email - should receive thank you message
5. Verify both emails are formatted correctly

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
