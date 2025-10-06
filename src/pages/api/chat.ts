import type { NextApiRequest, NextApiResponse } from 'next';

// This new code is specifically for Groq's API
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// The API key is read securely from your Vercel Environment Variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!GROQ_API_KEY) {
    console.error('GROQ_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const { messages } = req.body;

    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // This is how we authenticate with Groq
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        // This is the specific model name for Llama 3 on Groq
        model: 'llama3-8b-8192',
        messages: messages,
        stream: true,
      }),
    });

    if (!groqResponse.ok || !groqResponse.body) {
      const errorText = await groqResponse.text();
      console.error('Groq API Error:', errorText);
      return res.status(500).json({ error: 'Failed to connect to Groq' });
    }
    
    // Set headers for streaming the response back to your chatbot
    res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Pipe the stream from Groq directly back to the browser
    const reader = groqResponse.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      res.write(value);
    }
    res.end();

  } catch (error) {
    console.error('Internal API Error:', error);
    res.status(500).json({ error: 'An internal error occurred' });
  }
}