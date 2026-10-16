"""Maquettes mobiles (390 px) du site Au Grand Jardin.
Réutilise les données, images, icônes et styles de build.py ; chaque écran est un <div class="page m">."""
import sys
import build as B
from build import produits, pdt, rayons, titre_rayon, euro, img, svg_uri, icon, P, LOGO_SVG, LOGO_WHITE, TAMPON, by_name, OUT, ROOT

W = 390          # largeur d'écran
C = 350          # largeur de contenu (marges de 20 px)
HALF = 167       # demi-colonne (350 - 16) / 2

ILLU = ROOT / 'assets' / 'sol-vivant-detoure.png'

CSS_M = """
.page.m { width: 390px; flex-shrink: 0; }
.m .wrap { width: 390px; padding: 0 20px; }
.m h1 { font-size: 36px; line-height: 42px; letter-spacing: -0.03em; }
.m h2 { font-size: 30px; line-height: 36px; letter-spacing: -0.03em; }
.m h3 { font-size: 20px; line-height: 28px; letter-spacing: -0.02em; }
.m .lg { font-size: 18px; line-height: 26px; }
.m .btn { height: 48px; padding: 0 18px; font-size: 16px; justify-content: center; }
.m .full { width: 350px; }
.scroller { display: flex; flex-direction: row; gap: 12px; width: 390px; padding: 0 20px; overflow: hidden; }
"""

# ---------------------------------------------------------------- blocs communs
def m_topbar():
    return f'''
<div class="wrap" style="background:#0C4B31; height:40px; justify-content:center;">
  <div class="row" style="justify-content:space-between; align-items:center;">
    <div class="row" style="gap:8px; align-items:center;">
      <div class="dot" style="background:#7BE39B"></div>
      <p class="sm" style="color:#FFFFFF">Vente <span style="font-weight:500">samedi 17 oct., 10h – 12h30</span></p>
    </div>
    {icon('phone', 16, '#FFFFFF')}
  </div>
</div>'''

def m_header(active=None, menu_open=False):
    cta = '' if menu_open else f'<div class="chip {"chip-green" if active != "produits" else ""}" style="height:36px; padding:0 12px; font-size:14px; {"background:#111111; color:#FFFFFF;" if active == "produits" else ""}">Produits</div>'
    burger = icon('close' if menu_open else 'menu', 22, '#111111')
    return f'''
<div class="wrap" style="height:64px; justify-content:center; border-bottom:1px solid #ECE6D8;">
  <div class="row" style="justify-content:space-between; align-items:center;">
    <img src="{svg_uri(LOGO_SVG)}" style="width:140px; height:23px;" alt="Au Grand Jardin">
    <div class="row" style="gap:8px; align-items:center;">
      {cta}
      <div style="width:40px; height:40px; border-radius:8px; border:1px solid #D9D2C1; display:flex; align-items:center; justify-content:center;">{burger}</div>
    </div>
  </div>
</div>'''

def m_footer():
    lien = lambda t: f'<p style="color:#FFFFFF; font-size:15px; line-height:22px;">{t}</p>'
    bloc = lambda title, items: (f'<div class="col" style="gap:12px; width:{HALF}px;"><p class="sm" style="color:rgba(255,255,255,0.5)">{title}</p>'
                                 + ''.join(lien(i) for i in items) + '</div>')
    return f'''
<div class="wrap" style="background:#111111; border-radius:20px 20px 0 0; padding-top:48px; padding-bottom:28px; gap:40px;">
  <div class="col" style="gap:18px;">
    <img src="{svg_uri(LOGO_WHITE)}" style="width:176px; height:29px;" alt="Au Grand Jardin">
    <p style="color:rgba(255,255,255,0.72);">Ferme maraîchère bio à Lostroff, en Moselle. Semences paysannes, variétés anciennes, partenaires à moins de 50 km.</p>
    <div class="row" style="gap:10px; align-items:center;">{icon('facebook', 18, '#FFFFFF')}<p class="sm" style="color:#FFFFFF">Suivez la ferme sur Facebook</p></div>
  </div>
  <div class="row" style="gap:16px;">
    {bloc('Le site', ['Produits de la semaine', 'La ferme', 'Pommes de terre', 'Professionnels', 'Horaires & contact'])}
    {bloc('Venir à la ferme', ['Samedi 10h – 12h30', '43 rue Principale', '57670 Lostroff', 'Itinéraire'])}
  </div>
  <div class="col" style="gap:12px;"><p class="sm" style="color:rgba(255,255,255,0.5)">Contact</p>{lien('Pierre Fouquet · 06 42 42 42 93')}{lien('pierre@augrandjardin.fr')}</div>
  <div class="line" style="background:rgba(255,255,255,0.12)"></div>
  <div class="col" style="gap:8px;">
    <p class="sm" style="color:rgba(255,255,255,0.5)">© 2026 Au Grand Jardin · Liste et horaires mis à jour le vendredi 16 octobre</p>
    <div class="row" style="gap:20px;"><p class="sm" style="color:rgba(255,255,255,0.5)">Mentions légales</p><p class="sm" style="color:rgba(255,255,255,0.5)">Design Thomas Bonometti</p></div>
  </div>
</div>'''

def m_page(pid, name, body, active=None):
    return f'<div class="page m" id="m-{pid}" data-name="{name}">{m_topbar()}{m_header(active)}{body}{m_footer()}</div>'

def btns(*items):
    return f'<div class="col" style="gap:10px;">{"".join(items)}</div>'

def btn(label, kind='primary', ic=None, ic_color=None):
    i = icon(ic, 18, ic_color or ('#FFFFFF' if kind in ('primary', 'dark') else '#111111')) if ic else ''
    return f'<div class="btn btn-{kind} full">{i}{label}</div>'

def m_stat(value, label, w=HALF):
    return (f'<div class="col" style="gap:4px; width:{w}px;"><p class="display" style="font-size:32px; line-height:40px; letter-spacing:-0.03em; color:#111111;">{value}</p>'
            f'<p class="sm muted">{label}</p></div>')

