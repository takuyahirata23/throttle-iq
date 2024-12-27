import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
})

export async function request(prompt: string) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' }
  })

  return chatCompletion
}
