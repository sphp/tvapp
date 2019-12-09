function log(v){console.log(v)}
function len(v){return isarr(v)?v.length:Object.keys(v).length}
function isset(a){return typeof a !== 'undefined'}
function isarr(a){return a && Array.isArray(a)}
function isstr(s){return s && typeof(s)==='string'||s instanceof String}
function isobj(o){return a && typeof a==='object' && a.constructor===Object}
function iselm(e){return e instanceof Element||e instanceof HTMLDocument}
function islist(e){return NodeList.prototype.isPrototypeOf(e)}
function ishtml(s){return /<[a-z/][\s\S]*>/i.test(s)}
function arr2obj(a){let i,o={};for(i in a){let p=a[i].split('=');o[p[0]]=p[1]}return o}
function toelm(a){let e=document.createElement('div'); e.innerHTML=a;return e.firstChild}
function selall(s,doc){return islist(s)?s:(doc||document)['querySelectorAll'](s)}
function selbid(s,doc){return  iselm(s)?s:(doc||document)['getElementById'](s)}
function select(s,doc){return  iselm(s)?s:(doc||document)['querySelector'](s)}
function text(s){return document.createTextNode(s)}
function tag(tag, att, htm){
	let elm=document.createElement(tag);
	att=Array.isArray(att)?arr2obj(att):att;
	if(typeof(att)!='string')for(let key in att)elm.setAttribute(key,att[key]);
	else if(htm==void 0)htm=att;
	typeof(htm)=='string'?elm.innerHTML=htm:append(elm,htm);
	return elm;
}
function ajax(u,fn,d,m){
	var xh=new XMLHttpRequest();
	xh.open((m||(d?'POST':'GET')),u,true);
	xh.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
	xh.onreadystatechange=function(){if(this.readyState==4&&this.status==200)fn(this.responseText)};
	xh.send(d);
}
function html(es,v){
	if(v==void 0)return es[0].innerHTML;
	each(es,function(e){e.innerHTML=v});
}
function attr(es,at,v){
	if(v==void 0)return es[0].getAttribute(at);
	each(es, function(e){
		v ? e.setAttribute(at,v) : e.removeAttribute(at)
	});
}
function css(es, p, v){
	each(es, function(e){
		v!==void 0 ? e.style[p]=v : e.style=p
	});
}
function off(es,ev,f){
	each(es, function(e){
		e.removeEventListener?e.removeEventListener(ev,f,false):e.detachEvent?e.detachEvent("on"+ev,f):e["on"+ev]=null;
	});
}
function on(es,ev,fn){
	each(es, function(e){
		e.addEventListener?e.addEventListener(ev,fn,false):e.attachEvent?e.attachEvent("on"+ev,fn):e["on"+ev]=fn
	});
}
//loop with selector
function loop(e,fn){e=iselm(e)?[e]:selall(e);for(let n=0,l=len(e); n<l; n++) fn(e[n],n)}
function each(O,fn){for(let n=0,l=len(O);n<l;n++)fn(O[n],n)}
function append(p,c){select(p).appendChild(ishtml(c)?toelm(c):select(c))}
function insert(p,c){each(selall(p), function(e){e.insertAdjacentHTML('beforeend',c)})}

function store(n, v){
   if(n=='clear') localStorage.clear();
   else if(v === void 0) return localStorage.getItem(n);
   else if(v === 'remove') localStorage.removeItem(n);
   else localStorage.setItem(n, v);
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
function eclone(e,p){return p>=0?e[p].cloneNode(true):e[e.length+p].cloneNode(true)}
function uri(u){let a=document.createElement('a'); a.href=u||location.href;a.param = arr2obj(a.search.substr(1).split('&'));return a}
function obj2url(obj){let k,str='';for(k in obj)str += k+'='+obj[k]+'&';return str.slice(0,-1)}
/*****	Super Dyanmic Dom Element Parser Class	*****/
var Js=function(a,b){this.elms=iselm(a)?[a]:selall(a)},js=Js.prototype;window.$=function(a,b){return new Js(a,b)}
js.each=function(fn){each(this.elms,fn);return this}
js.append=function(c){append(this.elms[0], c); return this}
js.insert=function(c){insert(this.elms, c); return this}
js.html=function(v){html(this.elms, v); return this}
js.attr=function(a,v){attr(this.elms, a, v); return this}
js.css=function(p,v){css(this.elms, p, v); return this}
js.off=function(ev,fn){off(this.elms, ev, fn); return this}
js.on=function(ev,fn){on(this.elms, ev, fn); return this}
js.tag=function(tg,at,ht){append(this.elms[0],tag(tg,at,ht));return this}

js.addClass = function(name){
  this.each(function(elm){
    if(elm.classList) elm.classList.add(name);
    else{let a=elm.className.split(' '),p=a.indexOf(name);if(p<0)elm.className=a.push(name).join(' ')}
  });return this;
}
js.removeClass = function(name){
  this.each(function(elm){
    if(elm.classList) elm.classList.remove(name);
    else{let a=elm.className.split(' '),p=a.indexOf(name);if(p>-1)elm.className=a.splice(p,1).join(' ')}
  });return this;
}
js.toggleClass = function(name){
  this.each(function(elm){
    if(elm.classList) elm.classList.toggle(name);
    else{
      let a=elm.className.split(' '),p=a.indexOf(name);elm.className=(p<0?a.push(name):a.splice(p,1)).join(' ');
    }
  });return this;
}
