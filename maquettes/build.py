"""Génère les maquettes desktop (HTML autonome) du site Au Grand Jardin,
dans l'esprit du template Aurova, à partir des vraies données Notion et des photos du site actuel.
Chaque page est un <div class="page"> de 1440 px, converti ensuite en frame Figma."""
import base64, io, json, pathlib, re, sys
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent
SITE = ROOT.parent
OLD = pathlib.Path('/home/claude/thomasbonometti/augrandjardin/images')
OUT = ROOT / 'out'
OUT.mkdir(exist_ok=True)

# ---------- données ----------
produits = json.load(open(SITE / 'data/produits.json'))
reglages = json.load(open(SITE / 'data/reglages.json'))
pdt = reglages['pommesDeTerre']

def euro(n):
    return f"{n:,.2f} €".replace(',', ' ').replace('.', ',')

def prix(p):
    if p['venduA'] == '/kg' and p['prixKg'] is not None:
        return p['prixKg'], 'le kg'
    if p['prixUnitaire'] is not None:
        return p['prixUnitaire'], p['venduA'] or ''
    if p['prixKg'] is not None and p['poids']:
        return round(p['prixKg'] * p['poids'], 2), p['venduA'] or ''
    return None, ''

NOUVEAUX = {'Carotte vrac', 'Céleri Rave', 'Chou Kale', 'Navet Violet', 'Poireau', 'Radis Noir (long)', 'Radis Noir (rond)', 'Radis Rave'}
for p in produits:
    p['nom'] = re.sub(r'\s+', ' ', p['nom']).strip()
    p['prix'], p['unite'] = prix(p)
    p['nouveau'] = p['nom'] in NOUVEAUX
    img = SITE / f"public/produits-img/{p['ref']}.webp" if p['ref'] is not None else None
    p['img'] = img if img and img.exists() else None

ORDRE = ['🥕', '🥬', '🧑‍🌾', '🧅', '🍅', '🍃', '🍎', '🍓', '🧺', '🌱', '🍯']
def titre_rayon(r):
    t = re.sub(r'^\S+\s+', '', r or 'Divers')
    return 'Légumes' if t.startswith('Nos légumes') else t
rayons = {}
for p in produits:
    rayons.setdefault(p['rayon'] or '🧺 Divers', []).append(p)
rayons = sorted(rayons.items(), key=lambda kv: next((i for i, e in enumerate(ORDRE) if kv[0].startswith(e)), 99))

# ---------- images ----------
_cache = {}
def img(path, w, h, focus=(0.5, 0.5), scale=1.5, q=78):
    """Recadre en 'cover' au ratio w/h, encode en JPEG base64."""
    key = (str(path), w, h, focus)
    if key in _cache:
        return _cache[key]
    im = Image.open(path).convert('RGB')
    W, H = int(w * scale), int(h * scale)
    r = max(W / im.width, H / im.height)
    im = im.resize((max(W, round(im.width * r)), max(H, round(im.height * r))), Image.LANCZOS)
    x = round((im.width - W) * focus[0]); y = round((im.height - H) * focus[1])
    im = im.crop((x, y, x + W, y + H))
    buf = io.BytesIO(); im.save(buf, 'JPEG', quality=q, optimize=True)
    uri = 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()
    _cache[key] = uri
    return uri

def svg_uri(svg):
    return 'data:image/svg+xml;base64,' + base64.b64encode(svg.encode()).decode()

LOGO_SVG = (OLD / 'logo-menu.svg').read_text()
LOGO_WHITE = LOGO_SVG.replace('#0c4b31', '#ffffff')
TAMPON = (OLD / 'tampon.svg').read_text()

P = {  # photos de la ferme
    'semis': OLD / 'la-ferme-cover2x.jpg',
    'tunnels_champ': OLD / 'footer-farm-bg2x.jpg',
    'tunnel': OLD / 'la-ferme-illu-12x.jpg',
    'pierre': OLD / 'la-ferme-illu-22x.jpg',
    'echange': OLD / 'partenaires-cover2x.jpg',
    'aerien': OLD / 'VIDEO.jpg',
    'stand': OLD / '626eb1cbfbea8601403ef80c_01.jpg',
    'champignons': OLD / '603614cd518462e720351970_prod-32x.jpg',
    'ruches': OLD / '603614d64165bc43b469fe67_prod-22x.jpg',
    'oeufs': OLD / '626eb0e208c567fc9a25b834_raiyan-zach-jDkrpWtSkb4-unsplash-p-1080.jpeg',
    'toque': OLD / '626eb157e27fa33496f2ffb6_la-toque-blanche.jpeg',
    'equipe_resto': OLD / '6036151e29f62876695aa1cb_restau2x.jpg',
    'label': OLD / 'ferme-label-32x.png',
    'pdt': SITE / 'public/produits-img/51.webp',
}

