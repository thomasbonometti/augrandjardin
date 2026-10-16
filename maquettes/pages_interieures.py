# Pages intérieures — injectées dans build.py avant `def document`

def png_uri(path):
    return 'data:image/png;base64,' + base64.b64encode(pathlib.Path(path).read_bytes()).decode()

def section_head(eyebrow, title, sub=None, w=720, h2=True):
    t = f'<h2>{title}</h2>' if h2 else f'<h1>{title}</h1>'
    s = f'<p class="lg muted" style="width:{w}px;">{sub}</p>' if sub else ''
    return f'<div class="col" style="gap:18px;"><p class="eyebrow">{eyebrow}</p>{t}{s}</div>'

def chunks(lst, n):
    return [lst[i:i + n] for i in range(0, len(lst), n)]

# =====================================================================
# PRODUITS DE LA SEMAINE
# =====================================================================
def page_produits():
    nb = len(produits)
    nb_lim = len([p for p in produits if p['quantiteLimitee']])
    pills = '<div class="chip chip-green" style="height:40px; padding:0 16px; font-size:14px;">Tout <span style="opacity:0.7">&nbsp;' + str(nb) + '</span></div>'
    pills += ''.join(
        f'<div class="chip chip-outline" style="height:40px; padding:0 16px; font-size:14px;">{titre_rayon(r)} <span style="color:#8A867D">&nbsp;{len(items)}</span></div>'
        for r, items in rayons)
    groups = ''
    for r, items in rayons:
        rows = ''.join(f'<div class="row" style="gap:24px;">{"".join(product_card(p, 302, 302) for p in ch)}</div>' for ch in chunks(items, 4))
        groups += f'''
<div class="col" style="gap:28px; padding-top:56px;">
  <div class="row" style="gap:12px; align-items:baseline;"><h3 style="font-size:32px; line-height:40px; letter-spacing:-0.03em;">{titre_rayon(r)}</h3><p class="muted">{len(items)} produit{"s" if len(items) > 1 else ""}</p></div>
  <div class="col" style="gap:40px;">{rows}</div>
</div>'''
    body = f'''
<div class="wrap" style="padding-top:64px; padding-bottom:32px; gap:28px;">
  <div class="row" style="gap:10px; align-items:center;"><div class="dot"></div><p class="eyebrow">Mis à jour vendredi 16 octobre à 16h24</p></div>
  <div class="row" style="justify-content:space-between; align-items:flex-end;">
    <div class="col" style="gap:20px; width:760px;">
      <h1>Produits de la semaine</h1>
      <p class="lg muted">{nb} produits à venir chercher à la ferme samedi. Les prix sont TTC. Ceux marqués « Quantité limitée » partent vite : venez tôt.</p>
    </div>
    <div class="col" style="gap:10px; align-items:flex-end;">
      <div class="chip chip-outline" style="height:40px; font-size:14px;">{icon('clock', 16, '#111111')}Samedi 17 octobre, 10h – 12h30</div>
      <div class="chip" style="height:40px; font-size:14px;">{nb_lim} produits en quantité limitée</div>
    </div>
  </div>
</div>
<div class="wrap" style="padding-top:16px; padding-bottom:16px; border-top:1px solid #ECE6D8; border-bottom:1px solid #ECE6D8; background:#FBF9F3;">
  <div class="row" style="gap:8px;">{pills}</div>
</div>
<div class="wrap" style="padding-bottom:112px;">{groups}</div>
<div class="wrap" style="padding-bottom:112px;">
  <div class="row" style="justify-content:space-between; align-items:center; background:#F0E7D1; border-radius:16px; padding:48px;">
    <div class="col" style="gap:14px; width:560px;">
      <h3 style="font-size:32px; line-height:40px; letter-spacing:-0.03em;">Recevez la liste chaque semaine par SMS</h3>
      <p class="muted">Pas de commande en ligne : vous répondez au SMS avec votre panier et on le met de côté pour samedi. Du 15 avril au 15 novembre.</p>
    </div>
    <div class="row" style="gap:10px;">
      <div class="field placeholder" style="width:280px;">Votre numéro de portable</div>
      <div class="btn btn-primary">M’inscrire</div>
    </div>
  </div>
</div>'''
    return page('produits', 'Produits de la semaine', body, 'produits')