def m_soft(value, label):
    return (f'<div class="col" style="width:{HALF}px; height:150px; border-radius:12px; background:#F0E7D1; padding:16px; justify-content:space-between;">'
            f'<p class="display" style="font-size:32px; line-height:40px; letter-spacing:-0.03em; color:#111111;">{value}</p>'
            f'<p class="sm" style="color:#333333;">{label}</p></div>')

def m_section_head(eyebrow, title, sub=None):
    s = f'<p class="muted">{sub}</p>' if sub else ''
    return f'<div class="col" style="gap:14px;"><p class="eyebrow">{eyebrow}</p><h2>{title}</h2>{s}</div>'

def m_product_card(p, w=HALF):
    badges = ''
    if p['nouveau']: badges += '<div class="chip chip-leaf" style="height:26px; font-size:12px; padding:0 8px;">Nouveau</div>'
    if p['quantiteLimitee']: badges += '<div class="chip chip-white" style="height:26px; font-size:12px; padding:0 8px;">Quantité limitée</div>'
    if p['img']:
        visual = f'<img class="card-img" src="{img(p["img"], w, w, scale=2)}" style="width:{w}px; height:{w}px;">'
    else:
        visual = (f'<div class="card-img" style="width:{w}px; height:{w}px; background:#F0E7D1; display:flex; align-items:center; justify-content:center;">'
                  f'<p class="display" style="font-size:56px; line-height:64px; color:#C9B98F;">{p["nom"][0]}</p></div>')
    bio = 'Non certifié bio' if p['pasBio'] else 'Bio'
    price = (f'<div class="row" style="gap:6px; align-items:baseline;"><p class="display" style="font-size:20px; line-height:26px; letter-spacing:-0.02em; color:#111111;">{euro(p["prix"])}</p>'
             f'<p class="sm muted">{p["unite"]}</p></div>') if p['prix'] is not None else ''
    return f'''
<div class="col" style="width:{w}px; gap:10px;">
  <div style="position:relative; width:{w}px; height:{w}px;">
    {visual}
    <div class="col" style="position:absolute; left:8px; top:8px; gap:4px; align-items:flex-start;">{badges}</div>
  </div>
  <div class="col" style="gap:2px;">
    <p style="font-size:15px; line-height:22px; color:#111111;">{p["nom"]}</p>
    {price}
    <p class="sm muted">{bio}</p>
  </div>
</div>'''

def grid2(cards, gap_y=28):
    rows = [cards[i:i + 2] for i in range(0, len(cards), 2)]
    return f'<div class="col" style="gap:{gap_y}px;">' + ''.join(f'<div class="row" style="gap:16px;">{"".join(r)}</div>' for r in rows) + '</div>'

def field(label, ph, h=52):
    extra = 'height:96px; align-items:flex-start; padding-top:14px;' if h > 52 else ''
    return f'<div class="col" style="gap:8px;"><label class="lab">{label}</label><div class="field placeholder" style="{extra}">{ph}</div></div>'