# ---------- icônes (Lucide, MIT) ----------
def icon(name, size=20, color='currentColor', sw=1.6):
    # NB : l'import HTML → Figma n'applique pas la mise à l'échelle du viewBox ;
    # les vecteurs des icônes ≠ 24 px sont remis à l'échelle après import (script use_figma).
    paths = {
        'arrow': '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
        'right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        'pin': '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><path d="M12 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6Z"/>',
        'phone': '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
        'clock': '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20Z"/><path d="M12 6v6l4 2"/>',
        'mail': '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="m22 7-10 6L2 7"/>',
        'lock': '<path d="M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
        'check': '<path d="M20 6 9 17l-5-5"/>',
        'minus': '<path d="M5 12h14"/>',
        'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
        'message': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>',
        'truck': '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
        'sprout': '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
        'facebook': '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
        'menu': '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
        'close': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        'chevron': '<path d="m9 18 6-6-6-6"/>',
    }[name]
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">{paths}</svg>')

# ---------- styles ----------
CSS = """
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #e9e6df; font-family: 'Geist', sans-serif; color: #333333; -webkit-font-smoothing: antialiased; }
.page { width: 1440px; background: #FBF9F3; display: flex; flex-direction: column; overflow: hidden; margin-bottom: 80px; }
.wrap { width: 1440px; padding: 0 80px; display: flex; flex-direction: column; }
h1, h2, h3, h4, .display { font-family: 'Geist', sans-serif; font-weight: 400; color: #111111;  text-wrap: balance; }
h1 { font-size: 64px; line-height: 72px; letter-spacing: -0.03em; }
h2 { font-size: 48px; line-height: 58px; letter-spacing: -0.03em; }
h3 { font-size: 24px; line-height: 32px; letter-spacing: -0.02em; }
p { font-size: 16px; line-height: 24px; }
.lg { font-size: 20px; line-height: 30px; }
.sm { font-size: 14px; line-height: 20px; }
.muted { color: #565656; }
.eyebrow { font-size: 13px; line-height: 20px; letter-spacing: 0.16em; text-transform: uppercase; color: #333333; }
.on-dark, .on-dark h1, .on-dark h2, .on-dark h3, .on-dark p, .on-dark .eyebrow { color: #FFFFFF; }
.on-dark .muted { color: rgba(255,255,255,0.72); }
.row { display: flex; flex-direction: row; }
.col { display: flex; flex-direction: column; }
.btn { display: inline-flex; align-items: center; gap: 8px; height: 48px; padding: 0 22px; border-radius: 8px; font-size: 16px; line-height: 24px; font-family: 'Geist', sans-serif; white-space: nowrap; }
.btn-primary { background: #0C4B31; color: #FFFFFF; }
.btn-secondary { background: transparent; color: #111111; border: 1px solid #C3C1C1; }
.btn-white { background: #FFFFFF; color: #111111; }
.btn-dark { background: #111111; color: #FFFFFF; }
.chip { display: inline-flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px; border-radius: 6px; background: #F0E7D1; color: #111111; font-size: 13px; line-height: 18px; white-space: nowrap; }
.chip-green { background: #0C4B31; color: #FFFFFF; }
.chip-leaf { background: #00A544; color: #FFFFFF; }
.chip-white { background: #FFFFFF; color: #111111; }
.chip-outline { background: transparent; border: 1px solid #D9D2C1; }
.card-img { border-radius: 12px; overflow: hidden; display: block; }
.dot { width: 8px; height: 8px; border-radius: 4px; background: #00A544; }
.line { height: 1px; background: #E3DCCB; width: 100%; }
input.field, .field { height: 52px; border-radius: 8px; border: 1px solid #D9D2C1; background: #FFFFFF; padding: 0 16px; font-family: 'Geist', sans-serif; font-size: 16px; color: #111111; display: flex; align-items: center; }
.field.placeholder { color: #8A867D; }
label.lab { font-size: 14px; line-height: 20px; color: #333333; }
"""

