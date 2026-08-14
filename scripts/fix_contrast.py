from pathlib import Path

root = Path(r"c:\Users\gabri\Projects\realizaimoveis-novaiguaçu\src\components")

# Prefer dark text on primary green buttons/badges for contrast
pairs = [
    ('bg-[#3ECF47] text-white', 'bg-[#3ECF47] text-[#0E3D3D]'),
    ('bg-[#3ECF47] hover:bg-[#5EE05F] text-white', 'bg-[#3ECF47] hover:bg-[#5EE05F] text-[#0E3D3D]'),
    ("placeholder=\"Ex: Rua Augusto de Vasconcelos - Bangu, RJ\"", "placeholder=\"Ex: R. José Moacir Nogueira - Nova Iguaçu, RJ\""),
    ("neighborhood: 'Bangu'", "neighborhood: 'Nova Iguaçu'"),
    ("neighborhood: 'Bangu / Campo Grande / Recreio'", "neighborhood: 'Nova Iguaçu'"),
    ("placeholder=\"Ex: Bangu, Bangu, Jacarepaguá...\"", "placeholder=\"Ex: Centro, Nova Iguaçu...\""),
    ("placeholder=\"Ex: Bangu, Bangu...\"", "placeholder=\"Ex: Centro, Nova Iguaçu...\""),
    ("'Bangu / Rio de Janeiro'", "'Nova Iguaçu / RJ'"),
    ("Sua Nova Casa em Bangu e Região", "Sua Nova Casa em Nova Iguaçu e Região"),
]

for p in root.rglob("*.tsx"):
    text = p.read_text(encoding="utf-8")
    orig = text
    for a, b in pairs:
        text = text.replace(a, b)
    if text != orig:
        p.write_text(text, encoding="utf-8")
        print("updated", p.name)
