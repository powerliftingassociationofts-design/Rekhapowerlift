# WPC Telangana Contact Form Email Setup

This guide provides two methods to set up email functionality for the contact form:

## Method 1: EmailJS (Client-side - Recommended for beginners)

### Setup Steps:

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the connection steps

3. **Create Email Template**
   - Go to "Email Templates" 
   - Click "Create New Template"
   - Use this template content:

   ```
   Subject: New Contact Form - WPC Telangana

   Hello,

   You have received a new message from WPC Telangana website:

   Name: {{name}}
   Email: {{email}}
   Phone: {{phone}}
   Address: {{address}}

   Message:
   {{message}}

   ---
   Sent from WPC Telangana Contact Form
   ```

4. **Get Your Credentials**
   - Service ID: Found in "Email Services" section
   - Template ID: Found in "Email Templates" section  
   - Public Key: Found in "Account" → "General"

5. **Update Configuration**
   - Open `src/config/emailConfig.js`
   - Replace the placeholder values with your actual credentials:

   ```javascript
   export const emailConfig = {
     serviceId: 'service_your_actual_id',
     templateId: 'template_your_actual_id', 
     publicKey: 'your_actual_public_key'
   };
   ```

6. **Test the Form**
   - Run `npm start`
   - Go to the contact page
   - Fill out and submit the form
   - Check your email for the message

---

## Method 2: Backend Server with Nodemailer (More secure)

### Setup Steps:

1. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your email credentials:

   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=5000
   ```

   **For Gmail:**
   - Enable 2-factor authentication
   - Generate an "App Password" in Google Account settings
   - Use the app password, not your regular password

3. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```

4. **Update Frontend to Use Backend**
   - In `ContactMain.js`, replace `handleSubmit` with `handleSubmitToBackend`
   - The backend API will handle email sending

5. **Test the Setup**
   - Ensure backend server is running on port 5000
   - Submit the contact form
   - Check your email for messages

---

## Troubleshooting

### EmailJS Issues:
- **"Invalid template"**: Check template ID is correct
- **"Service not found"**: Verify service ID 
- **"Unauthorized"**: Check public key is valid

### Backend Issues:
- **"Authentication failed"**: Check email credentials in .env
- **"CORS errors"**: Ensure backend server is running
- **"Network error"**: Check if port 5000 is available

### General Issues:
- Check browser console for error messages
- Verify form fields have correct `name` attributes
- Ensure all required fields are filled

---

## Security Notes

- **EmailJS**: Public key is visible in client code but has rate limiting
- **Backend**: More secure as credentials are hidden on server
- **Production**: Use environment variables for all sensitive data

---

## Testing

1. Fill out the contact form with test data
2. Check your email inbox (and spam folder)
3. Verify all form fields appear in the received email
4. Test form validation by submitting empty fields

Choose the method that best fits your technical requirements and hosting setup!