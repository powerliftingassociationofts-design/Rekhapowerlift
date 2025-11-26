# 🚀 Quick Start - Deploy Rekhapowerlift via SSH

This guide will help you deploy your Rekhapowerlift project to a remote server in just a few steps.

---

## 📦 What You Have

Your project is now ready for deployment with:

✅ **Production Build** - React app built and optimized  
✅ **Deployment Script** (`deploy.sh`) - Automated SSH deployment  
✅ **Server Documentation** (`SERVER_DEPLOYMENT_GUIDE.md`) - Complete setup guide  
✅ **Nginx Config** (`nginx.conf`) - Web server configuration  
✅ **PM2 Config** (`ecosystem.config.js`) - Process manager setup  
✅ **SSH Helper** (`ssh-helper.sh`) - Server management tool

---

## 🎯 Quick Deployment Steps

### Step 1: Configure Your Server Details

Edit the deployment script with your server information:

```bash
nano deploy.sh
```

Update these lines:
```bash
SERVER_USER="your_username"              # e.g., ubuntu, root, admin
SERVER_HOST="your_server_ip_or_domain"   # e.g., 192.168.1.100 or mysite.com
SERVER_PORT="22"                         # Default SSH port
DEPLOY_PATH="/var/www/rekhapowerlift"   # Where to deploy
```

Save and exit (`Ctrl+X`, then `Y`, then `Enter`)

---

### Step 2: Prepare Your Server

SSH into your server and run these commands:

```bash
# Connect to server
ssh your_username@your_server_ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Install PM2
sudo npm install -g pm2
pm2 startup

# Create deployment directory
sudo mkdir -p /var/www/rekhapowerlift
sudo chown -R $USER:$USER /var/www/rekhapowerlift

# Setup firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5000/tcp
sudo ufw --force enable
```

---

### Step 3: Deploy Your Application

Run the deployment script from your local machine:

```bash
./deploy.sh
```

The script will:
- ✅ Build your React application
- ✅ Create deployment package
- ✅ Upload files to server
- ✅ Install dependencies
- ✅ Setup everything automatically

---

### Step 4: Configure Environment Variables

On your server, create the `.env` file:

```bash
ssh your_username@your_server_ip
cd /var/www/rekhapowerlift/server
nano .env
```

Add your configuration:
```env
PORT=5000
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

Save and exit.

**Important**: For Gmail, create an App Password:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Generate an App Password
4. Use that password in EMAIL_PASS

---

### Step 5: Configure Nginx

On your server:

```bash
# Copy nginx config
sudo cp /var/www/rekhapowerlift/nginx.conf /etc/nginx/sites-available/rekhapowerlift

# Edit the config
sudo nano /etc/nginx/sites-available/rekhapowerlift
```

Update these lines:
```nginx
server_name yourdomain.com www.yourdomain.com;
# Or for IP-only access:
# server_name your_server_ip;
```

Enable the site:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/rekhapowerlift /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

### Step 6: Start the Backend Server

```bash
cd /var/www/rekhapowerlift/server

# Start with PM2
pm2 start server.js --name rekhapowerlift-backend

# Or use ecosystem file
pm2 start ../ecosystem.config.js

# Save PM2 config
pm2 save

# Check status
pm2 status
pm2 logs rekhapowerlift-backend
```

---

### Step 7: Test Your Deployment

Open your browser and visit:
- `http://your_server_ip` or `http://yourdomain.com`

You should see your Rekhapowerlift website!

Test the contact form to ensure the backend is working.

---

## 🔧 Using the SSH Helper Tool

The `ssh-helper.sh` script provides quick access to common tasks:

```bash
# Configure it first
nano ssh-helper.sh
# Update SERVER_USER, SERVER_HOST, etc.

# Interactive menu
./ssh-helper.sh

# Or direct commands
./ssh-helper.sh connect   # SSH into server
./ssh-helper.sh status    # View server status
./ssh-helper.sh logs      # View application logs
./ssh-helper.sh restart   # Restart application
```

---

## 🔐 Optional: Setup SSL Certificate (HTTPS)

For production, you should enable HTTPS:

```bash
# On your server
sudo apt install certbot python3-certbot-nginx -y

# Get certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts
# Certbot will automatically configure Nginx
```

Test auto-renewal:
```bash
sudo certbot renew --dry-run
```

---

## 🔄 Updating Your Application

When you make changes to your code:

```bash
# On local machine
git pull  # Get latest changes
./deploy.sh  # Deploy updates
```

The script handles everything automatically!

---

## 🛠️ Common Commands

### On Local Machine:
```bash
# Deploy/Update application
./deploy.sh

# Manage server
./ssh-helper.sh
```

### On Server:
```bash
# View PM2 processes
pm2 status
pm2 logs rekhapowerlift-backend
pm2 restart rekhapowerlift-backend

# Check Nginx
sudo nginx -t
sudo systemctl status nginx
sudo systemctl reload nginx

# View logs
sudo tail -f /var/log/nginx/rekhapowerlift_access.log
sudo tail -f /var/log/nginx/rekhapowerlift_error.log

# System resources
htop
df -h
free -h
```

---

## 🐛 Troubleshooting

### Issue: Can't connect to server
```bash
# Test SSH connection
ssh your_username@your_server_ip

# Check SSH service on server
sudo systemctl status ssh
```

### Issue: Website shows "502 Bad Gateway"
```bash
# Check if backend is running
pm2 status
pm2 restart rekhapowerlift-backend

# Check backend logs
pm2 logs rekhapowerlift-backend
```

### Issue: Static files not loading
```bash
# Check file permissions
ls -la /var/www/rekhapowerlift/build

# Reload Nginx
sudo systemctl reload nginx
```

### Issue: Contact form not working
```bash
# Check backend logs
pm2 logs rekhapowerlift-backend

# Verify .env file
cat /var/www/rekhapowerlift/server/.env
```

---

## 📁 Project Structure on Server

```
/var/www/rekhapowerlift/
├── build/                  # React production build
│   ├── static/
│   ├── images/
│   └── index.html
├── server/                 # Backend API
│   ├── server.js
│   ├── package.json
│   ├── .env               # Environment variables
│   └── node_modules/
├── nginx.conf             # Nginx config template
├── ecosystem.config.js    # PM2 config
└── package.json
```

---

## 📚 Additional Documentation

For detailed information, see:

- **SERVER_DEPLOYMENT_GUIDE.md** - Complete deployment guide
- **DEPLOYMENT_INSTRUCTIONS.md** - Original Vercel deployment instructions
- **EMAIL_SETUP.md** - Email configuration guide
- **README.md** - Project overview

---

## ✅ Deployment Checklist

- [ ] Server prepared (Node.js, Nginx, PM2 installed)
- [ ] SSH access configured
- [ ] `deploy.sh` configured with server details
- [ ] Application deployed via `./deploy.sh`
- [ ] `.env` file created with email credentials
- [ ] Nginx configured and running
- [ ] Backend started with PM2
- [ ] Website accessible in browser
- [ ] Contact form tested
- [ ] SSL certificate installed (production)
- [ ] DNS configured to point to server

---

## 🎉 Success!

Your Rekhapowerlift application is now deployed and running!

**Access your site:**
- HTTP: `http://your_server_ip` or `http://yourdomain.com`
- HTTPS: `https://yourdomain.com` (after SSL setup)

**Need help?** Check the detailed guides in the documentation files.

---

**Deployment Date**: November 24, 2025  
**Status**: Ready to Deploy 🚀
