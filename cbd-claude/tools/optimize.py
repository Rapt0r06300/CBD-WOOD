from PIL import Image
import os, glob
base = r"C:\Users\flo\Documents\Codex\2026-11-03\dans\work\github-cbd-wood-pages\cbd-claude\assets"

def do(folder, maxw, q):
    total = 0
    for p in glob.glob(os.path.join(base, folder, "*.png")):
        im = Image.open(p).convert("RGB")
        if im.width > maxw:
            h = int(im.height * maxw / im.width)
            im = im.resize((maxw, h), Image.LANCZOS)
        out = p[:-4] + ".jpg"
        im.save(out, "JPEG", quality=q, optimize=True, progressive=True)
        os.remove(p)
        kb = os.path.getsize(out) // 1024
        total += kb
        print(f"  {folder}/{os.path.basename(out)}  {im.size[0]}x{im.size[1]}  {kb} KB")
    print(f"=> {folder}: {total} KB total\n")

print("Optimisation des images WOOD...\n")
do("products", 720, 85)
do("scenes", 1280, 85)
print("Fini.")
