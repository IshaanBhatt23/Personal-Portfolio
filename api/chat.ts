// The API key is read securely from your Vercel Environment Variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// This is a generic handler that works for any project on Vercel
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!GROQ_API_KEY) {
    console.error('GROQ_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    // In Vite projects on Vercel, the body might already be parsed.
    // This line makes sure it works either way.
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { messages } = body;

    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
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