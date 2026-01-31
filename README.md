# 🎓 EduSaarthi

> A modern web platform designed to simplify and enhance the learning experience by connecting students with structured educational resources and smart features.

[![GitHub stars](https://img.shields.io/github/stars/architabajpai/EduSaarthi?style=social)](https://github.com/architabajpai/EduSaarthi)
[![GitHub forks](https://img.shields.io/github/forks/architabajpai/EduSaarthi?style=social)](https://github.com/architabajpai/EduSaarthi/fork)

Built with Next.js and TypeScript, EduSaarthi focuses on scalability, performance, and user-friendly design to create an exceptional educational experience.

## ✨ Features

- 📚 **Centralized Resources** - Access all your educational materials in one place
- 👩‍🎓 **Student-Friendly Interface** - Intuitive UI and seamless navigation
- ⚡ **High Performance** - Lightning-fast with Next.js and optimized architecture
- 🗄️ **Robust Database** - Powered by Prisma ORM for reliable data management
- 🔐 **Secure Configuration** - Environment-based security settings
- 🎨 **Responsive Design** - Beautiful UI built with Tailwind CSS, works on all devices

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js, React, TypeScript |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js |
| **Database** | Prisma ORM |
| **Tools** | ESLint, PostCSS |

## 📂 Project Structure

```
EduSaarthi/
├── components/        # Reusable UI components
├── prisma/            # Database schema & configuration
├── public/            # Static assets (images, fonts, etc.)
├── src/               # Main application source code
│   ├── app/          # Next.js app directory
│   ├── lib/          # Utility functions and helpers
│   └── styles/       # Global styles
├── .env              # Environment variables (not in repo)
├── .env.example      # Example environment variables
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A database (PostgreSQL, MySQL, or SQLite)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/architabajpai/EduSaarthi.git
cd EduSaarthi
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your configuration:

```env
# Database
DATABASE_URL="your_database_connection_string"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Add other environment variables as needed
```

### 4️⃣ Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

### 5️⃣ Run the development server

```bash
npm run dev
# or
yarn dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:studio # Open Prisma Studio
```

## 🧠 Future Enhancements

- [ ] 🤖 AI-powered learning recommendations
- [ ] 🧑‍🏫 Mentor-student interaction features
- [ ] 📊 Analytics dashboard for tracking progress
- [ ] 🔐 Advanced authentication & role-based access control
- [ ] 📱 Enhanced mobile responsiveness
- [ ] 🌐 Multi-language support
- [ ] 📝 Interactive quizzes and assessments
- [ ] 💬 Real-time chat and discussion forums

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👩‍💻 Author

**Archita Bajpai**

- GitHub: [@architabajpai](https://github.com/architabajpai)
- LinkedIn: [Add your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: [your.email@example.com](mailto:your.email@example.com)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- All contributors who help improve EduSaarthi

## ⭐ Support

If you find this project helpful, please consider:

- Giving it a ⭐ star on GitHub
- Sharing it with others who might benefit
- Contributing to its development

---

<div align="center">
Made with ❤️ by Archita Bajpai
</div>
