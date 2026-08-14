from pathlib import Path

root = Path(r"c:\Users\gabri\Projects\realizaimoveis-novaiguaçu\src")
skip = {
    "whatsapp.ts",
    "Header.tsx",
    "Footer.tsx",
    "BrandLogo.tsx",
    "WhatsAppFloatingButton.tsx",
    "FacebookIcon.tsx",
    "index.css",
}
replacements = [
    ("#1E8449", "#3ECF47"),
    ("#27AE60", "#5EE05F"),
    ("#186A3B", "#0E3D3D"),
    ("#E8F5E9", "#E8F8E9"),
    ("#F5F5F5", "#F5F7F5"),
    ("#E8E8E8", "#E5EBE5"),
    ("bg-[#2B2B2B]", "bg-[#0E3D3D]"),
    ("text-[#2B2B2B]", "text-[#1A1A1A]"),
    ('fill="#2B2B2B"', 'fill="#0E3D3D"'),
    ("bg-[#4A4A4A]", "bg-[#0E3D3D]"),
    ("rgba(30, 132, 73", "rgba(62, 207, 71"),
    ("rgba(30,132,73", "rgba(62,207,71"),
    ("Megapolo", "Realiza Imóveis"),
]

count = 0
for p in list(root.rglob("*.tsx")) + list(root.rglob("*.ts")):
    if p.name in skip:
        continue
    text = p.read_text(encoding="utf-8")
    orig = text
    for a, b in replacements:
        text = text.replace(a, b)
    if text != orig:
        p.write_text(text, encoding="utf-8")
        count += 1
        print("updated", p.relative_to(root))
print("files", count)
