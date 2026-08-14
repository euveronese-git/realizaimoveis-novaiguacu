from PIL import Image, ImageDraw
import os
import math

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(root, "realizaimoveis-logo.jpg")
out_dir = os.path.join(root, "public", "assets")
os.makedirs(out_dir, exist_ok=True)
out_logo = os.path.join(out_dir, "realizaimoveis-logo.png")
out_favicon = os.path.join(root, "public", "favicon.png")

img = Image.open(src).convert("RGBA")
w, h = img.size
cx, cy = w / 2, h / 2

# Find circle radius: scan from center outward until near-black (outside circle)
pixels = img.load()


def brightness(x, y):
    r, g, b, a = pixels[int(x), int(y)]
    return (r + g + b) / 3


# Sample along several rays to find where teal ends
radii = []
for angle_deg in range(0, 360, 15):
    angle = math.radians(angle_deg)
    last_inside = 0
    for dist in range(int(min(cx, cy)), 0, -1):
        x = cx + dist * math.cos(angle)
        y = cy + dist * math.sin(angle)
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        r, g, b, a = pixels[int(x), int(y)]
        # Inside circle: teal (g elevated) or green/white brand colors
        if brightness(x, y) > 25 or (g > r + 5):
            last_inside = dist
            break
    if last_inside:
        radii.append(last_inside)

radius = int(sum(radii) / len(radii)) + 2 if radii else int(min(w, h) * 0.48)
print("detected radius", radius, "from", len(radii), "rays")

# Create circular mask
mask = Image.new("L", (w, h), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse(
    (cx - radius, cy - radius, cx + radius, cy + radius),
    fill=255,
)

# Also force near-black outside to transparent via mask
out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
out.paste(img, (0, 0))
out.putalpha(mask)

# Crop to circle bbox
bbox = out.getbbox()
if bbox:
    pad = 2
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(w, bbox[2] + pad)
    bottom = min(h, bbox[3] + pad)
    out = out.crop((left, top, right, bottom))

out.save(out_logo, "PNG")
print("logo saved", out_logo, out.size)

fav = out.copy()
fav.thumbnail((64, 64), Image.Resampling.LANCZOS)
canvas = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
ox = (64 - fav.size[0]) // 2
oy = (64 - fav.size[1]) // 2
canvas.paste(fav, (ox, oy), fav)
canvas.save(out_favicon, "PNG")
print("favicon saved", out_favicon)
