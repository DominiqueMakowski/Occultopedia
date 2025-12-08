import os
import re
import json
import time
import random
import requests
from io import BytesIO
from dotenv import load_dotenv
from ddgs import DDGS
from ddgs.exceptions import RatelimitException
import google.generativeai as genai
from PIL import Image

# --- Configuration ---
HISTORY_FILE = r"c:\Users\domma\Dropbox\PERSO\SecretSocieties\database.js"
IMG_DIR = r"c:\Users\domma\Dropbox\PERSO\SecretSocieties\img"
JS_MANIFEST_PATH = r"c:\Users\domma\Dropbox\PERSO\SecretSocieties\images.js"
USER_AGENT = "SecretSocietiesBot/1.0 (educational script)"

# --- Setup ---
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("WARNING: GEMINI_API_KEY not found in .env. AI selection will be skipped.")

if not os.path.exists(IMG_DIR):
    os.makedirs(IMG_DIR)

# --- Functions ---


def get_wikipedia_images(query, max_extra=3):
    """
    Searches Wikipedia for a query and returns main image + extra images.
    """
    base_url = "https://en.wikipedia.org/w/api.php"
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})

    # 1. Search for the page
    search_params = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": query,
        "srlimit": 1,
    }
    search_resp = session.get(base_url, params=search_params).json()

    if not search_resp.get("query", {}).get("search"):
        return None, []

    page_title = search_resp["query"]["search"][0]["title"]

    # 2. Get main page image
    main_image_url = None
    main_params = {
        "action": "query",
        "format": "json",
        "prop": "pageimages",
        "titles": page_title,
        "pithumbsize": 600,
    }
    main_resp = session.get(base_url, params=main_params).json()
    pages = main_resp.get("query", {}).get("pages", {})
    for pid in pages:
        if "thumbnail" in pages[pid]:
            main_image_url = pages[pid]["thumbnail"]["source"]

    # 3. Get additional images
    extra_params = {
        "action": "query",
        "format": "json",
        "prop": "imageinfo",
        "titles": page_title,
        "generator": "images",
        "gimlimit": 20,
        "iiprop": "url|size|mime",
        "iiurlwidth": 500,
    }
    extra_resp = session.get(base_url, params=extra_params).json()
    file_pages = extra_resp.get("query", {}).get("pages", {})

    candidates = []
    for pid, pdata in file_pages.items():
        if "imageinfo" in pdata:
            info = pdata["imageinfo"][0]
            url = info.get("thumburl", info.get("url"))
            width = info.get("width", 0)
            height = info.get("height", 0)
            title = pdata.get("title", "").lower()

            # Filter out small icons or logos if we already have a main image
            if width < 150 or height < 150:
                continue
            if ("icon" in title or "logo" in title) and main_image_url:
                continue
            if main_image_url and (main_image_url in url or url in main_image_url):
                continue

            candidates.append(url)

    return main_image_url, candidates[:max_extra]


def get_broad_search_images(query, max_results=5):
    """
    Uses DuckDuckGo to find aesthetic images.
    """
    print(f"  Performing broad search for: '{query}'...")
    results = []
    try:
        with DDGS() as ddgs:
            enhanced_query = f"{query} secret society symbol ritual costume"
            ddg_images = ddgs.images(
                enhanced_query,
                region="wt-wt",
                safesearch="off",
                size="Medium",
                type_image="Photo",
                max_results=max_results,
            )
            for img in ddg_images:
                results.append(img["image"])
    except RatelimitException:
        print("  Broad search rate limited. Skipping broad search for this item.")
        time.sleep(5)  # Cool down
    except Exception as e:
        print(f"  Broad search error: {e}")

    return results


def select_images_with_gemini(image_urls, context_name):
    """
    Uses Gemini to select the best images. Falls back to heuristic if no key.
    """
    if not GEMINI_API_KEY:
        return heuristic_selection(image_urls)

    # Use Gemini 2.0 Flash (Latest available)
    model = genai.GenerativeModel("gemini-2.0-flash")

    images_data = []
    valid_indices = []
    candidates = image_urls[:6]  # Limit to top 6 to save time

    for i, url in enumerate(candidates):
        try:
            resp = requests.get(url, timeout=5, headers={"User-Agent": USER_AGENT})
            if resp.status_code == 200:
                img = Image.open(BytesIO(resp.content))
                images_data.append(img)
                valid_indices.append(i)
        except Exception:
            # Network/Image errors here are expected and can be ignored for individual images
            continue

    if not images_data:
        return heuristic_selection(image_urls)

    prompt = (
        f"I have {len(images_data)} images related to the secret society '{context_name}'. "
        "Identify the 3 most visually striking, relevant, and high-quality images that represent "
        "rituals, costumes, or symbols. Return ONLY the indices (0-based) of the selected images "
        "separated by commas (e.g., '0, 2, 4'). If none are good, return '0'."
    )

    try:
        response = model.generate_content([prompt, *images_data])
        text = response.text.strip()
    except Exception as e:
        print(f"    [AI] Gemini Error (Rate Limit or other): {e}")
        print("    [AI] Falling back to heuristic selection.")
        time.sleep(10)  # Cool down for rate limits
        return heuristic_selection(image_urls)

    selected_indices = []
    for x in text.replace(",", " ").split():
        if x.isdigit():
            idx = int(x)
            if idx < len(valid_indices):
                selected_indices.append(valid_indices[idx])

    final_urls = [candidates[i] for i in selected_indices]

    # Fill up to 4 with remaining unique images
    seen = set(final_urls)
    for url in image_urls:
        if url not in seen:
            final_urls.append(url)
            seen.add(url)
        if len(final_urls) >= 4:
            break

    return final_urls