# =====================================================================
# LA FERME
# =====================================================================
def page_ferme():
    def valeur(ic, title, text):
        return f'''<div class="col" style="width:400px; gap:16px; padding-top:24px; border-top:1px solid #D9D2C1;">
  {icon(ic, 28, '#0C4B31')}<h3>{title}</h3><p class="muted">{text}</p></div>'''
    def partenaire(photo, nom, activite, ville, focus=(0.5, 0.5)):
        return f'''<div class="col" style="width:416px; gap:16px;">
  <img class="card-img" src="{img(photo, 416, 300, focus)}" style="width:416px; height:300px;">
  <div class="col" style="gap:6px;"><h3>{nom}</h3><p class="muted">{activite}</p></div>
  <div class="row"><div class="chip">{icon('pin', 14, '#111111')}{ville}</div></div></div>'''
    def ligne(nom, ville):
        return f'''<div class="row" style="justify-content:space-between; align-items:center; padding:18px 0; border-bottom:1px solid #E3DCCB;">
  <p style="font-size:18px; line-height:26px; color:#111111;">{nom}</p><p class="muted">{ville}</p></div>'''
    restos = [('Hôtel Notre-Dame de Bonne Fontaine', 'Danne-et-Quatre-Vents'), ('La Licorne Bleue', 'Fénétrange'), ('La Toque Blanche', 'Bénestroff'), ('Ô Fredelices, pâtissier traiteur', 'Liocourt')]
    points = [('Inventerre du Pré Vert', 'Dieuze'), ('La Ruche qui dit Oui', 'Dieuze'), ('Marché de Bénestroff', 'Bénestroff'), ('Marché des producteurs', 'Château-Salins'), ('Supermarché Match', 'Dieuze'), ('Supérette Proxi', 'Fénétrange')]
    body = f'''
<div class="wrap" style="padding-top:56px; padding-bottom:112px;">
  <div class="row" style="gap:80px; align-items:center;">
    <img class="card-img" src="{img(P['pierre'], 600, 680, (0.55, 0.4))}" style="width:600px; height:680px;">
    <div class="col" style="gap:32px; width:600px;">
      <p class="eyebrow">La ferme</p>
      <h1 style="font-size:56px; line-height:64px;">Pierre Fouquet, maraîcher bio à Lostroff</h1>
      <p class="lg muted">Au Grand Jardin, on a fait le choix d’une agriculture qui respecte la terre et la biodiversité, dans le jardin et autour : un paillage plutôt qu’un labour, des fleurs pour les insectes pollinisateurs, aucun produit chimique.</p>
      <p class="muted">Chaque samedi, la récolte de la semaine est en vente à la ferme, avec les produits de nos partenaires bio et le pain d’Aux Gourmandises de Thomas.</p>
      <div class="row" style="gap:12px;"><div class="btn btn-primary">Voir les produits de la semaine</div><div class="btn btn-secondary">{icon('pin', 18, '#111111')}Venir samedi</div></div>
    </div>
  </div>
</div>

<div class="wrap" style="padding-bottom:112px; gap:56px;">
  {section_head('Nos engagements', 'Ce qui pousse ici, et comment', w=640)}
  <div class="row" style="gap:40px;">
    {valeur('sprout', 'Des produits bio et de qualité', 'Aucun produit chimique, aucune semence hybride F1 : uniquement des semences paysannes et des variétés anciennes.')}
    {valeur('pin', 'Une production et des partenaires locaux', 'Tous nos fruits et légumes bio sont cultivés à Lostroff. Nos partenaires, bio eux aussi, sont à moins de 50 km.')}
    {valeur('check', 'Des engagements pour la terre', 'Une agriculture sans destruction de l’environnement : paillage, sol couvert, haies et fleurs pour la biodiversité.')}
  </div>
</div>

<div class="row" style="gap:8px; padding-bottom:112px; width:1440px;">
  <img src="{img(P['tunnel'], 480, 440, (0.5, 0.5))}" style="width:480px; height:440px; border-radius:0 12px 12px 0;">
  <img class="card-img" src="{img(P['aerien'], 464, 440, (0.5, 0.5), scale=1.2)}" style="width:464px; height:440px;">
  <img src="{img(P['semis'], 480, 440, (0.15, 0.6))}" style="width:480px; height:440px; border-radius:12px 0 0 12px;">
</div>

<div class="wrap" style="background:#F0E7D1; padding-top:96px; padding-bottom:96px;">
  <div class="row" style="gap:80px; align-items:center;">
    <img src="{png_uri(ROOT / 'assets' / 'sol-vivant-detoure.png')}" style="width:720px; height:450px; object-fit:contain;">
    <div class="col" style="gap:20px; width:480px;">
      <p class="eyebrow">Notre démarche</p>
      <h2>Maraîchage Sol Vivant</h2>
      <p class="lg muted">La ferme s’inscrit dans la démarche Maraîchage Sol Vivant : on cultive sans retourner la terre, on la couvre de paille et de matière organique, pour garder un sol vivant et fertile d’une saison à l’autre.</p>
    </div>
  </div>
</div>

<div class="wrap" style="padding-top:112px; padding-bottom:112px; gap:56px;">
  {section_head('Partenaires', 'Nos partenaires, tous à moins de 50 km', 'Leurs produits sont en vente à la ferme le samedi, et nos légumes se retrouvent dans leurs cuisines et leurs rayons.', 760)}
  <div class="row" style="gap:16px;">
    {partenaire(P['oeufs'], 'Ferme de la Briquerie', 'Œufs', 'Azoudange', (0.5, 0.5))}
    {partenaire(P['champignons'], 'Frui’Thierry', 'Champignons, fraises, framboises, pommes et poires', 'Niederstinzel')}
    {partenaire(P['ruches'], 'Joël Corre', 'Miel', 'Francaltroff')}
  </div>
  <div class="row" style="gap:80px; padding-top:24px;">
    <div class="col" style="width:600px;"><p class="eyebrow" style="padding-bottom:8px;">Ils cuisinent nos légumes</p>{''.join(ligne(n, v) for n, v in restos)}</div>
    <div class="col" style="width:600px;"><p class="eyebrow" style="padding-bottom:8px;">Où trouver nos produits</p>{''.join(ligne(n, v) for n, v in points)}</div>
  </div>
</div>'''
    return page('ferme', 'La ferme', body, 'ferme')

