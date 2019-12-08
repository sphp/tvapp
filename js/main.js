function log(v){console.log(v)}
function len(v){return Object.keys(v).length}
function store(n, v){
   if(n=='clear') localStorage.clear();
   else if(v === void 0) return localStorage.getItem(n);
   else if(v === 'remove') localStorage.removeItem(n);
   else localStorage.setItem(n, v);
}
function ajax(url,fn,d,m){
   var xh=new XMLHttpRequest();
   xh.open((m||(d?'POST':'GET')),url,true);
   xh.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
   xh.onreadystatechange=function(){if(this.readyState==4&&this.status==200)fn(this.responseText)};
   xh.send(d);
}
function filter(val, elms, start){
   eloop(elms, function(elm){
      let txtval = elm.textContent || elm.innerText;
      if(txtval){
         if(start||true) elm.style.display=txtval.toLowerCase().startsWith(val.toLowerCase())?'':'none';
         else elm.style.display=txtval.toLowerCase().indexOf(val.toLowerCase())>-1?'':'none';
      }
   })
}
function iselm(a){return a instanceof Element||a instanceof HTMLDocument}
function isstr(str){return typeof str==='string'||str instanceof String}
function ishtml(str){return /<[a-z/][\s\S]*>/i.test(str)}
function selall(sl,doc){return (doc||document)['querySelectorAll'](sl)}
function select(sl,doc){let el=ishtml(sl)?toelm(sl):sl; return iselm(el)?el:(doc||document)['querySelector'](sl)}
function eloop(arr,fn){a=isstr(arr)?selall(arr):arr; for(let i=0,len=len(arr); i<len; i++)fn(arr[i],i)}
function mkelm(tg,at,ht){
   let k,e=d.createElement(tg);
   if(isobj(at)) for(k in at) e.setAttribute(k,at[k]);
   e.innerHTML=ht||at;
   return e;
}
function toelm(a){return ishtml(a) ? mkelm('div',a).firstChild : (iselm(a) ? a : select(a))}
function insert(a,b,p){eloop(b, function(e){e['insertAdjacentHTML'](p||'beforeend',a)})}/*beforebegin, afterbegin, beforeend, afterend*/
function append(e,pe){(toelm(pe))['appendChild'](toelm(e))}
function eclone(e,p){return p>=0?e[p].cloneNode(true):e[e.length+p].cloneNode(true)}
function arr2obj(arr){let i,obj={}; for(i in arr){let p=arr[i].split('='); obj[p[0]]=p[1]} return obj}
function uri(u){let a=document.createElement('a'); a.href=u||location.href;a.param = arr2obj(a.search.substr(1).split('&'));return a}
function obj2url(obj){let k,str='';for(k in obj) str += k+'='+obj[k]+'&';return str.slice(0,-1)}
var countries = {ad :'Andorra',ae :'United Arab Emirates',af :'Afghanistan',al :'Albania',am :'Armenia',ao :'Angola',ar :'Argentina',at :'Austria',au :'Australia',aw :'Aruba',az :'Azerbaijan',ba :'Bosnia And Herzegovina',bb :'Barbados',bd :'Bangladesh',be :'Belgium',bf :'Burkina Faso',bg :'Bulgaria',bh :'Bahrain',bn :'Brunei Darussalam',bo :'Bolivia',br :'Brazil',bs :'Bahamas',by :'Belarus',ca :'Canada',cd :'Congo, Republic',cg :'Congo',ch :'Switzerland',ci :'Cote D\'ivoire',cl :'Chile',cm :'Cameroon',cn :'China',co :'Colombia',cr :'Costa Rica',cu :'Cuba',cv :'Cabo Verde',cw :'Curacao',cy :'Cyprus',cz :'Czech Republic',de :'Germany',dk :'Denmark',do :'Dominican Republic',dz :'Algeria',ec :'Ecuador',ee :'Estonia',eg :'Egypt',eh :'Western Sahara',es :'Spain',et :'Ethiopia',fi :'Finland',fj :'Fiji',fo :'Faroe Islands',fr :'France',gd :'Grenada',ge :'Georgia',gh :'Ghana',gi :'Gibraltar',gm :'Gambia',gn :'Guinea',gp :'Guadeloupe',gq :'Equatorial Guinea',gr :'Greece',gt :'Guatemala',gu :'Guam',gy :'Guyana',hk :'Hong Kong',hn :'Honduras',hr :'Croatia',ht :'Haiti',hu :'Hungary',id :'Indonesia',ie :'Ireland',il :'Israel',in :'India',int :'International',iq :'Iraq',ir :'Iran',is :'Iceland',it :'Italy',jm :'Jamaica',jo :'Hashemite Kingdom Of Jordan',jp :'Japan',ke :'Kenya',kg :'Kyrgyzstan',kh :'Cambodia',kn :'Saint Kitts And Nevis',kp :'Korea, Republic',kr :'Korea (south)',kw :'Kuwait',kz :'Kazakhstan',la :'Lao People\'s',lb :'Lebanon',li :'Liechtenstein',lk :'Sri Lanka',lt :'Lithuania',lu :'Luxembourg',lv :'Latvia',ly :'Libya',ma :'Morocco',mc :'Monaco',md :'Moldova',me :'Montenegro',mg :'Madagascar',mk :'Macedonia',mm :'Myanmar',mn :'Mongolia',mo :'Macao',mt :'Malta',mv :'Maldives',mx :'Mexico',my :'Malaysia',mz :'Mozambique',ne :'Niger',ng :'Nigeria',ni :'Nicaragua',nl :'Netherlands',no :'Norway',np :'Nepal',nz :'New Zealand',om :'Oman',pa :'Panama',pe :'Peru',ph :'Philippines',pk :'Pakistan',pl :'Poland',pr :'Puerto Rico',ps :'Palestine',pt :'Portugal',py :'Paraguay',qa :'Qatar',ro :'Romania',rs :'Serbia',ru :'Russia',rw :'Rwanda',sa :'Saudi Arabia',sd :'Sudan',se :'Sweden',sg :'Singapore',si :'Slovenia',sk :'Slovakia',sl :'Sierra Leone',sm :'San Marino',sn :'Senegal',so :'Somalia',sr :'Suriname',sv :'El Salvador',sx :'Sint Maarten',sy :'Syrian Arab Republic',tg :'Togo',th :'Thailand',tj :'Tajikistan',tm :'Turkmenistan',tn :'Tunisia',tr :'Turkey',tt :'Trinidad And Tobago',tw :'Taiwan',tz :'Tanzania',ua :'Ukraine',ug :'Uganda',uk :'United Kingdom',us :'United States',uy :'Uruguay',uz :'Uzbekistan',ve :'Venezuela',vi :'Virgin Islands',vn :'Viet Nam',xk :'xk',ye :'Yemen',za :'South Africa',zw :'Zimbabwe',unsorted :'Unsorted'};
var categories = ['auto','business','classic','comedy','documentary','education','entertainment','family','fashion','food','general','health','history','hobby','kids','legislative','lifestyle','local','movies','music','news','quiz','religious','sci-fi','shop','sport','travel','weather','other'];
var languages = {ak : 'akan', sq : 'albanian', am : 'amharic', ar : 'arabic', hy : 'armenian', az : 'azerbaijani', bn : 'bengali', bs : 'bosnian', bg : 'bulgarian', my : 'burmese', ca : 'catalan', zh : 'chinese', hr : 'croatian', cs : 'czech', da : 'danish', dv : 'divehi', nl : 'dutch', en : 'english', et : 'estonian', fo : 'faroese', fi : 'finnish', fr : 'french', ka : 'georgian', de : 'german', el : 'greek', ha : 'hausa', he : 'hebrew', hi : 'hindi', hu : 'hungarian', is : 'icelandic', id : 'indonesian', it : 'italian', ja : 'japanese', kk : 'kazakh', km : 'khmer', rw : 'kinyarwanda', ko : 'korean', ku : 'kurdish', ky : 'kyrgyz', lo : 'lao', lv : 'latvian', lt : 'lithuanian', lb : 'luxembourgish', mk : 'macedonian', ms : 'malay', mt : 'maltese', mn : 'mongolian', mi : 'māori', ne : 'nepali', nb : 'norwegian bokmål', ps : 'pashto', fa : 'persian', pl : 'polish', pt : 'portuguese', ro : 'romanian', ru : 'russian', sr : 'serbian', si : 'sinhala', sk : 'slovak', sl : 'slovene', so : 'somali', es : 'spanish', sw : 'swahili', sv : 'swedish', tl : 'tagalog', ta : 'tamil', te : 'telugu', th : 'thai', tr : 'turkish', tk : 'turkmen', uk : 'ukrainian', ur : 'urdu', vi : 'vietnamese'};
var ratings = ['high', 'mid', 'low'];
var alpha_small = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var alpha_cap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var genres = ['action', 'comedy', 'war', 'documentary', 'adult'];