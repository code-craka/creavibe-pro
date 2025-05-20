import fetch from 'node-fetch';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Get the webhook secret from environment variables
const webhookSecret = process.env.STRIPE_THIN_WEBHOOK_SECRET;

if (!webhookSecret) {
  console.error('STRIPE_THIN_WEBHOOK_SECRET is not defined in .env.local');
  process.exit(1);
}

// Create a sample v2 API event (thin payload)
const createThinPayloadEvent = (eventType) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const eventId = `evt_${crypto.randomBytes(16).toString('hex')}`;
  const objectId = `fa_${crypto.randomBytes(16).toString('hex')}`;
  
  return {
    id: eventId,
    object: 'v2.core.event',
    type: eventType,
    created: new Date().toISOString(),
    livemode: false,
    data: {},
    related_object: {
      id: objectId,
      type: eventType.replace('.created', '').replace('.updated', ''),
      url: `/v2/financial_accounts/${objectId}`
    }
  };
};

// Sign the payload with the webhook secret
const signPayload = (payload, secret) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const payloadString = JSON.stringify(payload);
  
  const signedPayload = `${timestamp}.${payloadString}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  
  return {
    timestamp,
    signature,
    signedPayload
  };
};

// Send a test event to the webhook endpoint
const sendTestEvent = async (eventType) => {
  const event = createThinPayloadEvent(eventType);
  const { timestamp, signature } = signPayload(event, webhookSecret);
  
  console.log(`Sending test event: ${eventType}`);
  console.log(JSON.stringify(event, null, 2));
  
  try {
    const response = await fetch('http://localhost:3000/api/stripe/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Stripe-Signature': `t=${timestamp},v1=${signature}`
      },
      body: JSON.stringify(event)
    });
    
    const data = await response.json();
    console.log(`Response status: ${response.status}`);
    console.log(data);
  } catch (error) {
    console.error('Error sending test event:', error);
  }
};

// Test different event types
const testEvents = [
  'financial_account.created',
  'financial_account.updated',
  'outbound_payment.created',
  'outbound_payment.updated',
  'received_payment.created'
];

// Send each test event with a delay between them
let delay = 0;
testEvents.forEach((eventType) => {
  setTimeout(() => {
    sendTestEvent(eventType);
  }, delay);
  delay += 2000; // 2 second delay between events
});