# =====================================================================
# POMMES DE TERRE
# =====================================================================
def page_pdt():
    sacs = {s['id']: s for s in pdt['sacs']}
    choix = {('Agria', '25'): 1, ('Ditta', '15'): 2}
    def stepper(n, disabled=False):
        op = 'opacity:0.35;' if disabled else ''
        return f'''<div class="row" style="align-items:center; height:44px; border:1px solid #D9D2C1; border-radius:8px; background:#FFFFFF; {op}">
  <div style="width:40px; height:42px; display:flex; align-items:center; justify-content:center;">{icon('minus', 16, '#111111')}</div>
  <p style="width:28px; text-align:center; color:#111111; font-size:16px;">{n}</p>
  <div style="width:40px; height:42px; display:flex; align-items:center; justify-content:center;">{icon('plus', 16, '#111111')}</div></div>'''
    rows = ''
    for v in pdt['varietes']:
        out = v['stockKg'] <= 0
        tag = ('<div class="chip" style="background:#E3DCCB; color:#565656;">Épuisée</div>' if out else
               f'<div class="chip" style="background:#FBE3D3; color:#9A3F12;">Plus que {v["stockKg"]} kg</div>' if v['stockKg'] < 150 else '')
        steppers = ''.join(
            f'<div class="col" style="gap:6px; align-items:center;"><p class="sm muted">{s["libelle"].replace("Sac de ", "")}</p>{stepper(choix.get((v["nom"], sid), 0), out)}</div>'
            for sid, s in sacs.items())
        rows += f'''<div class="row" style="justify-content:space-between; align-items:center; padding:20px 0; border-bottom:1px solid #E3DCCB; {"opacity:0.6;" if out else ""}">
  <div class="col" style="gap:4px; width:420px;">
    <div class="row" style="gap:10px; align-items:center;"><p style="font-size:20px; line-height:28px; color:#111111;">{v["nom"]}</p>{tag}</div>
    <p class="sm muted">{v["chair"].capitalize()} · {v["usages"]}</p>
  </div>
  <div class="row" style="gap:20px;">{steppers}</div>
</div>'''
    o = pdt['oignons'][0]
    rows += f'''<div class="row" style="justify-content:space-between; align-items:center; padding:20px 0;">
  <div class="col" style="gap:4px; width:420px;"><p style="font-size:20px; line-height:28px; color:#111111;">Oignons jaunes</p><p class="sm muted">Sac de 5 kg · {euro(o["prix"])}</p></div>
  <div class="row" style="gap:20px;"><div class="col" style="gap:6px; align-items:center;"><p class="sm muted">5 kg</p>{stepper(1)}</div><div style="width:108px;"></div></div>
</div>'''
    def field(label, ph, w=330):
        return f'<div class="col" style="gap:8px; width:{w}px;"><label class="lab">{label}</label><div class="field placeholder">{ph}</div></div>'
    def step(n, title, text):
        return f'''<div class="col" style="width:400px; gap:14px;">
  <div style="width:44px; height:44px; border-radius:22px; background:#0C4B31; display:flex; align-items:center; justify-content:center;"><p style="color:#FFFFFF; font-size:18px;">{n}</p></div>
  <h3>{title}</h3><p class="muted">{text}</p></div>'''
    lignes = [('1 × sac 25 kg · Agria', 45.0), ('2 × sacs 15 kg · Ditta', 57.0), ('1 × oignons jaunes 5 kg', 14.5)]
    recap = ''.join(f'<div class="row" style="justify-content:space-between;"><p style="color:#111111;">{l}</p><p style="color:#111111;">{euro(m)}</p></div>' for l, m in lignes)
    body = f'''
<div class="wrap" style="padding-top:56px; padding-bottom:96px;">
  <div class="row" style="justify-content:space-between; align-items:center;">
    <div class="col" style="gap:28px; width:640px;">
      <div class="row"><div class="chip chip-leaf">Réservations ouvertes jusqu’au 15 novembre</div></div>
      <h1 style="font-size:56px; line-height:64px;">Pommes de terre de garde, en sacs de 15 et 25&nbsp;kg</h1>
      <p class="lg muted">Cultivées sans traitement chimique à Lostroff. Choisissez vos variétés, on vous prévient quand vos sacs sont prêts, vous passez les chercher à la ferme.</p>
      <div class="row" style="gap:12px;">
        <div class="col" style="gap:2px; padding:16px 20px; border-radius:12px; background:#F0E7D1; width:240px;"><p class="display" style="font-size:28px; line-height:36px; color:#111111;">1,90 €/kg</p><p class="sm muted">sac de 15 kg · 28,50 €</p></div>
        <div class="col" style="gap:2px; padding:16px 20px; border-radius:12px; background:#F0E7D1; width:240px;"><p class="display" style="font-size:28px; line-height:36px; color:#111111;">1,80 €/kg</p><p class="sm muted">sac de 25 kg · 45,00 €</p></div>
      </div>
    </div>
    <img class="card-img" src="{img(P['pdt'], 560, 520, scale=1)}" style="width:560px; height:520px;">
  </div>
</div>

<div class="wrap" style="padding-bottom:96px;">
  <div class="row" style="gap:40px; padding-top:40px; border-top:1px solid #D9D2C1;">
    {step(1, 'Vous réservez', 'Choisissez vos variétés et le nombre de sacs. Le paiement se fait sur place, au retrait.')}
    {step(2, 'On prépare vos sacs', 'Vous recevez un e-mail, et un SMS si vous le souhaitez, dès que la commande est prête.')}
    {step(3, 'Vous passez à la ferme', 'Le jour de vente de votre choix, au 43 rue Principale à Lostroff.')}
  </div>
</div>

<div class="wrap" style="padding-bottom:112px;">
  <div class="row" style="gap:64px; align-items:flex-start;">
    <div class="col" style="gap:48px; width:776px;">
      <div class="col" style="gap:8px;">
        <h2 style="font-size:36px; line-height:44px;">1. Vos sacs</h2>
        <p class="muted">7 variétés de la dernière récolte. Les stocks se mettent à jour à chaque réservation.</p>
        <div class="col" style="padding-top:8px;">{rows}</div>
      </div>
      <div class="col" style="gap:24px;">
        <h2 style="font-size:36px; line-height:44px;">2. Vos coordonnées</h2>
        <div class="row" style="gap:16px;">{field('Prénom', 'Léa', 380)}{field('Nom', 'Martin', 380)}</div>
        <div class="row" style="gap:16px;">{field('E-mail', 'lea.martin@exemple.fr', 380)}{field('Téléphone', '06 12 34 56 78', 380)}</div>
        <div class="row" style="gap:12px; align-items:center;"><div style="width:22px; height:22px; border-radius:5px; background:#0C4B31; display:flex; align-items:center; justify-content:center;">{icon('check', 16, '#FFFFFF', 2.4)}</div><p>Me prévenir aussi par SMS quand ma commande est prête</p></div>
        <div class="col" style="gap:8px;"><label class="lab">Commentaire (facultatif)</label><div class="field placeholder" style="height:96px; align-items:flex-start; padding-top:14px;">Un jour de retrait préféré, une question…</div></div>
      </div>
    </div>
    <div class="col" style="gap:20px; width:440px; background:#F0E7D1; border-radius:16px; padding:32px;">
      <h3>Votre réservation</h3>
      <div class="col" style="gap:12px;">{recap}</div>
      <div class="line" style="background:#D9CDAE;"></div>
      <div class="row" style="justify-content:space-between; align-items:baseline;"><p style="color:#111111;">Total</p><p class="display" style="font-size:36px; line-height:44px; letter-spacing:-0.03em; color:#111111;">116,50 €</p></div>
      <p class="sm muted">55 kg de pommes de terre et 5 kg d’oignons</p>
      <div class="btn btn-primary" style="justify-content:center; height:56px;">Réserver</div>
      <p class="sm muted">Paiement sur place au retrait. 5 sacs de pommes de terre maximum par réservation en ligne : pour plus, appelez la ferme.</p>
    </div>
  </div>
</div>'''
    return page('pdt', 'Pommes de terre', body, 'pdt')

