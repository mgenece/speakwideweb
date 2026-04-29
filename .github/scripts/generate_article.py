"""
Speakwide Monthly Insights Article Generator
Uses Claude claude-sonnet-4-5 to write a new industry article each month.
Saves it as a .md file in the /articles folder with proper frontmatter.
"""

import anthropic
import datetime
import os
import re
import json

# Topic rotation - 12 topics, one per month
TOPICS = [
    {"title_hint": "The True Cost of Non-Compliance: Language Access Penalties in Healthcare", "category": "compliance", "angle": "Focus on real OCR enforcement actions, HHS penalties, and the financial cost of failing to provide certified interpretation."},
    {"title_hint": "How Immigration Attorneys Use On-Demand Interpreters to Win Cases", "category": "legal", "angle": "Explain how certified legal interpreters affect outcomes in immigration hearings and depositions. Cover EOIR standards and common pitfalls."},
    {"title_hint": "OSHA Multilingual Safety Requirements: A Guide for Construction Companies", "category": "business", "angle": "Break down OSHA 29 CFR 1926 requirements for communicating safety in workers native languages. Cover fines and practical compliance steps."},
    {"title_hint": "The Interpreter Shortage: Why Certified Professionals Are in High Demand", "category": "industry", "angle": "Explore the growing gap between demand and supply of certified interpreters. Cover BLS projections and how platforms like Speakwide bridge the gap."},
    {"title_hint": "Telehealth and Language Access: Meeting LEP Patients Where They Are", "category": "medical", "angle": "Examine how the telehealth boom created new language access challenges. Cover CMS guidance, VRI best practices, and outcomes for LEP patients."},
    {"title_hint": "What Makes a Certified Court Interpreter? Standards, Testing, and Ethics", "category": "legal", "angle": "Explain NCSC and state certification standards, ethics of impartiality, and why uncertified interpreters create reversible error risk."},
    {"title_hint": "Language Access in Mental Health: Why Accuracy Is Life-or-Death", "category": "medical", "angle": "Cover unique challenges of mental health interpretation including emotional nuance and trauma-informed language. Include LEP outcome data."},
    {"title_hint": "The ROI of Professional Interpretation: A Business Case for Language Access", "category": "business", "angle": "Make the financial case for certified interpretation including reduced liability, faster intake, and better compliance ratings."},
    {"title_hint": "Haitian Creole, Somali, and Pashto: Serving Underserved Language Communities", "category": "industry", "angle": "Spotlight three high-need underserved language communities in the US, their demographics, and the shortage of certified interpreters."},
    {"title_hint": "How to Build a Language Access Plan for Your Organization", "category": "compliance", "angle": "Step-by-step guide to creating a Title VI-compliant language access plan with needs assessment, procurement, training, and documentation."},
    {"title_hint": "Real Estate and Language Barriers: Protecting LEP Buyers and Sellers", "category": "business", "angle": "Cover Fair Housing Act language access obligations, HUD guidance on LEP clients, and how certified interpreters protect all parties."},
    {"title_hint": "The Future of Interpretation: AI, Human Interpreters, and What Actually Works", "category": "industry", "angle": "Honest assessment of where AI works versus where certified human interpreters remain essential in medical and legal settings."},
]

def pick_topic():
    month_index = datetime.date.today().month - 1
    return TOPICS[month_index % len(TOPICS)]

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text[:80]

def generate_article(topic):
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    system_prompt = """You are the content editor for Speakwide, an on-demand interpreter marketplace.
Write authoritative, practical articles for the Insights hub targeting law firms, healthcare clinics,
construction companies, HR departments, and certified interpreters.

Style: authoritative but accessible, data-driven, practical, no fluff.
Length: 700-1000 words.

Output ONLY valid markdown with this exact frontmatter:
---
title: [Full article title]
date: [YYYY-MM-DD today]
excerpt: [1-2 sentence summary under 200 characters]
category: [compliance|legal|medical|business|industry]
---

[Article body in markdown]"""

    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=2000,
        messages=[{"role": "user", "content": f"Write a Speakwide Insights article.\n\nTitle hint: {topic['title_hint']}\nCategory: {topic['category']}\nAngle: {topic['angle']}\nToday: {datetime.date.today().isoformat()}\n\nReturn complete markdown with frontmatter only."}],
        system=system_prompt,
    )
    return message.content[0].text

def extract_title(content):
    match = re.search(r'^title:\s*(.+)$', content, re.MULTILINE)
    return match.group(1).strip().strip('"').strip("'") if match else None

def save_article(content):
    today = datetime.date.today()
    title = extract_title(content)
    slug = slugify(title) if title else f"article-{today.isoformat()}"
    filepath = os.path.join("articles", f"{today.isoformat()}-{slug}.md")
    os.makedirs("articles", exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Article saved: {filepath}")
    return filepath

if __name__ == "__main__":
    print("Selecting topic for this month...")
    topic = pick_topic()
    print(f"Topic: {topic['title_hint']}")
    print("Calling Claude API...")
    content = generate_article(topic)
    print("Saving article...")
    path = save_article(content)
    print(f"Done: {path}")
