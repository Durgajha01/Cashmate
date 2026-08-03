import json
from typing import List, Dict, Any, Optional

from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAI, HarmCategory, HarmBlockThreshold
from pydantic import BaseModel

load_dotenv()  # Loads GOOGLE_API_KEY from .env

class MessageAnalysis(BaseModel):
    reply: str
    intent: str

async def LLM_response(
    text: str,
    history: List[Dict[str, str]] = None,
    file_content_summary: Optional[str] = None,
) -> MessageAnalysis:
    """
    Strict finance-only assistant with conversation history and file awareness.
    """
    if history is None:
        history = []

    # Build conversation context
    context = ""
    for msg in history:
        role = "User" if msg["role"] == "user" else "Assistant"
        context += f"{role}: {msg['content']}\n\n"

    # File context if present
    file_info = ""
    if file_content_summary:
        file_info = f"\n\nUploaded file content summary:\n{file_content_summary}\n"

    # Very strict system prompt
    prompt = f"""You are Vault Finance Chat System — an EXPERT Indian personal finance assistant powered by strict rules.

<ROLE>
You exist ONLY to provide helpful, accurate, responsible advice about PERSONAL FINANCE in the Indian context.
You NEVER answer anything outside this scope.
</ROLE>

<STRICT_RULES — YOU MUST FOLLOW ALL OF THESE OR YOU WILL BE SHUT DOWN>
1. Allowed topics ONLY:
   - Budgeting, expense tracking, saving habits
   - Debt management, loan repayment strategies
   - Investment options: mutual funds, SIP, stocks, ETFs, gold, fixed deposits, PPF, NPS, ELSS, RD, bonds
   - Tax planning (old vs new regime, 80C, 80D, HRA, capital gains)
   - Retirement & long-term planning
   - Insurance (term, health, ULIP vs pure term)
   - Credit score improvement, credit card usage
   - Analysis of uploaded financial documents (bank statements, expense sheets, investment portfolios)
   - Basic financial math (compound interest, EMI, returns calculation)

2. For ANY question that is NOT clearly one of the above topics → you MUST return EXACTLY this JSON and NOTHING ELSE — no explanation, no apology, no extra sentence:
{{
  "reply": "I'm sorry, I can only help with personal finance topics in India (budgeting, investing, taxes, debt, savings, retirement, insurance). How can I assist you with your money matters today?",
  "intent": "Non-finance Query"
}}

3. Never break character. Never say "I can try", "maybe", "as an AI", "I'm not sure", "let me think".  
   Either answer properly in finance domain or use the exact refusal JSON above.

4. Tone & style rules:
   - Empathetic, calm, professional, non-judgmental
   - Use simple language — avoid jargon unless explaining it
   - Always include risk disclaimer when suggesting investments
   - Recommend consulting a SEBI-registered advisor for personalized advice
   - Use ₹ symbol and Indian numbering (lakhs, crores)

5. File analysis rules (when user uploads CSV/Excel/PDF):
   - Focus ONLY on financial numbers: income, expenses, categories, trends, savings rate, debt-to-income, investment allocation
   - Give actionable insights: highest expense category, potential savings, red flags
   - If file appears non-financial or unreadable → use refusal JSON with message: "The uploaded file doesn't contain readable financial data."

6. Response format — ALWAYS return ONLY valid JSON. No extra text, no markdown, no comments:
{{
  "reply": "...",
  "intent": "one of: Investment Advice, Debt Management, Budget Planning, Savings Strategy, Tax Planning, Retirement Planning, Insurance Advice, Financial Education, Non-finance Query, Help Request"
}}
</STRICT_RULES>

Conversation history so far:
{context}

{file_info if file_content_summary else ""}

Current user message: "{text}"

Respond now. Return ONLY JSON.
"""

    # Model initialization
    vault_llm = GoogleGenerativeAI(
        model="gemini-3-flash-preview",
        temperature=0.35,
        safety_settings={
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
        }
    )

    # vault_llm = GoogleGenerativeAI(
    #     model="gemini-3-flash-preview",           # ← 8b version is usually faster & cheaper
    #     temperature=0.15,                      # ← much lower = less creative, more deterministic
    #     top_p=0.85,
    #     top_k=40,
    #     max_output_tokens=600,                 # ← enough for good replies, not too long
    #     safety_settings={
    #         HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    #         HarmCategory.HARM_CATEGORY_HARASSMENT:        HarmBlockThreshold.BLOCK_NONE,
    #         HarmCategory.HARM_CATEGORY_HATE_SPEECH:       HarmBlockThreshold.BLOCK_NONE,
    #         HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
    #     }
    # )

    try:
        raw_response = vault_llm.invoke(prompt)
        content = raw_response.content if hasattr(raw_response, 'content') else str(raw_response)

        # Try direct JSON
        data = json.loads(content.strip())

    except json.JSONDecodeError:
        # Fallback: extract JSON block
        start = content.find("{")
        end = content.rfind("}") + 1
        if start != -1 and end > start:
            try:
                data = json.loads(content[start:end])
            except:
                data = {
                    "reply": "I'm sorry, but I can only assist with finance-related questions. How can I help you with your money matters today?",
                    "intent": "Non-finance Query"
                }
        else:
            data = {
                "reply": "I'm sorry, but I can only assist with finance-related questions. How can I help you with your money matters today?",
                "intent": "Non-finance Query"
            }

    except Exception as e:
        data = {
            "reply": f"Internal error: {str(e)}. Please try again.",
            "intent": "Help Request"
        }

    try:
        return MessageAnalysis(**data)
    except:
        return MessageAnalysis(
            reply="I'm sorry, but I can only assist with finance-related questions. How can I help you with your money matters today?",
            intent="Non-finance Query"
        )