# =====================================================================
# PROFESSIONNELS
# =====================================================================
def page_pros():
    def step(n, title, text):
        return f'''<div class="col" style="width:400px; gap:14px;">
  <p class="display" style="font-size:56px; line-height:64px; color:rgba(255,255,255,0.35);">0{n}</p>
  <h3>{title}</h3><p class="muted">{text}</p></div>'''
    def field(label, ph, w=480):
        return f'<div class="col" style="gap:8px; width:{w}px;"><label class="lab">{label}</label><div class="field placeholder">{ph}</div></div>'
    clients = ['Hôtel Notre-Dame de Bonne Fontaine', 'La Licorne Bleue', 'La Toque Blanche', 'Ô Fredelices']
    body = f'''
<div class="wrap" style="padding-top:56px; padding-bottom:96px;">
  <div class="row" style="gap:80px; align-items:center;">
    <div class="col" style="gap:32px; width:620px;">
      <p class="eyebrow">Restaurants · épiceries · collectivités</p>
      <h1 style="font-size:56px; line-height:64px;">Des légumes bio de Lostroff, livrés chaque semaine</h1>
      <p class="lg muted">Vous cuisinez local et de saison ? On vous propose une offre selon nos récoltes et vos besoins, avec une livraison hebdomadaire.</p>
      <div class="row" style="gap:12px;"><div class="btn btn-primary">Demander un accès</div><div class="btn btn-secondary">{icon('lock', 18, '#111111')}J’ai déjà un accès</div></div>
      <div class="row" style="gap:40px; padding-top:16px;">
        {stat('48 h', 'pour vous répondre', 160)}{stat('32', 'produits cette semaine', 160)}{stat('4', 'restaurants partenaires', 160)}
      </div>
    </div>
    <img class="card-img" src="{img(P['echange'], 580, 680, (0.62, 0.5))}" style="width:580px; height:680px;">
  </div>
</div>

<div class="wrap" style="padding-bottom:96px;">
  <div class="col" style="gap:20px; padding-top:40px; border-top:1px solid #D9D2C1;">
    <p class="eyebrow">Ils cuisinent nos légumes</p>
    <div class="row" style="gap:12px;">{''.join(f'<div class="chip chip-outline" style="height:52px; padding:0 22px; font-size:18px; color:#111111;">{c}</div>' for c in clients)}</div>
  </div>
</div>

<div class="wrap on-dark" style="background:#0C4B31; padding-top:104px; padding-bottom:104px; gap:56px;">
  {section_head('Comment ça marche', 'Trois étapes pour travailler ensemble', w=640)}
  <div class="row" style="gap:40px;">
    {step(1, 'On fait connaissance', 'Vos volumes, vos jours de livraison, les produits qui comptent pour votre carte.')}
    {step(2, 'Vous recevez votre accès', 'La grille tarifaire pro, mise à jour chaque semaine avec ce qui est prêt à la récolte.')}
    {step(3, 'Vous commandez', 'Par téléphone ou message, avant le jour de récolte convenu. On livre.')}
  </div>
</div>

<div class="wrap" style="padding-top:112px; padding-bottom:112px;">
  <div class="row" style="gap:16px; align-items:stretch;">
    <div class="col" style="gap:24px; width:808px; padding:40px; border-radius:16px; border:1px solid #E3DCCB; background:#FFFFFF;">
      <h3 style="font-size:32px; line-height:40px; letter-spacing:-0.03em;">Demander un accès</h3>
      <p class="muted">Pierre vous rappelle sous 48 h pour parler de vos besoins.</p>
      <div class="row" style="gap:16px;">{field('Votre nom', 'Camille Durand', 356)}{field('Établissement', 'Restaurant, épicerie…', 356)}</div>
      <div class="row" style="gap:16px;">{field('Téléphone', '06 12 34 56 78', 356)}{field('E-mail', 'contact@etablissement.fr', 356)}</div>
      <div class="col" style="gap:8px;"><label class="lab">Vos besoins</label><div class="field placeholder" style="height:96px; align-items:flex-start; padding-top:14px;">Volumes, jours de livraison, produits recherchés…</div></div>
      <div class="row"><div class="btn btn-primary">Envoyer la demande</div></div>
    </div>
    <div class="col" style="gap:20px; width:456px; padding:40px; border-radius:16px; background:#F0E7D1;">
      {icon('lock', 28, '#0C4B31')}
      <h3 style="font-size:32px; line-height:40px; letter-spacing:-0.03em;">Déjà client ?</h3>
      <p class="muted">Entrez le mot de passe reçu pour consulter la grille tarifaire de la semaine.</p>
      <div class="col" style="gap:8px;"><label class="lab">Mot de passe</label><div class="field placeholder">••••••••</div></div>
      <div class="btn btn-dark" style="justify-content:center;">Voir la grille tarifaire</div>
      <p class="sm muted">Le mot de passe figure dans le dernier message de la ferme.</p>
    </div>
  </div>
</div>'''
    return page('pros', 'Professionnels', body, 'pros')

