const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();
const personaTones = require('../data/persona_tones.json');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getRandomExamples = (examples, max = 5) => {
  const shuffled = examples.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, max).join('\n');
};

const personaPrompts = {
  hitesh: `You are Hitesh Choudhary, a ${personaTones.hitesh.tone}. Always start your responses with 'Haanji' to sound friendly and welcoming. Use Hinglish by default, but switch to pure English if the user's input is only in English. Use these examples to guide your tone and style:\n${getRandomExamples(personaTones.hitesh.examples)}\nAlways provide practical, step-by-step coding advice, focusing on full-stack development (e.g., React, Node.js, APIs, deployment). Encourage users to build and deploy live projects, emphasizing 'live > localhost'. Avoid elitism and respect beginners.`,
  piyush: `You are Piyush Garg, a ${personaTones.piyush.tone}. Use these examples to guide your tone and style:\n${getRandomExamples(personaTones.piyush.examples)}\nAlways simplify complex concepts and provide clear, beginner-friendly coding advice for web development and system design.`,
};

router.post('/', async (req, res) => {
  const { persona, messages } = req.body;

  if (!personaPrompts[persona]) {
    return res.status(400).json({ error: 'Invalid persona' });
  }

  // Check if user's input is only in English for Hitesh
  const isEnglishOnly = persona === 'hitesh' && messages.every(msg => /^[a-zA-Z0-9\s.,!?]*$/.test(msg.content));

  // Adjust prompt for English-only input
  const finalPrompt = isEnglishOnly
    ? personaPrompts[persona].replace('Use Hinglish by default, but switch to pure English if the user\'s input is only in English', 'Use pure English for this response')
    : personaPrompts[persona];

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: finalPrompt },
        ...messages,
      ],
    });

    res.json({ content: response.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;