# ---------- blocs communs ----------
NAV = [('La ferme', 'ferme'), ('Pommes de terre', 'pdt'), ('Professionnels', 'pros'), ('Horaires & contact', 'contact')]

def topbar():
    return f'''
<div class="wrap" style="background:#0C4B31; height:44px; justify-content:center;">
  <div class="row" style="justify-content:space-between; align-items:center;">
    <div class="row" style="gap:10px; align-items:center;">
      <div class="dot" style="background:#7BE39B"></div>
      <p class="sm" style="color:#FFFFFF">Prochaine vente à la ferme : <span style="font-weight:500">samedi 17 octobre, 10h – 12h30</span></p>
    </div>
    <div class="row" style="gap:28px; align-items:center;">
      <div class="row" style="gap:8px; align-items:center;">{icon('pin', 16, '#FFFFFF')}<p class="sm" style="color:#FFFFFF">43 rue Principale, Lostroff</p></div>
      <div class="row" style="gap:8px; align-items:center;">{icon('phone', 16, '#FFFFFF')}<p class="sm" style="color:#FFFFFF">06 42 42 42 93</p></div>
    </div>
  </div>
</div>'''

def header(active=None):
    links = ''.join(
        f'<p style="font-size:15px; line-height:22px; color:{"#111111" if k == active else "#565656"}; '
        f'{"border-bottom:1px solid #111111; padding-bottom:2px;" if k == active else ""}">{t}</p>'
        for t, k in NAV)
    return f'''
<div class="wrap" style="height:88px; justify-content:center; border-bottom:1px solid #ECE6D8;">
  <div class="row" style="justify-content:space-between; align-items:center;">
    <img src="{svg_uri(LOGO_SVG)}" style="width:176px; height:29px;" alt="Au Grand Jardin">
    <div class="row" style="gap:36px; align-items:center;">{links}</div>
    <div class="btn {"btn-dark" if active == "produits" else "btn-primary"}">Produits de la semaine</div>
  </div>
</div>'''

def footer():
    col = lambda title, items: (f'<div class="col" style="gap:14px; width:220px;"><p class="sm" style="color:rgba(255,255,255,0.5)">{title}</p>'
                                + ''.join(f'<p style="color:#FFFFFF; font-size:15px; line-height:22px;">{i}</p>' for i in items) + '</div>')
    return f'''
<div class="wrap" style="background:#111111; border-radius:24px 24px 0 0; padding-top:64px; padding-bottom:32px; gap:56px;">
  <div class="row" style="justify-content:space-between;">
    <div class="col" style="gap:20px; width:360px;">
      <img src="{svg_uri(LOGO_WHITE)}" style="width:212px; height:35px;" alt="Au Grand Jardin">
      <p style="color:rgba(255,255,255,0.72);">Ferme maraîchère bio à Lostroff, en Moselle. Semences paysannes, variétés anciennes, partenaires à moins de 50 km.</p>
      <div class="row" style="gap:10px; align-items:center;">{icon('facebook', 18, '#FFFFFF')}<p class="sm" style="color:#FFFFFF">Suivez la ferme sur Facebook</p></div>
    </div>
    <div class="row" style="gap:24px;">
      {col('Le site', ['Produits de la semaine', 'La ferme', 'Pommes de terre', 'Professionnels', 'Horaires & contact'])}
      {col('Venir à la ferme', ['Samedi 10h – 12h30', '43 rue Principale', '57670 Lostroff', 'Itinéraire'])}
      {col('Contact', ['Pierre Fouquet', '06 42 42 42 93', 'pierre@augrandjardin.fr'])}
    </div>
  </div>
  <div class="line" style="background:rgba(255,255,255,0.12)"></div>
  <div class="row" style="justify-content:space-between;">
    <p class="sm" style="color:rgba(255,255,255,0.5)">© 2026 Au Grand Jardin · Liste et horaires mis à jour le vendredi 16 octobre</p>
    <div class="row" style="gap:28px;"><p class="sm" style="color:rgba(255,255,255,0.5)">Mentions légales</p><p class="sm" style="color:rgba(255,255,255,0.5)">Design Thomas Bonometti</p></div>
  </div>
</div>'''

def page(pid, name, body, active=None):
    return f'<div class="page" id="{pid}" data-name="{name}">{topbar()}{header(active)}{body}{footer()}</div>'

