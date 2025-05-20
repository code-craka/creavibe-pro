# CreaVibe

![CreaVibe Logo](public/logo.png)

CreaVibe is a modern SaaS platform for AI-powered content creation and real-time creative collaboration. It combines blog, image, and video generation with project management tools, version history, and role-based access for marketing teams, creators, and agencies.

## 🚀 Features

- **AI-Powered Content Generation**: Create blog posts, images, and video scripts using advanced AI models
- **Real-Time Collaboration**: Work together with your team in real-time on creative projects
- **Project Management**: Organize your content creation workflow with intuitive project management tools
- **Version History**: Track changes and revert to previous versions when needed
- **Role-Based Access Control**: Manage team permissions with granular access controls
- **WebBooks**: Create and publish interactive web books for comprehensive content delivery
- **API Access**: Integrate CreaVibe into your existing workflows with our robust API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [pnpm](https://pnpm.io/) (v8.0.0 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14.0 or higher) or a [Supabase](https://supabase.com/) account

## 🛠️ Installation

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/creavibe/creavibe-pro.git
cd creavibe-pro
\`\`\`

2. **Install dependencies**

\`\`\`bash
pnpm install
\`\`\`

3. **Set up environment variables**

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` and fill in the required environment variables.

4. **Set up the database**

If you're using Supabase:
- Create a new project in Supabase
- Run the SQL scripts in `lib/supabase-schema.sql` in the Supabase SQL editor
- Update your `.env.local` file with the Supabase credentials

If you're using a local PostgreSQL database:
- Create a new database
- Run the SQL scripts in `lib/supabase-schema.sql`
- Update your `.env.local` file with the database credentials

5. **Run the development server**

\`\`\`bash
pnpm dev
\`\`\`

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🚀 Deployment

### Deploying to Vercel

1. **Push your code to GitHub**

2. **Create a new project in Vercel**
   - Connect your GitHub repository
   - Configure the environment variables from `.env.production.example`
   - Deploy the project

3. **Set up the database**
   - Create a production database in Supabase or your preferred PostgreSQL provider
   - Run the SQL scripts in `lib/supabase-schema.sql`
   - Update the environment variables in Vercel with the production database credentials

### Deploying to other platforms

Refer to the [deployment guide](docs/deployment-guide.md) for detailed instructions on deploying to other platforms.

## 🧪 Testing

Run the test suite with:

\`\`\`bash
pnpm test
\`\`\`

For end-to-end tests:

\`\`\`bash
pnpm test:e2e
\`\`\`

## 📚 Documentation

- [API Documentation](docs/api-documentation.md)
- [Component Documentation](docs/component-documentation.md)
- [Database Schema](docs/database-schema.md)
- [Deployment Guide](docs/deployment-guide.md)
- [Environment Variables](docs/environment-variables-guide.md)
- [Windsurf Guide](docs/windsurf-guide.md)

## 🤝 Contributing

We welcome contributions to CreaVibe! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

We use ESLint and Prettier to maintain code quality. Run the linter with:

\`\`\`bash
pnpm lint
\`\`\`

And format your code with:

\`\`\`bash
pnpm format
\`\`\`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)
- [OpenAI](https://openai.com/)
- [Vercel](https://vercel.com/)

## 📞 Contact

For questions or support, please contact us at [hello@CreaVibe](mailto:hello@CreaVibe).
\`\`\`

Now, let's create the API documentation:
