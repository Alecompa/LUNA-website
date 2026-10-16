#!/usr/bin/env python3
"""Import the public LUNAweb snapshot. Requires beautifulsoup4; run with checkout path."""
from pathlib import Path
from bs4 import BeautifulSoup, Comment
import sys, json, re, shutil, posixpath, zipfile, subprocess, hashlib
from urllib.parse import unquote, urlsplit, quote
root=Path(sys.argv[1]).resolve(); dest=Path(__file__).resolve().parents[1]
source_commit=subprocess.check_output(['git','-C',str(root),'rev-parse','HEAD'],text=True).strip()
def soup(rel): return BeautifulSoup((root/rel).read_text(), 'html.parser')
def body(rel): return soup(rel).select_one('[itemprop=articleBody]')
def txt(e): return re.sub(r'\s+',' ',e.get_text(' ',strip=True)).strip()
def resolve(rel, href):
 return posixpath.normpath(posixpath.join(posixpath.dirname(rel),unquote(href).split('#')[0]))
def ident(rel):
 m=re.search(r'id=(\d+)',rel) or re.search(r'/(\d+)-[^/]+$',rel)
 return m.group(1) if m else ''
alias={'169':'19f-pg','170':'24mg-pg','172':'10b-alpha','164':'shades','171':'12c-12c','165':'14n-pg','131':'3he-3he-past','123':'22ne-pg-past'}
pagepaths={
 'about':'index.php/new-about-us.html','collaboration':'index.php/new-about-us/collaboration.html',
 'future':'index.php/new-about-us/future-experiments.html','publications':'index.php/scientific-output/publications.html',
 'theses':'index.php/scientific-output/theses.html','network':'index.php/network.html','work-with-us':'index.php/new-work-with-us.html',
 '50-kv':'index.php/new-about-us/2-uncategorised/138-50-kv-accelerator.html',
 '400-kv':'index.php/new-about-us/2-uncategorised/139-400-kv-accelerator.html',
 'deuterium-nature':'index.php/component/banners/click/42.html'}
routes={v:('/experiments/future/' if k=='future' else '/resources/'+k+'/' if k in ['50-kv','400-kv','deuterium-nature'] else '/'+k+'/') for k,v in pagepaths.items()}
routes.update({'index.html':'/','index.php.html':'/','index.php/scientific-output.html':'/publications/','index.php/new-about-us/past-experiments.html':'/experiments/#past','index.php/new-about-us/ongoing-experiments.html':'/experiments/#ongoing','index.php/scientific-output/reaction-rate-repository.html':'/reaction-rates/'})
experiments=[]
for status in ['ongoing','past']:
 rel=f'index.php/new-about-us/{status}-experiments.html'
 for i,a in enumerate(body(rel).select('a[href]')):
  src=resolve(rel,a['href']); num=ident(src); id=alias.get(num,'luna-'+num)
  facility='Bellotti Ion Beam Facility' if (status=='ongoing' and i>=3) or num=='165' else 'LUNA 50 kV' if status=='past' and i<4 else 'LUNA 400 kV'
  title=a.decode_contents(); title=title.replace('<span','<span')
  # Correct the index's inconsistent product using the linked article title.
  if num=='125': title='<sup>18</sup>O(p,α)<sup>15</sup>N'
  experiments.append({'id':id,'source':src,'status':status,'facility':facility,'indexTitle':title})
  routes[src]='/experiments/'+id+'/'
# Repeated legacy paths refer to the same original article.
for f in root.rglob('*.html'):
 rel=str(f.relative_to(root)); num=ident(rel)
 if '/2-uncategorised/' in rel:
  match=next((e for e in experiments if ident(e['source'])==num),None)
  if match: routes[rel]='/experiments/'+match['id']+'/'
news=[]
for f in sorted((root/'index.php/19-latest-news').glob('*.html')):
 if '?' in f.name: continue
 rel=str(f.relative_to(root)); id=f.stem; routes[rel]='/news/'+id+'/'
 news.append({'id':id,'source':rel})
for f in root.rglob('*edit*.html'):
 rel=str(f.relative_to(root))
 if 'reaction-rate-repository' in rel: routes[rel]='/reaction-rates/'
 if '184-borse' in rel: routes[rel]='/news/184-borse-di-studio-2026/'
issues=[]; manifest=[]
def clean(element, rel):
 s=BeautifulSoup(str(element),'html.parser')
 for script in s.find_all('script'):
  for match in re.finditer(r"var addy_text([a-f0-9]+) = (.*?);document",script.get_text()):
   encoded=''.join(re.findall(r"'([^']*)'",match.group(2)))
   email=BeautifulSoup(encoded,'html.parser').get_text()
   cloak=s.find(id='cloak'+match.group(1))
   if cloak:
    a=s.new_tag('a',href='mailto:'+email); a.string=email; cloak.replace_with(a)
 for e in s(['script','style','form','iframe','object','embed','meta']): e.decompose()
 for c in s.find_all(string=lambda t:isinstance(t,Comment)): c.extract()
 for e in list(s.find_all(True)):
  if e.name is None: continue
  old=dict(e.attrs); e.attrs={k:v for k,v in old.items() if k in ['href','src','alt','colspan','rowspan','id']}
  if e.name=='a' and old.get('name'): e['id']=old['name']
  for attr in ['href','src']:
   if attr not in e.attrs: continue
   value=e[attr].strip()
   if value.lower().startswith(('javascript:','data:')): del e[attr]; continue
   if value.startswith('#'): continue
   parsed=urlsplit(value)
   if parsed.scheme or value.startswith('//'):
    # Repair a duplicated DOI prefix in the original rather than breaking its reference.
    e[attr]=value.replace('https://doi.org/https://doi.org/','https://doi.org/')
    continue
   target=resolve(rel,value); frag=('#'+value.split('#',1)[1]) if '#' in value else ''
   if target in routes: e[attr]=routes[target]+(frag if '#' not in routes[target] else '')
   elif (root/target).is_file(): e[attr]='/legacy/'+quote(target,safe='/')+frag
   else:
    e[attr]='https://luna.lngs.infn.it/'+quote(target.replace('.html',''),safe='/?=&')+frag
    issues.append({'page':rel,'missing':target,'fallback':e[attr]})
  if e.name=='img':
   e['loading']='lazy'
   if not e.get('alt'): e['alt']='LUNA experimental setup' if 'experiments' in rel else 'LUNA archive illustration'
  if e.name=='span': e.unwrap()
 for e in list(s.find_all(['p','div'])):
  if not e.get_text(strip=True) and not e.find(['img','a']): e.decompose()
 return str(s)
def record(rel):
 s=soup(rel); b=s.select_one('[itemprop=articleBody]') or s.select_one('.blog-featured'); content=clean(b,rel)
 plain=txt(b)
 manifest.append({'source':rel,'route':routes.get(rel,'/reaction-rates/'),'sourceTextSha256':hashlib.sha256(plain.encode()).hexdigest(),'sourceCharacters':len(plain)})
 return {'title':s.title.get_text(strip=True),'html':content,'source':rel,'text':plain}
for e in experiments:
 e.update(record(e['source'])); e['title']=clean(e.pop('indexTitle'),e['source'])
 plain=BeautifulSoup(e['html'],'html.parser'); pars=[txt(p) for p in plain.select('p') if len(txt(p))>100]
 e['excerpt']=(pars[0][:240].rsplit(' ',1)[0]+'…') if pars else 'Measurements, results and publications from the LUNA programme.'
 pi=re.search(r'(?:PIs?|P\.I\.):\s*([^\n]+)',plain.get_text('\n',strip=True))
 e['pi']=pi.group(1) if pi else ''
 img=plain.select_one('img'); e['image']=img['src'] if img else ''
pages={k:record(v) for k,v in pagepaths.items()}
for n in news:
 n.update(record(n['source'])); date=soup(n['source']).select_one('time'); n['date']=date.get('datetime','')[:10] if date else ''
 img=BeautifulSoup(n['html'],'html.parser').select_one('img'); n['image']=img['src'] if img else ''
 n['excerpt']=n['text'][:210].rsplit(' ',1)[0]+'…'
# Keep all original bibliography content; separate by year for browser filtering.
def year_sections(html):
 s=BeautifulSoup(html,'html.parser'); wrapper=s.find('div') or s
 sections=[]; current={'year':'Overview','html':''}
 for e in wrapper.children:
  if not getattr(e,'name',None): continue
  t=txt(e)
  if re.fullmatch(r'(19|20)\d{2}',t):
   if current['html']: sections.append(current)
   current={'year':t,'html':''}
  else: current['html']+=str(e)
 if current['html']: sections.append(current)
 return sections
for key in ['publications','theses']: pages[key]['sections']=year_sections(pages[key]['html'])
publications=[]
for section in pages['publications']['sections']:
 if section['year']=='Overview': continue
 current=None
 for e in BeautifulSoup(section['html'],'html.parser').find_all(recursive=False):
  if e.find(['b','strong']) and not e.find('a') and not txt(e).startswith('Interviews'):
   if current: publications.append(current)
   current={'year':section['year'],'titleHtml':str(e),'parts':[]}
  elif current: current['parts'].append(str(e))
 if current: publications.append(current)
# Prove that grouping did not drop or reorder any bibliography text.
original=''.join(s['html'] for s in pages['publications']['sections'] if s['year']!='Overview')
grouped=''.join(r['titleHtml']+''.join(r['parts']) for r in publications)
assert re.sub(r'\s+','',BeautifulSoup(original,'html.parser').get_text())==re.sub(r'\s+','',BeautifulSoup(grouped,'html.parser').get_text())
pages['publications']['records']=publications

rate_meta=[('6Lipg7Be','⁶Li(p,γ)⁷Be','188'),('12Cpg13N','¹²C(p,γ)¹³N','177'),('13Cpg14N','¹³C(p,γ)¹⁴N','179'),('13Can16O','¹³C(α,n)¹⁶O','186'),('17Opg18F','¹⁷O(p,γ)¹⁸F','175')]
rates=[]
rate_dir=dest/'public/data/rates'; rate_dir.mkdir(parents=True,exist_ok=True)
for id,label,num in rate_meta:
 zpath=root/'images/Reaction_Rate_Tables'/f'{id}.zip'; z=zipfile.ZipFile(zpath)
 name=next(n for n in z.namelist() if n.endswith('.txt') and not n.startswith('__MACOSX'))
 raw=z.read(name); (rate_dir/f'{id}.txt').write_bytes(raw); shutil.copy2(zpath,rate_dir/f'{id}.zip')
 rows=[]
 for line in raw.decode().splitlines():
  try: values=[float(v) for v in line.split()]
  except ValueError: continue
  if len(values)==8: rows.append(values)
 assert rows and all(rows[i][0]<rows[i+1][0] for i in range(len(rows)-1))
 assert all(all(row[i]<=row[i+1] for i in range(1,7)) for row in rows)
 labels=['0.1%','2.3%','15.9%','50%','84.1%','97.7%','99.9%'] if id=='13Can16O' else ['−3σ','−2σ','−1σ','Median','+1σ','+2σ','+3σ']
 csv='Temperature (GK),'+','.join(x+' (cm3 mol-1 s-1)' for x in labels)+'\n'+'\n'.join(','.join(str(x) for x in row) for row in rows)+'\n'
 (rate_dir/f'{id}.csv').write_text(csv)
 rel=f'index.php/scientific-output/reaction-rate-repository?layout=edit&id={num}.html'; rec=record(rel)
 rates.append({'id':id,'label':label,'columns':labels,'rows':rows,'html':rec['html'],'source':rel,'sha256':hashlib.sha256(raw).hexdigest(),'validMax':max(row[0] for row in rows if row[4]>0)})
shutil.copytree(root/'images',dest/'public/legacy/images',dirs_exist_ok=True)
# Local KaTeX assets make the institutional export independent of a CDN.
shutil.copytree(dest/'node_modules/katex/dist/fonts',dest/'public/vendor/katex/fonts',dirs_exist_ok=True)
shutil.copy2(dest/'node_modules/katex/dist/katex.min.css',dest/'public/vendor/katex/katex.min.css')
out={'sourceRepository':'https://github.com/mariannavagnoni/LUNAweb','sourceCommit':source_commit,'pages':pages,'experiments':experiments,'news':news,'rates':rates,'unavailableRates':['²H(p,γ)³He','¹⁵N(p,γ)¹⁶O','¹⁷O(p,α)¹⁴N','¹⁸O(p,γ)¹⁹F','¹⁸O(p,α)¹⁵N','²⁰Ne(p,γ)²¹Na','²³Na(p,γ)²⁴Mg','²⁵Mg(p,γ)²⁶Al']}
(dest/'content/imported/legacy.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
(dest/'content/imported/manifest.json').write_text(json.dumps({'commit':source_commit,'pages':manifest,'missingLocalTargets':issues,'routes':routes},ensure_ascii=False,indent=2)+'\n')
print(f'Imported {len(experiments)} experiments, {len(news)} news, {len(pages)} pages, {len(rates)} rates. Missing local targets: {len(issues)}')

shutil.copy2(dest/'node_modules/katex/LICENSE',dest/'public/vendor/katex/LICENSE')
