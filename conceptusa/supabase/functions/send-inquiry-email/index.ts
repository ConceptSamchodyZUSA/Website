// Supabase Edge Function to send inquiry emails
// Deploy: supabase functions deploy send-inquiry-email

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM_EMAIL = 'onboarding@resend.dev' // Zmień na swoją domenę gdy zweryfikujesz
const TO_EMAIL = 'sklepelegant26@gmail.com'

interface InquiryData {
  name: string
  email: string
  phone: string
  brand?: string
  model?: string
  budget?: number
  year?: string
  message?: string
  car_id?: string
}

serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  try {
    const inquiryData: InquiryData = await req.json()

    // Build email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #dc2626, #2563eb); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; }
          .label { font-weight: bold; color: #4b5563; }
          .value { color: #111827; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🚗 Nowe zapytanie - CONCEPT USA</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Imię i nazwisko:</div>
              <div class="value">${inquiryData.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${inquiryData.email}">${inquiryData.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Telefon:</div>
              <div class="value"><a href="tel:${inquiryData.phone}">${inquiryData.phone}</a></div>
            </div>
            ${inquiryData.brand ? `
            <div class="field">
              <div class="label">Marka:</div>
              <div class="value">${inquiryData.brand}</div>
            </div>
            ` : ''}
            ${inquiryData.model ? `
            <div class="field">
              <div class="label">Model:</div>
              <div class="value">${inquiryData.model}</div>
            </div>
            ` : ''}
            ${inquiryData.year ? `
            <div class="field">
              <div class="label">Rok produkcji:</div>
              <div class="value">${inquiryData.year}</div>
            </div>
            ` : ''}
            ${inquiryData.budget ? `
            <div class="field">
              <div class="label">Budżet:</div>
              <div class="value">${inquiryData.budget.toLocaleString('pl-PL')} PLN</div>
            </div>
            ` : ''}
            ${inquiryData.message ? `
            <div class="field">
              <div class="label">Wiadomość:</div>
              <div class="value">${inquiryData.message}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Data zapytania:</div>
              <div class="value">${new Date().toLocaleString('pl-PL')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `🚗 Nowe zapytanie: ${inquiryData.name} - ${inquiryData.brand || 'Ogólne'}`,
        html: emailHtml,
        reply_to: inquiryData.email,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(data)}`)
    }

    return new Response(
      JSON.stringify({ success: true, messageId: data.id }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        status: 500,
      },
    )
  }
})
