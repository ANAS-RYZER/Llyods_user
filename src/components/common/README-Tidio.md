# Tidio Chat Integration

## Overview
This integration adds Tidio's live chat and AI customer service platform to your Next.js application.

## How it works

### 1. TidioChat Component (`src/components/common/TidioChat.tsx`)
- **Client-side component**: Uses `'use client'` directive for browser-side execution
- **Script injection**: Dynamically loads the Tidio script from their CDN
- **Duplicate prevention**: Checks if script is already loaded to prevent duplicates
- **Cleanup**: Removes script when component unmounts
- **Configurable**: Accepts a `tidioId` prop (defaults to your provided ID)

### 2. Integration in Layout (`src/app/layout.tsx`)
- Added to the root layout so it's available on all pages
- Positioned at the bottom of the body for optimal loading
- Wrapped in your existing `GlobalRyzerProvider`

## Features Available

Based on [Tidio's platform](https://www.tidio.com/), you now have access to:

### 🤖 Lyro AI Agent
- **67% automation**: Resolves support requests automatically
- **12 languages**: Multilingual support
- **Smart handoff**: Transfers complex queries to human agents
- **Learning**: Gets smarter with each interaction

### 💬 Live Chat
- **Real-time messaging**: Instant customer support
- **Multi-channel**: Chat, email, social media integration
- **Team collaboration**: Multiple agents can handle conversations
- **Mobile responsive**: Works on all devices

### 📊 Analytics & Insights
- **Performance tracking**: Monitor AI and human agent performance
- **Customer insights**: Understand user behavior and needs
- **ROI measurement**: Track support efficiency and cost savings

### 🔧 Customization Options
- **Branding**: Customize chat widget appearance
- **Triggers**: Set up automated conversation starters
- **Flows**: Create guided customer journeys
- **Integrations**: Connect with your existing tools

## Usage

The integration is automatic - no additional setup required. The chat widget will appear on all pages of your application.

### Customization
If you need to customize the Tidio ID or add additional configuration:

```tsx
// In your layout or any component
<TidioChat tidioId="your-custom-tidio-id" />
```

### Advanced Configuration
For more advanced features, you can extend the `TidioChat` component to include:
- Custom event tracking
- User identification
- Conversation routing
- Custom styling

## Next Steps

1. **Configure your Tidio dashboard**: Set up your AI responses, team members, and workflows
2. **Customize appearance**: Match the chat widget to your brand
3. **Set up integrations**: Connect with your CRM, help desk, or other tools
4. **Train your AI**: Add your FAQ content and knowledge base
5. **Monitor performance**: Use analytics to optimize your customer service

## Support
- [Tidio Help Center](https://help.tidio.com/)
- [Tidio Documentation](https://help.tidio.com/en/)
- [Contact Tidio Support](https://www.tidio.com/contact/)