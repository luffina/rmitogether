A social event discovery platform for RMIT students to discover campus events, study groups, and community activities all in one place.

## 🌟 Features

- **Event Feed**: Real-time feed of events, study groups, free food alerts, and clubs
- **RSVP & Check-in**: Students can RSVP and check-in to events
- **Gamification**: Earn points, badges, and compete on leaderboards
- **Rewards System**: Redeem points for cafe vouchers, merch, and discounts
- **Create Events**: Students can create and manage their own events
- **Community Building**: Connect with other students with shared interests

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Styling**: Custom CSS (No Tailwind)
- **Storage**: Browser LocalStorage
- **State Management**: React Hooks

## 📋 Installation

1. Clone the repository:
```bash
git clone https://github.com/luffina/rmitogether.git
cd rmitogether
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🎮 How to Use

### Sign Up / Sign In
- Create an account or sign in with demo credentials:
  - Email: `demo@rmit.edu.au`
  - Password: `demo123`

### Browse Events
- View all upcoming events in the Feed
- Click on any event to see details
- RSVP to events to earn points

### Create Events
- Click the **+** button (bottom right) to create a new event
- Fill in event details (title, date, time, description)
- Earn 50 bonus points when you create an event!

### Earn Points & Badges
- Attend events to earn points
- Accumulate points to unlock badges
- Redeem points for rewards

### Leaderboard
- See top community members
- Compete with other students

### Profile
- Track your points and events attended
- View your badges
- Redeem rewards

## 📊 Gamification System

- **Points**: 
  - +10 pts per event attendance
  - +25 pts for free food events
  - +50 pts for creating an event
  
- **Badges**:
  - 🦋 Social Butterfly (5+ events)
  - 📚 Study Legend (3+ study groups)
  - ⭐ Rising Star (350+ points)
  - 👑 Event Creator (Create events)

- **Rewards**:
  - ☕ Cafe Voucher ($5) - 100 points
  - 🎽 RMITogether Merch - 250 points
  - 🍔 Lunch Discount (20%) - 150 points
  - 🎮 Gaming Pass (1 month) - 200 points

## 💾 Data Storage

All data is stored in browser LocalStorage:
- User accounts
- Event data
- Points and badges
- RSVP history

**Note**: Data persists only in the same browser. Clearing cache will reset data.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub:
```bash
git add .
git commit -m "Deploy RMITogether"
git push -u origin main
```

2. Go to https://vercel.com
3. Click "Import Project"
4. Select your `rmitogether` repository
5. Click "Deploy"

Your app will be live at `rmitogether.vercel.app`

### Deploy to Netlify

1. Build the app:
```bash
npm run build
```

2. Go to https://netlify.com
3. Drag and drop the `build` folder
4. Done!

## 📁 Project Structure
```
rmitogether/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── Feed.jsx
│   │   ├── Leaderboard.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   ├── index.css
│   └── index.js
├── package.json
└── README.md
```

## 🎯 Problem Solved

RMITogether solves the problem of scattered event information across multiple platforms (Discord, Facebook, emails, bulletin boards). Now students have ONE place to discover everything happening at RMIT!

## 👥 Team

Created for RMIT students by RMIT students.

## 📝 License

Open source - free to use and modify.

## 🤝 Contributing

Found a bug or want to add a feature? Feel free to contribute!

---

**Made with ❤️ for RMIT Students**