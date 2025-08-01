import os
import json
from pathlib import Path
from langchain.agents import initialize_agent, Tool
from langchain.chat_models import ChatOpenAI
from langchain.tools import SerpAPIWrapper
from langchain.utilities import SerpAPIWrapper

# Ensure the output directory exists
os.makedirs("data/profiles", exist_ok=True)

# Load member list
with open("data/members_list.json", "r") as f:
    members = json.load(f)

# Setup LLM and tools
llm = ChatOpenAI(temperature=0, model="gpt-4", openai_api_key=os.environ["OPENAI_API_KEY"])
search = SerpAPIWrapper(serpapi_api_key=os.environ["SERPAPI_API_KEY"])

tools = [
    Tool(
        name="Google Search",
        func=search.run,
        description="Search the web for recent or public information on U.S. politicians"
    )
]

agent = initialize_agent(
    tools, llm, agent="zero-shot-react-description", verbose=True
)

def resume_prompt(name, state, office):
    return f"""
Create a JSON object containing a professional resume for {name}, who serves as a {office} from {state}.
Include the following fields: contact (email and website), education (list), experience (list), legislative focus (list), committees (list), public statement (1 quote), and top donors (leave blank or say 'coming soon').

Make it concise, honest, and formatted in proper JSON.
"""

# Loop through members and generate a profile for each
for member in members:
    filename = f"data/profiles/{member['id']}.json"
    if Path(filename).exists():
        print(f"✅ Already exists: {filename}")
        continue

    prompt = resume_prompt(member["name"], member["state"], member["office"])
    try:
        response = agent.run(prompt)
        with open(filename, "w") as f:
            f.write(response)
        print(f"✅ Saved resume for {member['name']}")
    except Exception as e:
        print(f"❌ Failed for {member['name']}: {e}")