# ---------------------------------------------------------------- ACCUEIL
def m_home():
    nb = len(produits)
    vedettes = [by_name('Poireau'), by_name('Haricot vert'), by_name('Tomate Cerise'), by_name('Chou Kale')]
    def overlay(p):
        return f'''
<div style="position:relative; width:260px; height:340px; flex-shrink:0;">
  <img class="card-img" src="{img(p['img'], 260, 340, scale=2)}" style="width:260px; height:340px;">
  <div style="position:absolute; left:0; top:0; width:260px; height:340px; border-radius:12px; background:linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.62) 100%);"></div>
  <div class="row" style="position:absolute; left:14px; top:14px;">{'<div class="chip chip-leaf">Nouveau</div>' if p['nouveau'] else ''}</div>
  <div class="col" style="position:absolute; left:16px; bottom:16px; gap:2px; width:228px;">
    <p style="font-size:18px; line-height:26px; color:#FFFFFF;">{p['nom']}</p>
    <p style="color:rgba(255,255,255,0.85);">{euro(p['prix'])} · {p['unite']}</p>
  </div>
</div>'''
    def way(photo, title, text, focus=(0.5, 0.5)):
        return f'''
<div class="row" style="gap:14px; align-items:center; padding:16px 0; border-bottom:1px solid #E3DCCB;">
  <img class="card-img" src="{img(photo, 88, 88, focus, scale=2)}" style="width:88px; height:88px;">
  <div class="col" style="gap:4px; width:216px;"><p style="font-size:18px; line-height:26px; color:#111111;">{title}</p><p class="sm muted">{text}</p></div>
  {icon('chevron', 20, '#111111')}
</div>'''
    body = f'''
<div class="wrap" style="padding-top:36px; padding-bottom:36px; gap:24px;">
  <div class="row" style="gap:10px; align-items:center;"><div class="dot"></div><p class="eyebrow">Maraîcher bio · Lostroff</p></div>
  <h1>Des légumes bio cueillis à Lostroff pour la vente du samedi</h1>
  <p class="lg muted">Semences paysannes, variétés anciennes, aucun produit chimique. Chaque semaine, Pierre publie ici ce qui est prêt à la récolte.</p>
  {btns(btn(f'Voir les {nb} produits de la semaine'), btn('Venir à la ferme', 'secondary', 'pin'))}
  <div class="col" style="gap:20px; padding-top:12px;">
    <div class="row" style="gap:16px;">{m_stat(str(nb), 'produits cette semaine')}{m_stat('Sam. 10h', 'prochaine vente, à la ferme')}</div>
    <div class="row" style="gap:16px;">{m_stat('100 %', 'légumes bio')}{m_stat('50 km', 'au plus pour nos partenaires')}</div>
  </div>
</div>
<img src="{img(P['semis'], 390, 300, (0.3, 0.55), scale=2)}" style="width:390px; height:300px; display:block;">

<div class="wrap" style="padding-top:64px; padding-bottom:64px; gap:28px;">
  <div class="row" style="justify-content:space-between; align-items:center;">
    <p class="eyebrow">La ferme Au Grand Jardin</p>
    <img src="{svg_uri(TAMPON)}" style="width:56px; height:68px; opacity:0.9;" alt="">
  </div>
  <p class="display" style="font-size:24px; line-height:32px; letter-spacing:-0.02em; color:#111111;">Pierre cultive en permaculture : pas de labour, de la paille plutôt que du désherbant, des fleurs pour les pollinisateurs. <span style="color:#8A867D;">Ce qui pousse ici dépend de la saison, et c’est exactement ce que vous trouvez le samedi.</span></p>
  <div class="col" style="gap:16px;">
    <div class="row" style="gap:16px;">{m_soft('0', 'produit chimique sur l’exploitation')}{m_soft('100 %', 'semences paysannes et variétés anciennes')}</div>
    <div class="row" style="gap:16px;">{m_soft('50 km', 'au plus pour nos partenaires bio')}{m_soft('Label', 'Maraîchage Sol Vivant')}</div>
  </div>
  {btn('Découvrir la ferme', 'secondary', 'right')}
</div>

<div class="col on-dark" style="background:#0C4B31; padding-top:64px; padding-bottom:64px; gap:28px; width:390px;">
  <div class="wrap" style="gap:14px;">
    <p class="eyebrow">Cette semaine à la ferme</p>
    <h2>Ce qui est prêt pour samedi</h2>
    <div class="row" style="gap:8px; align-items:center;"><div class="dot" style="background:#7BE39B"></div><p class="sm muted">Mise à jour vendredi 16 octobre, 16h24</p></div>
  </div>
  <div class="scroller">{''.join(overlay(p) for p in vedettes)}</div>
  <div class="wrap" style="gap:20px;">
    <p class="muted">Et {nb - 4} autres produits : courges, radis noir, betteraves, aromates, jus de pomme de la ferme et conserves. Prix TTC, vente à la ferme.</p>
    {btn('Voir toute la liste', 'white')}
  </div>
</div>

<div class="wrap" style="padding-top:64px; padding-bottom:64px; gap:20px;">
  {m_section_head('À la ferme et au-delà', 'Quatre façons de manger nos légumes')}
  <div class="col" style="border-top:1px solid #E3DCCB;">
    {way(P['stand'], 'Vente à la ferme', 'Tous les samedis, 10h – 12h30, à Lostroff.', (0.5, 0.6))}
    {way(P['pdt'], 'Pommes de terre en sacs', 'Réservations ouvertes jusqu’au 15 novembre.')}
    {way(P['tunnels_champ'], 'Commande par SMS', 'La liste chaque semaine, du 15 avril au 15 novembre.')}
    {way(P['toque'], 'Restaurants et épiceries', 'Livraison hebdomadaire, grille tarifaire pro.')}
  </div>
</div>

<div class="wrap" style="padding-bottom:64px;">
  <div class="col" style="gap:20px; background:#F0E7D1; border-radius:16px; padding:12px 12px 24px;">
    <img class="card-img" src="{img(P['tunnel'], 326, 220, (0.45, 0.5), scale=2)}" style="width:326px; height:220px;">
    <div class="col" style="gap:16px; padding:0 8px;">
      <div class="row" style="gap:8px; align-items:center;">{icon('clock', 16, '#111111')}<p class="eyebrow">Venir à la ferme</p></div>
      <p class="display" style="font-size:30px; line-height:36px; letter-spacing:-0.03em; color:#111111;">Samedi 17 octobre<br>de 10h à 12h30</p>
      <div class="col" style="gap:4px;"><p style="font-size:18px; line-height:26px; color:#111111;">43 rue Principale, 57670 Lostroff</p><p class="sm muted">Horaires mis à jour ici chaque semaine, avec la liste des produits.</p></div>
      <div class="col" style="gap:10px;"><div class="btn btn-primary" style="width:310px;">{icon('pin', 18, '#FFFFFF')}Itinéraire</div><div class="btn btn-secondary" style="width:310px;">{icon('phone', 18, '#111111')}06 42 42 42 93</div></div>
    </div>
  </div>
</div>

<div style="position:relative; width:390px; height:560px;">
  <img src="{img(P['echange'], 390, 560, (0.62, 0.45), scale=2)}" style="width:390px; height:560px; display:block;">
  <div style="position:absolute; left:0; top:0; width:390px; height:560px; background:linear-gradient(180deg, rgba(12,30,22,0.05) 0%, rgba(12,30,22,0.55) 38%, rgba(12,30,22,0.92) 100%);"></div>
  <div class="col on-dark" style="position:absolute; left:20px; bottom:32px; gap:16px; width:350px;">
    <p class="eyebrow">Chaque semaine, un seul SMS</p>
    <h2>La liste des légumes, directement sur votre téléphone</h2>
    <p class="muted">Du 15 avril au 15 novembre, recevez la liste et réservez votre panier en répondant au message.</p>
    <div class="field placeholder full">Votre numéro de portable</div>
    {btn('M’inscrire', 'white')}
  </div>
</div>'''
    return m_page('accueil', 'Accueil', body)

