# AFR-Cloud Mikrotik Captive Portal

Modern and responsive captive portal template for Mikrotik RouterOS hotspot system with clean, cyber-themed design.

![Version](https://img.shields.io/badge/version-2.0-blue)
![Mikrotik](https://img.shields.io/badge/mikrotik-compatible-green)
![License](https://img.shields.io/badge/license-MIT-orange)

## ✨ Features

- **Modern Cyber Design** - Clean, futuristic interface with animated elements
- **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **Dual Login Mode** - Support for voucher codes and username/password authentication
- **Toast Notifications** - User-friendly error messages with smooth animations
- **WhatsApp Integration** - Direct voucher purchase via WhatsApp
- **Mobile Bottom Sheet** - Intuitive mobile interface with pull-up login panel
- **Real-time Clock** - Dynamic time and date display
- **CHAP Authentication** - Secure MD5 hashing support
- **Separated Architecture** - Clean separation of HTML, CSS, and JavaScript
- **Easy Customization** - Well-organized code with CSS variables

## 📁 File Structure

```
captive-portal/
├── assets/
│   ├── css/
│   │   ├── style.css       # Global styles and variables
│   │   ├── login.css       # Login page specific styles
│   │   ├── status.css      # Status page specific styles
│   │   └── error.css       # Error/redirect pages styles
│   └── js/
│       ├── login.js        # Login page functionality
│       └── md5.min.js      # MD5 hashing library for CHAP
├── login.html              # Main login page
├── status.html             # Connection status page
├── logout.html             # Logout confirmation page
├── error.html              # Error display page
├── redirect.html           # Success redirect page
├── alogin.html             # Admin login placeholder
├── api.json                # Hotspot API endpoint
├── errors.txt              # Indonesian error messages
└── README.md               # This file
```

## 🚀 Installation

### Method 1: Via FTP

1. Connect to your Mikrotik router using FTP client (FileZilla, WinSCP, etc.)
2. Navigate to `/hotspot/` directory
3. Upload all files maintaining the folder structure
4. Restart the hotspot service:
   ```
   /ip hotspot> set [find] html-directory=hotspot
   ```

### Method 2: Via Winbox

1. Open Winbox and connect to your Mikrotik
2. Go to **Files** menu
3. Navigate to `hotspot` folder
4. Drag and drop all files (maintain folder structure)
5. Go to **IP > Hotspot > Server Profiles**
6. Set HTML Directory to `hotspot`

### Method 3: Via SSH/Terminal

```bash
# Upload files using SCP
scp -r * admin@192.168.88.1:/hotspot/

# Or use SFTP
sftp admin@192.168.88.1
put -r *
```

## ⚙️ Configuration

### 1. Update WhatsApp Number

Edit `assets/js/login.js`:

```javascript
function buyVoucher(paket) {
    const phone = '6282282335995'; // Change to your WhatsApp number
    // ... rest of code
}
```

### 2. Update Package Prices

Edit `login.html` pricing grid section:

```html
<div class="price-card" onclick="buyVoucher('6JAM')">
    <div class="p-info">
        <div class="p-name">6 JAM</div>
        <div class="p-desc">Puas internetan.</div>
    </div>
    <div class="p-price">Rp 2.000</div> <!-- Update price here -->
</div>
```

### 3. Customize Colors

Edit `assets/css/style.css` CSS variables:

```css
:root {
    --bg-dark: #020617;        /* Main background */
    --bg-panel: #0f172a;       /* Panel background */
    --accent: #06b6d4;         /* Primary accent color */
    --text-main: #f1f5f9;      /* Main text color */
    --text-muted: #64748b;     /* Muted text color */
    --danger: #dc2626;         /* Error/danger color */
}
```

### 4. Customize Branding

Edit HTML files to change:
- `AFRCloud-NET` - Main brand name
- `High Speed Access` - Tagline
- `AFR-Cloud Network System` - Footer text

### 5. Enable/Disable Trial Login

In Mikrotik terminal:
```
/ip hotspot profile set [find] trial-uptime=5m trial-user-profile=default
```

## 📱 Features Breakdown

### Login Page (`login.html`)

- **Dual Mode Authentication**
  - Voucher mode: Auto-fills password with username
  - Member mode: Separate username and password fields
- **Package Display**
  - Grid layout showing available voucher packages
  - Click-to-buy via WhatsApp integration
- **Mobile Optimization**
  - Bottom sheet interface for mobile devices
  - Pull-up gesture for login panel
- **Error Handling**
  - Toast notifications for login errors
  - Translated Indonesian error messages

### Status Page (`status.html`)

- **Real-time Information**
  - Username display
  - IP and MAC addresses
  - Upload/download statistics
  - Active session time
  - Remaining time (if applicable)
- **Auto-refresh**
  - Configurable refresh interval
  - Live connection monitoring

### Logout Page (`logout.html`)

- **Confirmation Dialog**
  - Prevents accidental logouts
  - Shows current username
  - Cancel option available

### Error Page (`error.html`)

- **User-friendly Error Messages**
  - Translated Mikrotik error codes
  - Clear visual indicators
  - Back button for retry

### Redirect Page (`redirect.html`)

- **Success Feedback**
  - Login success animation
  - Progress bar indicator
  - Auto-redirect with manual fallback

## 🎨 Customization Tips

### Change Theme Colors

The portal uses a dark cyber theme. To change to a light theme:

```css
:root {
    --bg-dark: #ffffff;
    --bg-panel: #f8f9fa;
    --accent: #0066cc;
    --text-main: #1a1a1a;
    --text-muted: #666666;
}
```

### Modify Animations

Adjust animation speeds in `style.css`:

```css
@keyframes slideIn {
    /* Modify timing and easing */
}
```

### Add More Packages

Copy and modify the price-card div in `login.html`:

```html
<div class="price-card" onclick="buyVoucher('NEW_PACKAGE')">
    <div class="p-info">
        <div class="p-name">PACKAGE NAME</div>
        <div class="p-desc">Package description.</div>
    </div>
    <div class="p-price">Rp XX.XXX</div>
</div>
```

## 🔧 Troubleshooting

### Styles Not Loading

1. Check file paths in HTML files
2. Ensure `assets` folder structure is correct
3. Clear browser cache
4. Verify Mikrotik file permissions

### JavaScript Not Working

1. Check browser console for errors
2. Verify `assets/js/` files are uploaded
3. Enable JavaScript in Mikrotik hotspot settings
4. Check MIME types in Mikrotik

### WhatsApp Link Not Working

1. Verify phone number format (include country code)
2. Ensure `buyVoucher()` function is properly defined
3. Check browser popup blocker settings

### Login Errors

1. Check Mikrotik RADIUS server settings
2. Verify user database configuration
3. Review `errors.txt` translations
4. Check hotspot profile settings

## 🔒 Security Notes

- All authentication is handled by Mikrotik RouterOS
- MD5 CHAP authentication supported
- No sensitive data stored in browser
- Secure password transmission
- Session management by Mikrotik

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (iOS 12+)
- ✅ Mobile browsers
- ⚠️ IE11 (limited support)

## 📝 License

MIT License - Feel free to modify and distribute

## 👨‍💻 Credits

**AFR-Cloud Network**
- Version: 2.0
- Developer: AFR-Cloud TECH
- Year: 2024

## 🆘 Support

For issues, customization requests, or support:
- WhatsApp: +62 822-8233-5995
- Update this section with your support contact

## 📚 Additional Resources

- [Mikrotik Wiki - Hotspot](https://wiki.mikrotik.com/wiki/Manual:Hotspot)
- [Mikrotik Hotspot Variables](https://wiki.mikrotik.com/wiki/HotSpot_external_variables)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## 🔄 Changelog

### Version 2.0 (Current)
- ✅ Separated HTML, CSS, and JavaScript
- ✅ Improved code organization
- ✅ Enhanced mobile responsiveness
- ✅ Added toast notification system
- ✅ WhatsApp integration for voucher purchase
- ✅ Bottom sheet interface for mobile
- ✅ Comprehensive documentation

### Version 1.0
- Initial release with inline styles

---

**Made with ❤️ for the Mikrotik Community**
