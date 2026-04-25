export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const { email, products } = body

  const productContext = products.map((p, i) =>
    `Product ${i + 1}: ${p.name}\nDescription: ${p.description}\nFeatures: ${p.features}\nSpecs: ${p.specs}`
  ).join('\n\n')

  const systemPrompt = `You are an AI sales assistant for a B2B company. Your job is to analyze incoming client emails and provide structured analysis.

Here is the product catalog you must use for recommendations:

${productContext}

When analyzing an email, you must return a JSON object with exactly this structure:
{
  "classification": "product_inquiry" | "demo_request" | "support" | "follow_up" | "sensitive",
  "confidence": number between 0 and 100,
  "client_name": string,
  "client_company": string,
  "requirements": string[] (list of specific requirements extracted from the email),
  "recommended_product": string (name of the best matching product from the catalog, or null if none fits),
  "recommendation_reason": string (2-3 sentences explaining why this product fits),
  "exclusions": string[] (products that were considered but excluded, with reason, e.g. "Style Tablet - client does not need video sync"),
  "draft_reply": string (a professional, technically accurate email reply addressing all requirements. Sign off as the sales team, do not include a name.)
}

Only recommend products from the catalog. If no product fits, say so honestly. Be technically accurate. Never invent features.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        temperature: 0,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this client email:\n\n${email}` }
        ]
      })
    })

    if (!response.ok) {
      const err = await response.text()
      return { statusCode: response.status, body: JSON.stringify({ error: err }) }
    }

    const data = await response.json()
    const result = JSON.parse(data.choices[0].message.content)

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}
