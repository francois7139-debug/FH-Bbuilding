import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const systemPrompt = `You are an expert bodybuilding AI coach for Francois Heunis. 
    Height: 189cm, Current Weight: 122kg, Goal: 105kg. Experienced in PPL split, fat loss while preserving muscle.
    Provide motivational, precise advice on training, nutrition, etc.
    For food like "250g chicken", estimate macros accurately: Chicken breast ~165kcal/100g, 31p, 0c, 3.6f.
    Be premium and encouraging.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 800,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
    });

    return NextResponse.json({ 
      response: response.content[0].type === 'text' ? response.content[0].text : 'Sorry, I had an issue.' 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ response: 'AI Coach is thinking...' }, { status: 500 });
  }
}