# ---------------------------------------------------------------- PRODUITS
def m_produits():
    nb = len(produits)
    nb_lim = len([p for p in produits if p['quantiteLimitee']])
    pills = f'<div class="chip chip-green" style="height:38px; padding:0 14px; font-size:14px; flex-shrink:0;">Tout <span style="opacity:0.7">&nbsp;{nb}</span></div>'
    pills += ''.join(f'<div class="chip chip-outline" style="height:38px; padding:0 14px; font-size:14px; flex-shrink:0;">{titre_rayon(r)} <span style="color:#8A867D">&nbsp;{len(items)}</span></div>' for r, items in rayons)
    groups = ''.join(f'''
<div class="col" style="gap:18px; padding-top:40px;">
  <div class="row" style="gap:10px; align-items:baseline;"><h3 style="font-size:24px; line-height:30px;">{titre_rayon(r)}</h3><p class="sm muted">{len(items)} produit{"s" if len(items) > 1 else ""}</p></div>
  {grid2([m_product_card(p) for p in items])}
</div>''' for r, items in rayons)
    body = f'''
<div class="wrap" style="padding-top:32px; padding-bottom:24px; gap:18px;">
  <div class="row" style="gap:8px; align-items:center;"><div class="dot"></div><p class="eyebrow">Mis à jour ven. 16 oct., 16h24</p></div>
  <h1>Produits de la semaine</h1>
  <p class="muted">{nb} produits à venir chercher à la ferme samedi. Prix TTC. Ceux marqués « Quantité limitée » partent vite : venez tôt.</p>
  <div class="col" style="gap:8px; align-items:flex-start;">
    <div class="chip chip-outline" style="height:36px; font-size:14px;">{icon('clock', 16, '#111111')}Samedi 17 octobre, 10h – 12h30</div>
    <div class="chip" style="height:36px; font-size:14px;">{nb_lim} produits en quantité limitée</div>
  </div>
</div>
<div class="scroller" style="padding-top:12px; padding-bottom:12px; gap:8px; border-top:1px solid #ECE6D8; border-bottom:1px solid #ECE6D8;">{pills}</div>
<div class="wrap" style="padding-bottom:64px;">{groups}</div>
<div class="wrap" style="padding-bottom:64px;">
  <div class="col" style="gap:14px; background:#F0E7D1; border-radius:16px; padding:24px;">
    <h3 style="font-size:24px; line-height:30px;">Recevez la liste chaque semaine par SMS</h3>
    <p class="sm muted">Vous répondez au SMS avec votre panier et on le met de côté pour samedi. Du 15 avril au 15 novembre.</p>
    <div class="field placeholder" style="width:302px;">Votre numéro de portable</div>
    <div class="btn btn-primary" style="width:302px;">M’inscrire</div>
  </div>
</div>'''
    return m_page('produits', 'Produits de la semaine', body, 'produits')

# ---------------------------------------------------------------- LA FERME
def m_ferme():
    def valeur(ic, title, text):
        return f'<div class="col" style="gap:10px; padding-top:20px; border-top:1px solid #D9D2C1;">{icon(ic, 26, "#0C4B31")}<h3>{title}</h3><p class="muted">{text}</p></div>'
    def partenaire(photo, nom, activite, ville, focus=(0.5, 0.5)):
        return f'''<div class="col" style="width:280px; gap:12px; flex-shrink:0;">
  <img class="card-img" src="{img(photo, 280, 210, focus, scale=2)}" style="width:280px; height:210px;">
  <div class="col" style="gap:4px;"><h3>{nom}</h3><p class="sm muted">{activite}</p></div>
  <div class="row"><div class="chip">{icon('pin', 14, '#111111')}{ville}</div></div></div>'''
    def ligne(nom, ville):
        return f'<div class="col" style="gap:2px; padding:14px 0; border-bottom:1px solid #E3DCCB;"><p style="color:#111111;">{nom}</p><p class="sm muted">{ville}</p></div>'
    restos = [('Hôtel Notre-Dame de Bonne Fontaine', 'Danne-et-Quatre-Vents'), ('La Licorne Bleue', 'Fénétrange'), ('La Toque Blanche', 'Bénestroff'), ('Ô Fredelices, pâtissier traiteur', 'Liocourt')]
    points = [('Inventerre du Pré Vert', 'Dieuze'), ('La Ruche qui dit Oui', 'Dieuze'), ('Marché de Bénestroff', 'Bénestroff'), ('Marché des producteurs', 'Château-Salins'), ('Supermarché Match', 'Dieuze'), ('Supérette Proxi', 'Fénétrange')]
    illu = f'<img src="{B.png_uri(ILLU)}" style="width:{C}px; height:219px; object-fit:contain;">' if ILLU.exists() else ''
    body = f'''
<div class="wrap" style="padding-top:20px; padding-bottom:64px; gap:28px;">
  <img class="card-img" src="{img(P['pierre'], C, 400, (0.55, 0.35), scale=2)}" style="width:{C}px; height:400px;">
  <div class="col" style="gap:18px;">
    <p class="eyebrow">La ferme</p>
    <h1 style="font-size:32px; line-height:38px;">Pierre Fouquet, maraîcher bio à Lostroff</h1>
    <p class="lg muted">Au Grand Jardin, on a fait le choix d’une agriculture qui respecte la terre et la biodiversité : un paillage plutôt qu’un labour, des fleurs pour les pollinisateurs, aucun produit chimique.</p>
    <p class="muted">Chaque samedi, la récolte de la semaine est en vente à la ferme, avec les produits de nos partenaires bio et le pain d’Aux Gourmandises de Thomas.</p>
  </div>
  {btns(btn('Voir les produits de la semaine'), btn('Venir samedi', 'secondary', 'pin'))}
</div>

<div class="wrap" style="padding-bottom:64px; gap:28px;">
  {m_section_head('Nos engagements', 'Ce qui pousse ici, et comment')}
  <div class="col" style="gap:28px;">
    {valeur('sprout', 'Des produits bio et de qualité', 'Aucun produit chimique, aucune semence hybride F1 : uniquement des semences paysannes et des variétés anciennes.')}
    {valeur('pin', 'Une production et des partenaires locaux', 'Tous nos fruits et légumes bio sont cultivés à Lostroff. Nos partenaires, bio eux aussi, sont à moins de 50 km.')}
    {valeur('check', 'Des engagements pour la terre', 'Paillage, sol couvert, haies et fleurs pour la biodiversité.')}
  </div>
</div>

<div class="scroller" style="padding-bottom:64px; gap:8px;">
  <img class="card-img" src="{img(P['tunnel'], 300, 280, scale=2)}" style="width:300px; height:280px; flex-shrink:0;">
  <img class="card-img" src="{img(P['aerien'], 300, 280, scale=2)}" style="width:300px; height:280px; flex-shrink:0;">
  <img class="card-img" src="{img(P['semis'], 300, 280, (0.15, 0.6), scale=2)}" style="width:300px; height:280px; flex-shrink:0;">
</div>

<div class="wrap" style="background:#F0E7D1; padding-top:56px; padding-bottom:56px; gap:28px;">
  {illu}
  <div class="col" style="gap:14px;">
    <p class="eyebrow">Notre démarche</p>
    <h2>Maraîchage Sol Vivant</h2>
    <p class="muted">La ferme s’inscrit dans la démarche Maraîchage Sol Vivant : on cultive sans retourner la terre, on la couvre de paille et de matière organique, pour garder un sol vivant et fertile d’une saison à l’autre.</p>
  </div>
</div>

<div class="col" style="padding-top:64px; padding-bottom:64px; gap:28px; width:390px;">
  <div class="wrap">{m_section_head('Partenaires', 'Nos partenaires, tous à moins de 50 km', 'Leurs produits sont en vente à la ferme le samedi.')}</div>
  <div class="scroller" style="gap:12px;">
    {partenaire(P['oeufs'], 'Ferme de la Briquerie', 'Œufs', 'Azoudange')}
    {partenaire(P['champignons'], 'Frui’Thierry', 'Champignons, fraises, framboises, pommes et poires', 'Niederstinzel')}
    {partenaire(P['ruches'], 'Joël Corre', 'Miel', 'Francaltroff')}
  </div>
  <div class="wrap" style="gap:36px; padding-top:8px;">
    <div class="col"><p class="eyebrow" style="padding-bottom:4px;">Ils cuisinent nos légumes</p>{''.join(ligne(n, v) for n, v in restos)}</div>
    <div class="col"><p class="eyebrow" style="padding-bottom:4px;">Où trouver nos produits</p>{''.join(ligne(n, v) for n, v in points)}</div>
  </div>
</div>'''
    return m_page('ferme', 'La ferme', body, 'ferme')

