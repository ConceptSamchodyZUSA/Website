import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export const emailService = {
  // Send inquiry email
  async sendInquiryEmail(formData) {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Email will not be sent.');
      return { success: false, error: 'EmailJS not configured' };
    }

    try {
      const templateParams = {
        to_email: 'kuba.pospieszny@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        brand: formData.brand || 'Not provided',
        model: formData.model || 'Not provided',
        budget: formData.budget ? `${formData.budget} PLN` : 'Not provided',
        year: formData.year || 'Not provided',
        message: formData.message || 'No additional information',
        submission_date: new Date().toLocaleString('en-US')
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }
  },

  // Send car-specific inquiry email
  async sendCarInquiryEmail(formData, car) {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured. Email will not be sent.');
      return { success: false, error: 'EmailJS not configured' };
    }

    try {
      const templateParams = {
        to_email: 'kuba.pospieszny@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        car_info: `${car.brand} ${car.model} (${car.year})`,
        car_price: `${car.price?.toLocaleString()} PLN`,
        message: formData.message || 'Interested in this vehicle.',
        submission_date: new Date().toLocaleString('en-US')
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Car inquiry email sent successfully:', response);
      return { success: true, response };
    } catch (error) {
      console.error('Error sending car inquiry email:', error);
      return { success: false, error };
    }
  },

  // Check if EmailJS is configured
  isConfigured() {
    return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
  }
};