def product_card(p, w=296, img_h=296, dark=False):
    badges = ''
    if p['nouveau']: badges += '<div class="chip chip-leaf">Nouveau</div>'
    if p['quantiteLimitee']: badges += '<div class="chip chip-white">Quantité limitée</div>'
    if p['img']:
        visual = f'<img class="card-img" src="{img(p["img"], w, img_h)}" style="width:{w}px; height:{img_h}px;">'
    else:
        visual = (f'<div class="card-img" style="width:{w}px; height:{img_h}px; background:#F0E7D1; display:flex; align-items:center; justify-content:center;">'
                  f'<p class="display" style="font-size:72px; line-height:80px; color:#C9B98F;">{p["nom"][0]}</p></div>')
    bio = 'Non certifié bio' if p['pasBio'] else 'Bio'
    prod = '' if p['producteur'] in (None, 'Au Grand Jardin') else f' · {p["producteur"]}'
    price = (f'<div class="row" style="gap:8px; align-items:baseline;"><p class="display" style="font-size:24px; line-height:30px; letter-spacing:-0.02em; color:#111111;">{euro(p["prix"])}</p>'
             f'<p class="sm muted">{p["unite"]}</p></div>') if p['prix'] is not None else ''
    return f'''
<div class="col" style="width:{w}px; gap:14px;">
  <div style="position:relative; width:{w}px; height:{img_h}px;">
    {visual}
    <div class="row" style="position:absolute; left:12px; top:12px; gap:6px;">{badges}</div>
  </div>
  <div class="col" style="gap:4px; padding:0 2px;">
    <p style="font-size:18px; line-height:26px; color:#111111;">{p["nom"]}</p>
    {price}
    <p class="sm muted">{bio}{prod}</p>
  </div>
</div>'''

def by_name(n):
    return next(p for p in produits if p['nom'].startswith(n))

def stat(value, label, w):
    return (f'<div class="col" style="gap:8px; width:{w}px;"><p class="display" style="font-size:40px; line-height:48px; letter-spacing:-0.03em; color:#111111;">{value}</p>'
            f'<p class="sm muted">{label}</p></div>')

def soft_card(value, label):
    return (f'<div class="col" style="width:203px; height:212px; border-radius:12px; background:#F0E7D1; padding:18px; justify-content:space-between;">'
            f'<p class="display" style="font-size:44px; line-height:52px; letter-spacing:-0.03em; color:#111111;">{value}</p>'
            f'<p class="sm" style="color:#333333;">{label}</p></div>')

def arrow_btn(dark=True):
    bg = '#111111' if dark else '#FFFFFF'; fg = '#FFFFFF' if dark else '#111111'
    return f'<div style="width:40px; height:40px; border-radius:8px; background:{bg}; display:flex; align-items:center; justify-content:center;">{icon("arrow", 18, fg)}</div>'

