import re

# Read new_tags.py
with open("new_tags.py", "r", encoding="utf-8") as f:
    new_tags_content = f.read()

# Read database.js
with open("database.js", "r", encoding="utf-8") as f:
    db_content = f.read()

# Parse new_tags.py to extract tags for each society
# Find all society blocks
society_pattern = r'"([^"]+)": \[\s*(.*?)\s*\],'
societies = re.findall(society_pattern, new_tags_content, re.DOTALL)

# For each society, convert the tags to JS format
for society, tags_block in societies:
    # Split the tags_block into lines
    lines = tags_block.strip().split("\n")
    js_tags = []
    for line in lines:
        line = line.strip()
        if line:
            # Remove trailing comma
            line = line.rstrip(",")
            # Split on # for comment
            if "#" in line:
                tag_part, comment = line.split("#", 1)
                tag = tag_part.strip().rstrip(",").strip().strip('"')
                comment = comment.strip()
                js_line = f'            "{tag}", // {comment}'
            else:
                tag_part = line.strip().rstrip(",").strip().strip('"')
                js_line = f'            "{tag_part}",'
            js_tags.append(js_line)
    # Join with newlines
    js_tags_str = "\n".join(js_tags)
    # Now, replace in db_content
    # Find the tags array for this society
    # Pattern: society: {\s*tags: \[\s*(.*?)\s*\],
    pattern = rf"{re.escape(society)}: \{{\s*tags: \[\s*(.*?)\s*\],"
    match = re.search(pattern, db_content, re.DOTALL)
    if match:
        old_tags = match.group(1)
        new_tags_block = f"\n{js_tags_str}\n        "
        # Replace
        db_content = db_content.replace(old_tags, new_tags_block)
    else:
        print(f"No match for {society}")

# Write back to database.js
with open("database.js", "w", encoding="utf-8") as f:
    f.write(db_content)

print("Tags replaced successfully.")