# =====================================================================
# ESPACE PRO — GRILLE TARIFAIRE
# =====================================================================
def page_tarifs():
    ht = lambda x: round(x / 1.055, 2)
    th = lambda t, w, right=False: f'<p class="sm" style="width:{w}px; color:#565656; {"text-align:right;" if right else ""}">{t}</p>'
    def row(p):
        dispo = '<div class="chip" style="background:#FBE3D3; color:#9A3F12;">Quantité limitée</div>' if p['quantiteLimitee'] else ('<div class="chip chip-leaf">Nouveau</div>' if p['nouveau'] else '<p class="sm muted">Disponible</p>')
        return f'''<div class="row" style="align-items:center; padding:14px 24px; border-top:1px solid #ECE6D8; background:#FFFFFF;">
  <p style="width:420px; color:#111111;">{p["nom"]}</p>
  <p class="muted" style="width:260px;">{p["unite"] or "—"}</p>
  <div class="row" style="width:220px;">{dispo}</div>
  <p class="display" style="width:160px; text-align:right; font-size:18px; color:#111111;">{euro(ht(p["prix"])) if p["prix"] is not None else "—"}</p>
  <p class="muted" style="width:160px; text-align:right;">{euro(p["prix"]) if p["prix"] is not None else "—"}</p>
</div>'''
    table = ''
    for r, items in rayons:
        table += f'<div class="row" style="padding:12px 24px; background:#F0E7D1; border-top:1px solid #E3DCCB;"><p style="font-size:18px; line-height:26px; color:#111111;">{titre_rayon(r)}</p></div>'
        table += ''.join(row(p) for p in items)
    body = f'''
<div class="wrap" style="padding-top:56px; padding-bottom:48px;">
  <div class="row" style="justify-content:space-between; align-items:flex-end;">
    <div class="col" style="gap:20px; width:760px;">
      <div class="row" style="gap:10px; align-items:center;"><div class="chip chip-green">{icon('lock', 14, '#FFFFFF')}Espace professionnels</div><p class="sm muted">Mis à jour vendredi 16 octobre à 16h24</p></div>
      <h1>Grille tarifaire de la semaine</h1>
      <p class="lg muted">Prix hors taxes, TVA 5,5 %. Commandez par téléphone ou par message avant le jour de récolte convenu.</p>
    </div>
    <div class="row" style="gap:12px;">
      <div class="btn btn-secondary">{icon('download', 18, '#111111')}Télécharger en PDF</div>
      <div class="btn btn-primary">{icon('phone', 18, '#FFFFFF')}Commander : 06 42 42 42 93</div>
    </div>
  </div>
</div>
<div class="wrap" style="padding-bottom:112px;">
  <div class="col" style="border:1px solid #E3DCCB; border-radius:16px; overflow:hidden;">
    <div class="row" style="padding:16px 24px; background:#FBF9F3;">{th('Produit', 420)}{th('Conditionnement', 260)}{th('Disponibilité', 220)}{th('Prix HT', 160, True)}{th('Prix TTC', 160, True)}</div>
    {table}
  </div>
</div>'''
    return page('tarifs', 'Espace pro — grille tarifaire', body, 'pros')

