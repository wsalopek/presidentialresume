import json
import requests
import os

def slugify(name):
    return name.lower().replace(" ", "-").replace(".", "").replace("’", "").replace("'", "")

def fetch_legislators():
    url = "https://raw.githubusercontent.com/unitedstates/congress-legislators/main/legislators-current.json"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def extract_members(data):
    members = []
    for m in data:
        if not m.get("terms"): continue
        latest_term = m["terms"][-1]
        name = m["name"]["official_full"]
        office = "U.S. Senator" if latest_term["type"] == "sen" else "U.S. Representative"
        state = latest_term["state"]
        members.append({
            "name": name,
            "id": slugify(name),
            "state": state,
            "office": office
        })
    return members

def save_members(members, filepath="data/members_list.json"):
    os.makedirs("data", exist_ok=True)
    with open(filepath, "w") as f:
        json.dump(members, f, indent=2)
    print(f"✅ Saved {len(members)} members to {filepath}")

if __name__ == "__main__":
    print("📥 Downloading current Congress member list...")
    data = fetch_legislators()
    members = extract_members(data)
    save_members(members)
