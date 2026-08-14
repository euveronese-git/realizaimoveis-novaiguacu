from PIL import Image
import os

src = r"C:\Users\gabri\.cursor\projects\c-Users-gabri-Projects-realizaimoveis-novaigua-u\assets\c__Users_gabri_AppData_Roaming_Cursor_User_workspaceStorage_25125b16d14d3214ecb045df04e17cd7_images_reliza-logo-deitada-659ca8e5-7c33-4b3f-8f0e-ae8593a19f89.png"
out = r"c:\Users\gabri\Projects\realizaimoveis-novaiguaçu\public\assets\realiza-logo-horizontal.png"

img = Image.open(src).convert("RGBA")
pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        # Near-black background -> transparent
        if r < 40 and g < 40 and b < 40:
            pixels[x, y] = (0, 0, 0, 0)

bbox = img.getbbox()
if bbox:
    pad = 8
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(w, bbox[2] + pad)
    bottom = min(h, bbox[3] + pad)
    img = img.crop((left, top, right, bottom))

os.makedirs(os.path.dirname(out), exist_ok=True)
img.save(out, "PNG")
print("saved", out, img.size)