# ---------------------------------------------------------------- POMMES DE TERRE
def m_pdt():
    sacs = {s['id']: s for s in pdt['sacs']}
    choix = {('Agria', '25'): 1, ('Ditta', '15'): 2}
    def stepper(n, disabled=False):
        op = 'opacity:0.35;' if disabled else ''
        return f'''<div class="row" style="align-items:center; justify-content:space-between; width:{HALF}px; height:44px; border:1px solid #D9D2C1; border-radius:8px; background:#FFFFFF; {op}">
  <div style="width:44px; height:42px; display:flex; align-items:center; justify-content:center;">{icon('minus', 16, '#111111')}</div>
  <p style="text-align:center; color:#111111; font-size:16px;">{n}</p>
  <div style="width:44px; height:42px; display:flex; align-items:center; justify-content:center;">{icon('plus', 16, '#111111')}</div></div>'''
    rows = ''
    for v in pdt['varietes']:
        out = v['stockKg'] <= 0
        tag = ('<div class="chip" style="background:#E3DCCB; color:#565656; height:26px; font-size:12px; padding:0 8px;">Épuisée</div>' if out else
               f'<div class="chip" style="background:#FBE3D3; color:#9A3F12; height:26px; font-size:12px; padding:0 8px;">Plus que {v["stockKg"]} kg</div>' if v['stockKg'] < 150 else '')
        steppers = ''.join(f'<div class="col" style="gap:6px;"><p class="sm muted">{s["libelle"].replace("Sac de ", "Sac ")}</p>{stepper(choix.get((v["nom"], sid), 0), out)}</div>' for sid, s in sacs.items())
        rows += f'''<div class="col" style="gap:12px; padding:18px 0; border-bottom:1px solid #E3DCCB; {"opacity:0.6;" if out else ""}">
  <div class="col" style="gap:2px;">
    <div class="row" style="gap:8px; align-items:center;"><p style="font-size:18px; line-height:26px; color:#111111;">{v["nom"]}</p>{tag}</div>
    <p class="sm muted">{v["chair"].capitalize()} · {v["usages"]}</p>
  </div>
  <div class="row" style="gap:16px;">{steppers}</div>
</div>'''
    o = pdt['oignons'][0]
    rows += f'''<div class="col" style="gap:12px; padding:18px 0;">
  <div class="col" style="gap:2px;"><p style="font-size:18px; line-height:26px; color:#111111;">Oignons jaunes</p><p class="sm muted">Sac de 5 kg · {euro(o["prix"])}</p></div>
  <div class="row" style="gap:16px;"><div class="col" style="gap:6px;"><p class="sm muted">Sac 5 kg</p>{stepper(1)}</div></div>
</div>'''
    def step(n, title, text):
        return f'''<div class="row" style="gap:14px; align-items:flex-start;">
  <div style="width:36px; height:36px; border-radius:18px; background:#0C4B31; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><p style="color:#FFFFFF; font-size:16px;">{n}</p></div>
  <div class="col" style="gap:4px; width:300px;"><p style="font-size:18px; line-height:26px; color:#111111;">{title}</p><p class="sm muted">{text}</p></div></div>'''
    lignes = [('1 × sac 25 kg · Agria', 45.0), ('2 × sacs 15 kg · Ditta', 57.0), ('1 × oignons jaunes 5 kg', 14.5)]
    recap = ''.join(f'<div class="row" style="justify-content:space-between;"><p style="color:#111111;">{l}</p><p style="color:#111111;">{euro(m)}</p></div>' for l, m in lignes)
    prix = lambda a, b: f'<div class="col" style="gap:2px; padding:14px 16px; border-radius:12px; background:#F0E7D1; width:{HALF}px;"><p class="display" style="font-size:22px; line-height:30px; color:#111111;">{a}</p><p class="sm muted">{b}</p></div>'
    body = f'''
<div class="wrap" style="padding-top:32px; padding-bottom:48px; gap:20px;">
  <div class="row"><div class="chip chip-leaf">Réservations ouvertes jusqu’au 15 novembre</div></div>
  <h1 style="font-size:32px; line-height:38px;">Pommes de terre de garde, en sacs de 15 et 25&nbsp;kg</h1>
  <p class="lg muted">Cultivées sans traitement chimique à Lostroff. Choisissez vos variétés, on vous prévient quand vos sacs sont prêts.</p>
  <div class="row" style="gap:16px;">{prix('1,90 €/kg', 'sac 15 kg · 28,50 €')}{prix('1,80 €/kg', 'sac 25 kg · 45,00 €')}</div>
  <img class="card-img" src="{img(P['pdt'], C, 240, scale=1)}" style="width:{C}px; height:240px;">
</div>

<div class="wrap" style="padding-bottom:48px;">
  <div class="col" style="gap:20px; padding-top:28px; border-top:1px solid #D9D2C1;">
    {step(1, 'Vous réservez', 'Choisissez vos variétés et le nombre de sacs. Paiement sur place, au retrait.')}
    {step(2, 'On prépare vos sacs', 'Un e-mail, et un SMS si vous le souhaitez, dès que la commande est prête.')}
    {step(3, 'Vous passez à la ferme', 'Le jour de vente de votre choix, au 43 rue Principale à Lostroff.')}
  </div>
</div>

<div class="wrap" style="padding-bottom:48px; gap:8px;">
  <h2 style="font-size:26px; line-height:32px;">1. Vos sacs</h2>
  <p class="sm muted">7 variétés de la dernière récolte. Les stocks se mettent à jour à chaque réservation.</p>
  <div class="col" style="padding-top:4px;">{rows}</div>
</div>

<div class="wrap" style="padding-bottom:40px; gap:18px;">
  <h2 style="font-size:26px; line-height:32px;">2. Vos coordonnées</h2>
  {field('Prénom', 'Léa')}{field('Nom', 'Martin')}{field('E-mail', 'lea.martin@exemple.fr')}{field('Téléphone', '06 12 34 56 78')}
  <div class="row" style="gap:12px; align-items:flex-start;"><div style="width:22px; height:22px; border-radius:5px; background:#0C4B31; display:flex; align-items:center; justify-content:center; flex-shrink:0;">{icon('check', 16, '#FFFFFF', 2.4)}</div><p style="width:316px;">Me prévenir aussi par SMS quand ma commande est prête</p></div>
  {field('Commentaire (facultatif)', 'Un jour de retrait préféré, une question…', 96)}
</div>

<div class="wrap" style="padding-bottom:64px;">
  <div class="col" style="gap:16px; background:#F0E7D1; border-radius:16px; padding:24px;">
    <h3>Votre réservation</h3>
    <div class="col" style="gap:10px;">{recap}</div>
    <div class="line" style="background:#D9CDAE;"></div>
    <div class="row" style="justify-content:space-between; align-items:baseline;"><p style="color:#111111;">Total</p><p class="display" style="font-size:30px; line-height:36px; letter-spacing:-0.03em; color:#111111;">116,50 €</p></div>
    <p class="sm muted">55 kg de pommes de terre et 5 kg d’oignons</p>
    <div class="btn btn-primary" style="width:302px; height:56px;">Réserver</div>
    <p class="sm muted">Paiement sur place au retrait. 5 sacs maximum par réservation en ligne : pour plus, appelez la ferme.</p>
  </div>
</div>'''
    return m_page('pdt', 'Pommes de terre', body, 'pdt')

