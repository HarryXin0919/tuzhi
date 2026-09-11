export async function translateToEn(text: string): Promise<string | null> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey || !text.trim()) return null;
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 400,
        messages: [
          {
            role: "system",
            content:
              "Translate the farmer's Chinese into clear spoken English. Keep numbers, rates, crop names, pH, EC. Keep metaphors (next county's lime recipe, salt's calling card, meat in the soil). Do not soften warnings. Do not use: It is recommended that, Please kindly, users should conduct a comprehensive, pedological, Knowledge Base, soil organic carbon pool, indiscriminately, may consider contacting. Return ONLY the English.",
          },
          { role: "user", content: text },
        ],
      }),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const out = body.choices?.[0]?.message?.content?.trim() ?? "";
    return out || null;
  } catch {
    return null;
  }
}