def heuristic_selection(image_urls):
    """Fallback selection logic."""
    valid_urls = [
        u for u in image_urls if u.lower().endswith((".jpg", ".jpeg", ".png"))
    ]
    if not valid_urls:
        valid_urls = image_urls

    seen = set()
    unique = []
    for url in valid_urls:
        if url not in seen:
            unique.append(url)
            seen.add(url)
    return unique[:4]


def download_image(url, save_path):
    headers = {"User-Agent": USER_AGENT}
    response = requests.get(url, headers=headers, stream=True, timeout=10)
    if response.status_code == 200:
        with open(save_path, "wb") as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        return True
    return False


def parse_societies(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    pattern = re.compile(r"^    ([A-Za-z0-9_]+):\s*\{", re.MULTILINE)
    return pattern.findall(content)


def main():
    societies = parse_societies(HISTORY_FILE)
    print(f"Found {len(societies)} societies.")

    # Shuffle to avoid hitting rate limits on the same items every time
    random.shuffle(societies)

    manifest = {}
    if os.path.exists(JS_MANIFEST_PATH):
        try:
            with open(JS_MANIFEST_PATH, "r", encoding="utf-8") as f:
                content = f.read()
                # Extract JSON part from "const imagesManifest = { ... };"
                match = re.search(r"const imagesManifest = ({.*});", content, re.DOTALL)
                if match:
                    manifest = json.loads(match.group(1))
        except Exception as e:
            print(f"Warning: Could not parse existing images.js: {e}")

    for key in societies:
        if key in ["Beliefs", "Rituals", "Structure", "Origins"]:
            continue

        # Skip if already processed (comment out to force refresh)
        # But since we are randomizing, let's enable skipping for now so we don't re-download everything
        # unless the user explicitly wants to force it.
        if key in manifest and len(manifest[key]) > 1:
            if all(os.path.exists(os.path.join(IMG_DIR, f)) for f in manifest[key]):
                # print(f"Skipping {key} (Already has images)")
                continue

        query = key.replace("_", " ")
        if key == "The_Machine":
            query = "The Machine University of Alabama"
        if key == "Skull_and_Bones":
            query = "Skull and Bones Yale"

        print(f"Processing: {query}...")

        # Gather candidates
        # Note: We let exceptions propagate here as requested.
        # If Wiki or DDG fails completely, the script stops.
        wiki_main, wiki_extra = get_wikipedia_images(query)
        broad_images = get_broad_search_images(query, max_results=8)

        all_candidates = []
        if wiki_main:
            all_candidates.append(wiki_main)
        all_candidates.extend(wiki_extra)
        all_candidates.extend(broad_images)

        # Select and Download
        selected_urls = select_images_with_gemini(all_candidates, query)

        downloaded_files = []
        for i, url in enumerate(selected_urls):
            ext = ".png" if ".png" in url.lower() else ".jpg"
            base_name = f"{key}_{i}"
            filename = f"{base_name}{ext}"
            save_path = os.path.join(IMG_DIR, filename)

            # Check for and remove existing files with same base name but different extension
            # to avoid having both image_0.jpg and image_0.png
            for other_ext in [".jpg", ".jpeg", ".png"]:
                if other_ext == ext:
                    continue
                other_path = os.path.join(IMG_DIR, f"{base_name}{other_ext}")
                if os.path.exists(other_path):
                    try:
                        os.remove(other_path)
                        print(f"    Removed duplicate variant: {base_name}{other_ext}")
                    except OSError as e:
                        print(
                            f"    Warning: Could not remove {base_name}{other_ext}: {e}"
                        )

            print(f"  Downloading ({i+1}/{len(selected_urls)}): {url[:60]}...")
            try:
                if download_image(url, save_path):
                    downloaded_files.append(filename)
                else:
                    print("    Failed (Status Code).")
            except Exception as e:
                print(f"    Failed (Error: {e})")

        if downloaded_files:
            manifest[key] = downloaded_files

            # Save JS manifest (for local file:// access)
            with open(JS_MANIFEST_PATH, "w", encoding="utf-8") as f:
                f.write(f"const imagesManifest = {json.dumps(manifest, indent=4)};")

        time.sleep(3)

        time.sleep(1)


if __name__ == "__main__":
    main()