# ---------------------------------------------------------------- PROFESSIONNELS
def m_pros():
    clients = ['Hôtel Notre-Dame de Bonne Fontaine', 'La Licorne Bleue', 'La Toque Blanche', 'Ô Fredelices']
    def step(n, title, text):
        return f'<div class="col" style="gap:8px;"><p class="display" style="font-size:40px; line-height:48px; color:rgba(255,255,255,0.35);">0{n}</p><h3>{title}</h3><p class="muted">{text}</p></div>'
    body = f'''
<div class="wrap" style="padding-top:32px; padding-bottom:48px; gap:22px;">
  <p class="eyebrow">Restaurants · épiceries · collectivités</p>
  <h1 style="font-size:32px; line-height:38px;">Des légumes bio de Lostroff, livrés chaque semaine</h1>
  <p class="lg muted">Vous cuisinez local et de saison ? On vous propose une offre selon nos récoltes et vos besoins, avec une livraison hebdomadaire.</p>
  {btns(btn('Demander un accès'), btn('J’ai déjà un accès', 'secondary', 'lock'))}
  <div class="row" style="gap:12px; padding-top:8px;">{m_stat('48 h', 'pour vous répondre', 108)}{m_stat('32', 'produits cette semaine', 108)}{m_stat('4', 'restaurants partenaires', 108)}</div>
  <img class="card-img" src="{img(P['echange'], C, 300, (0.62, 0.45), scale=2)}" style="width:{C}px; height:300px;">
</div>

<div class="wrap" style="padding-bottom:48px;">
  <div class="col" style="gap:14px; padding-top:28px; border-top:1px solid #D9D2C1;">
    <p class="eyebrow">Ils cuisinent nos légumes</p>
    <div class="col" style="gap:8px; align-items:flex-start;">{''.join(f'<div class="chip chip-outline" style="height:44px; padding:0 16px; font-size:16px; color:#111111;">{c}</div>' for c in clients)}</div>
  </div>
</div>

<div class="wrap on-dark" style="background:#0C4B31; padding-top:56px; padding-bottom:56px; gap:32px;">
  {m_section_head('Comment ça marche', 'Trois étapes pour travailler ensemble')}
  {step(1, 'On fait connaissance', 'Vos volumes, vos jours de livraison, les produits qui comptent pour votre carte.')}
  {step(2, 'Vous recevez votre accès', 'La grille tarifaire pro, mise à jour chaque semaine avec ce qui est prêt à la récolte.')}
  {step(3, 'Vous commandez', 'Par téléphone ou message, avant le jour de récolte convenu. On livre.')}
</div>

<div class="wrap" style="padding-top:56px; padding-bottom:64px; gap:16px;">
  <div class="col" style="gap:18px; padding:24px; border-radius:16px; border:1px solid #E3DCCB; background:#FFFFFF;">
    <h3 style="font-size:24px; line-height:30px;">Demander un accès</h3>
    <p class="sm muted">Pierre vous rappelle sous 48 h pour parler de vos besoins.</p>
    {field('Votre nom', 'Camille Durand')}{field('Établissement', 'Restaurant, épicerie…')}{field('Téléphone', '06 12 34 56 78')}{field('E-mail', 'contact@etablissement.fr')}
    {field('Vos besoins', 'Volumes, jours de livraison, produits…', 96)}
    <div class="btn btn-primary" style="width:300px;">Envoyer la demande</div>
  </div>
  <div class="col" style="gap:16px; padding:24px; border-radius:16px; background:#F0E7D1;">
    {icon('lock', 26, '#0C4B31')}
    <h3 style="font-size:24px; line-height:30px;">Déjà client ?</h3>
    <p class="sm muted">Entrez le mot de passe reçu pour consulter la grille tarifaire de la semaine.</p>
    {field('Mot de passe', '••••••••')}
    <div class="btn btn-dark" style="width:302px;">Voir la grille tarifaire</div>
  </div>
</div>'''
    return m_page('pros', 'Professionnels', body, 'pros')

