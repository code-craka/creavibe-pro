export const mockSearchResults = [
  {
    id: 1,
    title: "How to create your first AI-generated blog post",
    content: "Learn how to use CreaVibe's AI tools to create engaging blog content in minutes.",
    url: "/help-center#blog-post",
  },
  {
    id: 2,
    title: "Setting up team collaboration",
    content: "Invite team members, set permissions, and start collaborating on content in real-time.",
    url: "/help-center#team-collaboration",
  },
  {
    id: 3,
    title: "Integrating with your CMS",
    content: "Connect CreaVibe with WordPress, Webflow, Shopify, and other popular CMS platforms.",
    url: "/help-center#cms-integration",
  },
  {
    id: 4,
    title: "Billing and subscription management",
    content: "Learn how to update your payment method, change plans, and manage your subscription.",
    url: "/help-center#billing",
  },
  {
    id: 5,
    title: "Using version history",
    content: "Track changes, restore previous versions, and compare different iterations of your content.",
    url: "/help-center#version-history",
  },
]

export const faqCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    description: "Learn the basics of using CreaVibe",
    faqs: [
      {
        question: "How do I create my first project?",
        answer:
          "To create your first project, log in to your CreaVibe account and click the 'New Project' button in the dashboard. Choose a project type (blog post, social media, email, etc.), give it a name, and click 'Create'. You'll be taken to the editor where you can start creating content.",
      },
      {
        question: "Can I invite team members to collaborate?",
        answer:
          "Yes! CreaVibe is designed for collaboration. Go to your project settings, click on 'Team Members', and enter the email addresses of the people you want to invite. You can set different permission levels for each team member (Admin, Editor, Viewer).",
      },
      {
        question: "How does the AI content generation work?",
        answer:
          "Our AI content generation uses advanced language models to create high-quality content based on your inputs. Simply describe what you want to create, select the tone and style, and the AI will generate content for you. You can then edit and refine the generated content as needed.",
      },
      {
        question: "What file formats can I export my content to?",
        answer:
          "CreaVibe supports exporting to multiple formats including PDF, DOCX, HTML, Markdown, and plain text. For images, we support PNG, JPG, and SVG formats. You can also directly publish to integrated platforms like WordPress, Medium, or social media channels.",
      },
      {
        question: "Is there a limit to how many projects I can create?",
        answer:
          "The number of projects you can create depends on your subscription plan. Free accounts can create up to 3 projects, while paid plans offer higher or unlimited project creation. Check your account settings to see your current limits and upgrade options.",
      },
    ],
  },
  {
    id: "billing",
    name: "Billing",
    description: "Subscription and payment information",
    faqs: [
      {
        question: "How do I upgrade my subscription?",
        answer:
          "To upgrade your subscription, go to 'Account Settings' > 'Billing' and click on 'Upgrade Plan'. You'll see the available plans and can select the one that best fits your needs. Follow the prompts to complete the payment process.",
      },
      {
        question: "Can I change my billing cycle?",
        answer:
          "Yes, you can switch between monthly and annual billing. Annual plans come with a discount. To change your billing cycle, go to 'Account Settings' > 'Billing' > 'Change Plan' and select your preferred option.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank transfers for annual enterprise plans. All payments are processed securely through our payment provider.",
      },
      {
        question: "How do I update my payment information?",
        answer:
          "To update your payment information, go to 'Account Settings' > 'Billing' > 'Payment Methods'. From there, you can add a new payment method or update an existing one.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 14-day money-back guarantee for new subscriptions. If you're not satisfied with our service, contact our support team within 14 days of your initial purchase for a full refund. After this period, refunds are handled on a case-by-case basis.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical",
    description: "Technical questions and troubleshooting",
    faqs: [
      {
        question: "What browsers are supported?",
        answer:
          "CreaVibe works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for optimal performance. Internet Explorer is not supported.",
      },
      {
        question: "Is there a desktop or mobile app available?",
        answer:
          "Currently, CreaVibe is a web-based platform optimized for desktop and mobile browsers. We're working on native mobile apps for iOS and Android, which will be released in the near future. Stay tuned for updates!",
      },
      {
        question: "How do I clear the cache if I'm experiencing issues?",
        answer:
          "If you're experiencing issues, try clearing your browser cache. In most browsers, you can do this by pressing Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac), selecting 'Cached images and files', and clicking 'Clear data'.",
      },
      {
        question: "What are the system requirements?",
        answer:
          "CreaVibe is a cloud-based platform that runs in your web browser, so there are no specific hardware requirements. However, we recommend at least 4GB of RAM and a stable internet connection for the best experience.",
      },
      {
        question: "How secure is my data?",
        answer:
          "We take security seriously. All data is encrypted in transit and at rest. We use industry-standard security practices, regular security audits, and maintain compliance with relevant data protection regulations. Your content is private and only accessible to you and your invited team members.",
      },
    ],
  },
  {
    id: "account",
    name: "Account",
    description: "Managing your account settings",
    faqs: [
      {
        question: "How do I change my password?",
        answer:
          "To change your password, go to 'Account Settings' > 'Security', and click on 'Change Password'. You'll need to enter your current password and then your new password twice to confirm.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "Yes, you can change the email address associated with your account. Go to 'Account Settings' > 'Profile', enter your new email address, and click 'Save'. You'll receive a verification email at your new address to confirm the change.",
      },
      {
        question: "How do I enable two-factor authentication?",
        answer:
          "To enable two-factor authentication (2FA), go to 'Account Settings' > 'Security' > 'Two-Factor Authentication' and click 'Enable'. You can choose between SMS or authenticator app methods. Follow the prompts to complete the setup.",
      },
      {
        question: "What happens if I forget my password?",
        answer:
          "If you forget your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you a password reset link. Click the link in the email and follow the instructions to create a new password.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "To delete your account, go to 'Account Settings' > 'Danger Zone' and click on 'Delete Account'. You'll need to confirm this action by entering your password. Please note that account deletion is permanent and all your data will be removed from our systems.",
      },
    ],
  },
]