# =====================================================================
# ACCUEIL
# =====================================================================
def home():
    nb = len(produits)
    vedettes = [by_name('Poireau'), by_name('Haricot vert'), by_name('Tomate Cerise'), by_name('Chou Kale')]
    def overlay_card(p):
        return f'''
<div style="position:relative; width:308px; height:400px;">
  <img class="card-img" src="{img(p['img'], 308, 400)}" style="width:308px; height:400px;">
  <div style="position:absolute; left:0; top:0; width:308px; height:400px; border-radius:12px; background:linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.62) 100%);"></div>
  <div class="row" style="position:absolute; left:16px; top:16px; gap:6px;">{'<div class="chip chip-leaf">Nouveau</div>' if p['nouveau'] else ''}</div>
  <div style="position:absolute; right:16px; top:16px;">{arrow_btn()}</div>
  <div class="col" style="position:absolute; left:20px; bottom:20px; gap:2px; width:268px;">
    <p style="font-size:20px; line-height:28px; color:#FFFFFF;">{p['nom']}</p>
    <p style="color:rgba(255,255,255,0.85);">{euro(p['prix'])} · {p['unite']}</p>
  </div>
</div>'''

    def way_card(photo, title, text, tag, focus=(0.5, 0.5)):
        return f'''
<div class="col" style="width:400px; gap:18px;">
  <img class="card-img" src="{img(photo, 400, 300, focus)}" style="width:400px; height:300px;">
  <div class="col" style="gap:8px;">
    <div class="row" style="justify-content:space-between; align-items:center;"><h3>{title}</h3>{icon('right', 22, '#111111')}</div>
    <p class="muted">{text}</p>
  </div>
  <div class="row"><div class="chip">{tag}</div></div>
</div>'''

    body = f'''
<!-- HERO -->
<div class="wrap" style="padding-top:72px; padding-bottom:56px; gap:56px;">
  <div class="row" style="justify-content:space-between; align-items:flex-end;">
    <div class="col" style="gap:32px; width:900px;">
      <div class="row" style="gap:10px; align-items:center;"><div class="dot"></div><p class="eyebrow">Maraîcher bio · Lostroff, Moselle</p></div>
      <h1>Des légumes bio cueillis à Lostroff pour la vente du samedi</h1>
      <div class="row" style="gap:12px;">
        <div class="btn btn-primary">Voir les {nb} produits de la semaine</div>
        <div class="btn btn-secondary">{icon('pin', 18, '#111111')}Venir à la ferme</div>
      </div>
    </div>
    <p class="lg muted" style="width:330px;">Semences paysannes, variétés anciennes, aucun produit chimique. Chaque semaine, Pierre publie ici ce qui est prêt à la récolte.</p>
  </div>
  <div class="row" style="justify-content:space-between;">
    {stat(str(nb), 'produits cette semaine', 220)}
    {stat('Sam. 10h', 'prochaine vente, à la ferme', 220)}
    {stat('100 %', 'légumes bio', 220)}
    {stat('0', 'semence hybride F1', 220)}
    {stat('50 km', 'au plus pour nos partenaires', 220)}
  </div>
</div>
<img src="{img(P['semis'], 1440, 620, (0.5, 0.55))}" style="width:1440px; height:620px; display:block;">

<!-- ENGAGEMENT -->
<div class="wrap" style="padding-top:112px; padding-bottom:112px;">
  <div class="row" style="justify-content:space-between;">
    <div class="col" style="gap:24px; width:300px;">
      <p class="eyebrow">La ferme Au Grand Jardin</p>
      <img src="{svg_uri(TAMPON)}" style="width:120px; height:146px; opacity:0.9;" alt="">
    </div>
    <div class="col" style="gap:48px; width:860px;">
      <p class="display" style="font-size:36px; line-height:46px; letter-spacing:-0.025em; color:#111111;">Pierre cultive en permaculture : pas de labour, de la paille plutôt que du désherbant, des fleurs pour les pollinisateurs. <span style="color:#8A867D;">Ce qui pousse ici dépend de la saison, et c’est exactement ce que vous trouvez le samedi.</span></p>
      <div class="row" style="gap:16px;">
        {soft_card('0', 'produit chimique sur l’exploitation')}
        {soft_card('100 %', 'semences paysannes et variétés anciennes')}
        {soft_card('50 km', 'au plus pour nos partenaires bio')}
        {soft_card('Label', 'Maraîchage Sol Vivant')}
      </div>
      <div class="row"><div class="btn btn-secondary">Découvrir la ferme {icon('right', 18, '#111111')}</div></div>
    </div>
  </div>
</div>

<!-- PRODUITS DE LA SEMAINE (section sombre) -->
<div class="wrap on-dark" style="background:#0C4B31; padding-top:104px; padding-bottom:96px; gap:56px;">
  <div class="row" style="justify-content:space-between; align-items:flex-end;">
    <div class="col" style="gap:18px; width:720px;">
      <p class="eyebrow">Cette semaine à la ferme</p>
      <h2>Ce qui est prêt pour samedi</h2>
    </div>
    <div class="row" style="gap:10px; align-items:center;"><div class="dot" style="background:#7BE39B"></div><p class="sm muted">Liste mise à jour vendredi 16 octobre, 16h24</p></div>
  </div>
  <div class="row" style="gap:16px;">{''.join(overlay_card(p) for p in vedettes)}</div>
  <div class="row" style="justify-content:space-between; align-items:center;">
    <p class="muted" style="width:620px;">Et {nb - 4} autres produits : courges, radis noir, betteraves, aromates, jus de pomme de la ferme et conserves. Prix TTC, vente à la ferme.</p>
    <div class="btn btn-white">Voir toute la liste</div>
  </div>
</div>

<!-- QUATRE FAÇONS -->
<div class="wrap" style="padding-top:112px; padding-bottom:112px;">
  <div class="row" style="justify-content:space-between;">
    <div class="col" style="gap:18px; width:360px;">
      <p class="eyebrow">À la ferme et au-delà</p>
      <h2 style="font-size:40px; line-height:48px;">Quatre façons de manger nos légumes</h2>
      <p class="muted">Venez le samedi, réservez vos sacs de pommes de terre, commandez par SMS ou faites-vous livrer si vous êtes un professionnel.</p>
    </div>
    <div class="col" style="gap:56px; width:816px;">
      <div class="row" style="gap:16px;">
        {way_card(P['stand'], 'Vente à la ferme', 'Tous les samedis de 10h à 12h30, 43 rue Principale à Lostroff. Les horaires de la semaine sont affichés en haut de chaque page.', 'Chaque samedi', (0.5, 0.6))}
        {way_card(P['pdt'], 'Pommes de terre en sacs', f'{len([v for v in pdt["varietes"] if v["stockKg"] > 0])} variétés en sacs de 15 ou 25 kg, réservées en ligne et retirées à la ferme.', 'Réservations ouvertes jusqu’au 15 novembre')}
      </div>
      <div class="row" style="gap:16px;">
        {way_card(P['tunnels_champ'], 'Commande par SMS', 'La liste de la semaine arrive par SMS. Vous répondez avec votre panier, on le met de côté.', '15 avril – 15 novembre')}
        {way_card(P['toque'], 'Restaurants et épiceries', 'Livraison chaque semaine selon nos récoltes. Grille tarifaire réservée aux professionnels.', 'Professionnels')}
      </div>
    </div>
  </div>
</div>

<!-- VENIR À LA FERME -->
<div class="wrap" style="padding-bottom:112px;">
  <div class="row" style="gap:48px; align-items:center; background:#F0E7D1; border-radius:16px; padding:24px;">
    <img class="card-img" src="{img(P['tunnel'], 420, 460, (0.45, 0.5))}" style="width:420px; height:460px;">
    <div class="col" style="gap:28px; width:700px;">
      <div class="row" style="gap:10px; align-items:center;">{icon('clock', 18, '#111111')}<p class="eyebrow">Venir à la ferme</p></div>
      <p class="display" style="font-size:44px; line-height:54px; letter-spacing:-0.03em; color:#111111;">Samedi 17 octobre<br>de 10h à 12h30</p>
      <div class="col" style="gap:6px;">
        <p class="lg" style="color:#111111;">43 rue Principale, 57670 Lostroff</p>
        <p class="muted">Les horaires changent selon les saisons et les marchés. Ils sont mis à jour ici chaque semaine, en même temps que la liste des produits.</p>
      </div>
      <div class="row" style="gap:12px;">
        <div class="btn btn-primary">{icon('pin', 18, '#FFFFFF')}Itinéraire</div>
        <div class="btn btn-secondary">{icon('phone', 18, '#111111')}06 42 42 42 93</div>
      </div>
    </div>
  </div>
</div>

<!-- SMS -->
<div style="position:relative; width:1440px; height:560px;">
  <img src="{img(P['echange'], 1440, 560, (0.5, 0.45))}" style="width:1440px; height:560px; display:block;">
  <div style="position:absolute; left:0; top:0; width:1440px; height:560px; background:linear-gradient(90deg, rgba(12,30,22,0.82) 0%, rgba(12,30,22,0.45) 55%, rgba(12,30,22,0.1) 100%);"></div>
  <div class="col on-dark" style="position:absolute; left:80px; bottom:80px; gap:24px; width:620px;">
    <p class="eyebrow">Chaque semaine, un seul SMS</p>
    <h2>La liste des légumes, directement sur votre téléphone</h2>
    <p class="muted">Du 15 avril au 15 novembre, recevez la liste de la semaine et réservez votre panier en répondant au message.</p>
    <div class="row" style="gap:10px;">
      <div class="field placeholder" style="width:300px;">Votre numéro de portable</div>
      <div class="btn btn-white">M’inscrire</div>
    </div>
  </div>
</div>
'''
    return page('accueil', 'Accueil', body, None)

exec((ROOT / 'pages_interieures.py').read_text())

def document(pages):
    return f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Au Grand Jardin — maquettes</title>
<style>{CSS}</style></head><body>{''.join(pages)}</body></html>'''

if __name__ == '__main__':
    which = sys.argv[1:] or ['accueil']
    builders = {'accueil': home}
    builders.update({k: globals()[f'page_{k}'] for k in ['produits', 'ferme', 'pdt', 'pros', 'tarifs', 'contact'] if f'page_{k}' in globals()})
    html = document([builders[w]() for w in which])
    out = OUT / f"{'-'.join(which)}.html"
    out.write_text(html)
    print(out, len(html) // 1024, 'KB')