# ---------------------------------------------------------------- ESPACE PRO
def m_tarifs():
    ht = lambda x: round(x / 1.055, 2)
    def row(p):
        dispo = ('<div class="chip" style="background:#FBE3D3; color:#9A3F12; height:24px; font-size:12px; padding:0 8px;">Quantité limitée</div>' if p['quantiteLimitee'] else
                 '<div class="chip chip-leaf" style="height:24px; font-size:12px; padding:0 8px;">Nouveau</div>' if p['nouveau'] else '')
        return f'''<div class="row" style="justify-content:space-between; align-items:flex-start; padding:14px 16px; border-top:1px solid #ECE6D8; background:#FFFFFF;">
  <div class="col" style="gap:4px; width:200px; align-items:flex-start;"><p style="color:#111111;">{p["nom"]}</p><p class="sm muted">{p["unite"] or "—"}</p>{dispo}</div>
  <div class="col" style="gap:2px; align-items:flex-end;"><p class="display" style="font-size:18px; line-height:26px; color:#111111;">{euro(ht(p["prix"])) if p["prix"] is not None else "—"}</p><p class="sm muted">{euro(p["prix"]) + " TTC" if p["prix"] is not None else ""}</p></div>
</div>'''
    table = ''
    for r, items in rayons:
        table += f'<div class="row" style="justify-content:space-between; padding:10px 16px; background:#F0E7D1; border-top:1px solid #E3DCCB;"><p style="color:#111111;">{titre_rayon(r)}</p><p class="sm muted">Prix HT</p></div>'
        table += ''.join(row(p) for p in items)
    body = f'''
<div class="wrap" style="padding-top:28px; padding-bottom:28px; gap:18px;">
  <div class="row"><div class="chip chip-green">{icon('lock', 14, '#FFFFFF')}Espace professionnels</div></div>
  <h1 style="font-size:32px; line-height:38px;">Grille tarifaire de la semaine</h1>
  <p class="muted">Prix hors taxes, TVA 5,5 %. Mis à jour vendredi 16 octobre à 16h24. Commandez par téléphone ou message avant le jour de récolte convenu.</p>
  {btns(btn('Commander : 06 42 42 42 93', 'primary', 'phone'), btn('Télécharger en PDF', 'secondary', 'download'))}
</div>
<div class="wrap" style="padding-bottom:64px;">
  <div class="col" style="border:1px solid #E3DCCB; border-radius:16px; overflow:hidden;">{table}</div>
</div>'''
    return m_page('tarifs', 'Espace pro — grille tarifaire', body, 'pros')