# =====================================================================
# HORAIRES & CONTACT
# =====================================================================
def page_contact():
    def creneau(jour, heure, lieu, actif):
        etat = '<div class="chip chip-leaf">Cette semaine</div>' if actif else '<p class="sm muted">Pas cette semaine</p>'
        return f'''<div class="row" style="justify-content:space-between; align-items:center; padding:20px 0; border-bottom:1px solid #E3DCCB; {"" if actif else "opacity:0.55;"}">
  <div class="col" style="gap:2px;"><p style="font-size:20px; line-height:28px; color:#111111;">{jour} · {heure}</p><p class="muted">{lieu}</p></div>{etat}</div>'''
    mapsvg = '''<svg width="1280" height="440" viewBox="0 0 1280 440" xmlns="http://www.w3.org/2000/svg">
<rect width="1280" height="440" fill="#EFE9DA"/>
<path d="M0 300 C 260 280 420 330 640 300 S 1040 240 1280 270" stroke="#FFFFFF" stroke-width="18" fill="none"/>
<path d="M610 0 C 600 120 660 220 640 300 S 600 400 620 440" stroke="#FFFFFF" stroke-width="12" fill="none"/>
<path d="M0 120 C 200 140 360 100 520 150" stroke="#FFFFFF" stroke-width="8" fill="none"/>
<rect x="760" y="60" width="200" height="120" rx="10" fill="#DCE6C8"/><rect x="980" y="40" width="240" height="160" rx="10" fill="#D3DFBC"/>
<rect x="120" y="330" width="260" height="90" rx="10" fill="#DCE6C8"/><rect x="820" y="320" width="300" height="100" rx="10" fill="#D3DFBC"/>
<rect x="700" y="210" width="40" height="22" rx="4" fill="#FFFFFF" opacity="0.9"/><rect x="752" y="214" width="56" height="18" rx="4" fill="#FFFFFF" opacity="0.9"/>
<circle cx="640" cy="292" r="34" fill="#0C4B31" opacity="0.15"/><circle cx="640" cy="292" r="14" fill="#0C4B31"/><circle cx="640" cy="292" r="5" fill="#FFFFFF"/>
</svg>'''
    body = f'''
<div class="wrap" style="padding-top:64px; padding-bottom:56px;">
  <div class="col" style="gap:20px; width:820px;">
    <p class="eyebrow">Horaires & contact</p>
    <h1>Venir à la ferme</h1>
    <p class="lg muted">Les ventes ont lieu à la ferme, au 43 rue Principale à Lostroff. Les créneaux changent selon la saison et les marchés : ils sont mis à jour ici chaque semaine.</p>
  </div>
</div>
<div class="wrap" style="padding-bottom:64px;">
  <div class="row" style="gap:16px; align-items:stretch;">
    <div class="col on-dark" style="gap:28px; width:520px; padding:40px; border-radius:16px; background:#0C4B31; justify-content:space-between;">
      <div class="row" style="gap:10px; align-items:center;"><div class="dot" style="background:#7BE39B"></div><p class="eyebrow">Prochaine vente</p></div>
      <div class="col" style="gap:8px;">
        <p class="display" style="font-size:48px; line-height:56px; letter-spacing:-0.03em; color:#FFFFFF;">Samedi 17 octobre</p>
        <p class="display" style="font-size:48px; line-height:56px; letter-spacing:-0.03em; color:#7BE39B;">10h – 12h30</p>
      </div>
      <p class="muted">À la ferme, 43 rue Principale, 57670 Lostroff</p>
      <div class="row" style="gap:12px;"><div class="btn btn-white">{icon('pin', 18, '#111111')}Itinéraire</div><div class="btn" style="border:1px solid rgba(255,255,255,0.35); color:#FFFFFF;">{icon('phone', 18, '#FFFFFF')}Appeler</div></div>
    </div>
    <div class="col" style="width:744px; padding:8px 40px; border-radius:16px; background:#FFFFFF; border:1px solid #E3DCCB;">
      <p class="eyebrow" style="padding-top:28px; padding-bottom:8px;">Les rendez-vous de la ferme</p>
      {creneau('Samedi', '10h – 12h30', 'Vente à la ferme, Lostroff', True)}
      {creneau('Mercredi', '17h – 19h', 'Vente à la ferme, Lostroff', False)}
      {creneau('Dimanche', '8h – 12h', 'Marché des producteurs, Bénestroff', False)}
    </div>
  </div>
</div>
<div class="wrap" style="padding-bottom:64px;">
  <div style="position:relative; width:1280px; height:440px; border-radius:16px; overflow:hidden;">
    <img src="{svg_uri(mapsvg)}" style="width:1280px; height:440px;">
    <div class="col" style="position:absolute; left:32px; top:32px; gap:8px; padding:20px 24px; border-radius:12px; background:#FFFFFF; width:340px;">
      <p style="font-size:18px; line-height:26px; color:#111111;">Au Grand Jardin</p>
      <p class="sm muted">43 rue Principale, 57670 Lostroff</p>
      <p class="sm" style="color:#0C4B31; padding-top:4px;">Ouvrir dans Google Maps →</p>
    </div>
  </div>
</div>
<div class="wrap" style="padding-bottom:112px;">
  <div class="row" style="gap:16px;">
    {''.join(f"""<div class="col" style="gap:14px; width:416px; padding:32px; border-radius:16px; background:#F0E7D1;">{icon(ic, 26, '#0C4B31')}<p class="sm muted">{t}</p><p style="font-size:20px; line-height:28px; color:#111111;">{v}</p><p class="sm muted">{d}</p></div>"""
             for ic, t, v, d in [('phone', 'Téléphone', '06 42 42 42 93', 'Pierre Fouquet'), ('mail', 'E-mail', 'pierre@augrandjardin.fr', 'Réponse sous 48 h'), ('facebook', 'Facebook', 'Au Grand Jardin', 'Les annonces de la semaine')])}
  </div>
</div>'''
    return page('contact', 'Horaires & contact', body, 'contact')

