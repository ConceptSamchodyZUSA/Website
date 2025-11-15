// Vercel Serverless Function - Wysyłka emaili przez Gmail SMTP
// Automatycznie działa na Vercel - zero dodatkowej konfiguracji!

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, email, phone, brand, model, budget, year, message } = req.body;

    // Walidacja
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Konfiguracja Gmail SMTP
    // Użyj zmiennych środowiskowych w Vercel
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // conceptusacars@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // Hasło aplikacji z Google
      },
    });

    // Treść emaila (HTML)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(to right, #dc2626, #2563eb); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #dc2626; }
          .label { font-weight: bold; color: #4b5563; font-size: 12px; text-transform: uppercase; }
          .value { color: #111827; margin-top: 5px; font-size: 16px; }
          .footer { margin-top: 20px; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🚗 Nowe zapytanie - CONCEPT USA</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Otrzymano nowe zapytanie ze strony internetowej</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Imię i nazwisko</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Telefon</div>
              <div class="value"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></div>
            </div>
            ${brand ? `
            <div class="field">
              <div class="label">Marka</div>
              <div class="value">${brand}</div>
            </div>
            ` : ''}
            ${model ? `
            <div class="field">
              <div class="label">Model</div>
              <div class="value">${model}</div>
            </div>
            ` : ''}
            ${year ? `
            <div class="field">
              <div class="label">Rok produkcji</div>
              <div class="value">${year}</div>
            </div>
            ` : ''}
            ${budget ? `
            <div class="field">
              <div class="label">Budżet</div>
              <div class="value">${parseInt(budget).toLocaleString('pl-PL')} PLN</div>
            </div>
            ` : ''}
            ${message ? `
            <div class="field">
              <div class="label">Wiadomość</div>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Data zapytania</div>
              <div class="value">${new Date().toLocaleString('pl-PL', {
                dateStyle: 'full',
                timeStyle: 'short'
              })}</div>
            </div>
          </div>
          <div class="footer">
            <p>📧 To zapytanie zostało automatycznie wysłane z formularza kontaktowego na stronie conceptusa.pl</p>
            <p style="margin-top: 10px;">
              <strong>Odpowiedz na:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
              lub zadzwoń: <a href="tel:${phone}" style="color: #2563eb;">${phone}</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Wysyłka emaila
    const info = await transporter.sendMail({
      from: `"CONCEPT USA Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // conceptusacars@gmail.com
      replyTo: email,
      subject: `🚗 Nowe zapytanie: ${name} - ${brand || 'Ogólne'}`,
      html: htmlContent,
    });

    console.log('Email sent:', info.messageId);

    return res.status(200).json({
      success: true,
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