# ---------------------------------------------------------------- HORAIRES & CONTACT
def m_contact():
    def creneau(jour, heure, lieu, actif):
        etat = '<div class="chip chip-leaf" style="height:26px; font-size:12px; padding:0 8px;">Cette semaine</div>' if actif else '<p class="sm muted">Pas cette semaine</p>'
        return f'''<div class="col" style="gap:4px; padding:16px 0; border-bottom:1px solid #E3DCCB; {"" if actif else "opacity:0.55;"}">
  <div class="row" style="justify-content:space-between; align-items:center;"><p style="font-size:18px; line-height:26px; color:#111111;">{jour} · {heure}</p>{etat}</div><p class="sm muted">{lieu}</p></div>'''
    mapsvg = '''<svg width="350" height="260" viewBox="0 0 350 260" xmlns="http://www.w3.org/2000/svg">
<rect width="350" height="260" fill="#EFE9DA"/>
<path d="M0 170 C 80 160 120 190 180 172 S 290 140 350 155" stroke="#FFFFFF" stroke-width="12" fill="none"/>
<path d="M168 0 C 160 70 190 120 180 172 S 165 230 172 260" stroke="#FFFFFF" stroke-width="8" fill="none"/>
<rect x="215" y="30" width="110" height="70" rx="8" fill="#DCE6C8"/><rect x="20" y="200" width="120" height="50" rx="8" fill="#D3DFBC"/>
<rect x="230" y="190" width="100" height="56" rx="8" fill="#DCE6C8"/>
<circle cx="180" cy="166" r="26" fill="#0C4B31" opacity="0.15"/><circle cx="180" cy="166" r="11" fill="#0C4B31"/><circle cx="180" cy="166" r="4" fill="#FFFFFF"/>
</svg>'''
    contact = lambda ic, t, v, d: f'<div class="row" style="gap:14px; align-items:center; padding:18px; border-radius:14px; background:#F0E7D1;">{icon(ic, 24, "#0C4B31")}<div class="col" style="gap:2px;"><p class="sm muted">{t}</p><p style="font-size:18px; line-height:26px; color:#111111;">{v}</p><p class="sm muted">{d}</p></div></div>'
    body = f'''
<div class="wrap" style="padding-top:32px; padding-bottom:32px; gap:16px;">
  <p class="eyebrow">Horaires & contact</p>
  <h1>Venir à la ferme</h1>
  <p class="muted">Les ventes ont lieu à la ferme, au 43 rue Principale à Lostroff. Les créneaux changent selon la saison et les marchés : ils sont mis à jour ici chaque semaine.</p>
</div>
<div class="wrap" style="padding-bottom:32px; gap:16px;">
  <div class="col on-dark" style="gap:20px; padding:24px; border-radius:16px; background:#0C4B31;">
    <div class="row" style="gap:8px; align-items:center;"><div class="dot" style="background:#7BE39B"></div><p class="eyebrow">Prochaine vente</p></div>
    <div class="col" style="gap:2px;">
      <p class="display" style="font-size:32px; line-height:38px; letter-spacing:-0.03em; color:#FFFFFF;">Samedi 17 octobre</p>
      <p class="display" style="font-size:32px; line-height:38px; letter-spacing:-0.03em; color:#7BE39B;">10h – 12h30</p>
    </div>
    <p class="muted">À la ferme, 43 rue Principale, 57670 Lostroff</p>
    <div class="col" style="gap:10px;"><div class="btn btn-white" style="width:302px;">{icon('pin', 18, '#111111')}Itinéraire</div><div class="btn" style="width:302px; border:1px solid rgba(255,255,255,0.35); color:#FFFFFF;">{icon('phone', 18, '#FFFFFF')}Appeler la ferme</div></div>
  </div>
  <div class="col" style="padding:4px 20px 8px; border-radius:16px; background:#FFFFFF; border:1px solid #E3DCCB;">
    <p class="eyebrow" style="padding-top:18px; padding-bottom:2px;">Les rendez-vous de la ferme</p>
    {creneau('Samedi', '10h – 12h30', 'Vente à la ferme, Lostroff', True)}
    {creneau('Mercredi', '17h – 19h', 'Vente à la ferme, Lostroff', False)}
    {creneau('Dimanche', '8h – 12h', 'Marché des producteurs, Bénestroff', False)}
  </div>
</div>
<div class="wrap" style="padding-bottom:32px;">
  <div class="col" style="border-radius:16px; overflow:hidden; border:1px solid #E3DCCB; background:#FFFFFF;">
    <img src="{svg_uri(mapsvg)}" style="width:348px; height:258px;">
    <div class="row" style="justify-content:space-between; align-items:center; padding:16px 18px;">
      <div class="col" style="gap:2px;"><p style="color:#111111;">Au Grand Jardin</p><p class="sm muted">43 rue Principale, 57670 Lostroff</p></div>
      <p class="sm" style="color:#0C4B31;">Maps →</p>
    </div>
  </div>
</div>
<div class="wrap" style="padding-bottom:64px; gap:12px;">
  {contact('phone', 'Téléphone', '06 42 42 42 93', 'Pierre Fouquet')}
  {contact('mail', 'E-mail', 'pierre@augrandjardin.fr', 'Réponse sous 48 h')}
  {contact('facebook', 'Facebook', 'Au Grand Jardin', 'Les annonces de la semaine')}
</div>'''
    return m_page('contact', 'Horaires & contact', body, 'contact')

# ---------------------------------------------------------------- MENU OUVERT
def m_menu():
    items = [('Produits de la semaine', True), ('La ferme', False), ('Pommes de terre', False), ('Professionnels', False), ('Horaires & contact', False)]
    links = ''.join(f'''<div class="row" style="justify-content:space-between; align-items:center; padding:18px 0; border-bottom:1px solid #E3DCCB;">
  <p class="display" style="font-size:26px; line-height:32px; letter-spacing:-0.02em; color:#111111;">{t}</p>{'<div class="chip chip-leaf" style="height:26px; font-size:12px; padding:0 8px;">32 produits</div>' if badge else icon('chevron', 20, '#111111')}</div>''' for t, badge in items)
    body = f'''
<div class="wrap" style="padding-top:12px; padding-bottom:28px; gap:28px; min-height:740px;">
  <div class="col">{links}</div>
  <div class="col" style="gap:14px; padding:20px; border-radius:16px; background:#F0E7D1;">
    <div class="row" style="gap:8px; align-items:center;"><div class="dot"></div><p class="eyebrow">Prochaine vente</p></div>
    <p class="display" style="font-size:24px; line-height:30px; letter-spacing:-0.02em; color:#111111;">Samedi 17 octobre<br>10h – 12h30</p>
    <p class="sm muted">43 rue Principale, 57670 Lostroff</p>
    <div class="row" style="gap:10px;"><div class="btn btn-primary" style="width:150px;">{icon('pin', 18, '#FFFFFF')}Itinéraire</div><div class="btn btn-secondary" style="width:150px;">{icon('phone', 18, '#111111')}Appeler</div></div>
  </div>
  <div class="row" style="gap:10px; align-items:center;">{icon('facebook', 18, '#111111')}<p class="sm">Suivez la ferme sur Facebook</p></div>
</div>'''
    return f'<div class="page m" id="m-menu" data-name="Menu ouvert">{m_topbar()}{m_header(None, True)}{body}</div>'

SCREENS = {'menu': m_menu, 'accueil': m_home, 'produits': m_produits, 'ferme': m_ferme, 'pdt': m_pdt, 'pros': m_pros, 'tarifs': m_tarifs, 'contact': m_contact}

if __name__ == '__main__':
    which = sys.argv[1:] or list(SCREENS)
    html = f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Au Grand Jardin — maquettes mobiles</title>
<style>{B.CSS}{CSS_M}</style></head><body>{''.join(SCREENS[w]() for w in which)}</body></html>'''
    out = OUT / f"mobile-{'-'.join(which)}.html"
    out.write_text(html)
    print(out, len(html) // 1024, 'KB')
