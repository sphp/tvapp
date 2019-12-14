function byId(s,d){return isElm(s)?s:(d||document)['getElementById'](s)}
function selOne(s,d){return isElm(s)?s:(d||document)['querySelector'](s)}
function selAll(s,d){return isList(s)?s:(d||document)['querySelectorAll'](s)}
function log(a){console.log(a)}
function len(a){return Array.isArray(a)?a.length:Object.keys(a).length}
function isSet(a){return typeof(a) !=='undefined'}
function isArr(a){return a && Array.isArray(a)}
function isStr(t){return t && typeof(t)==='string'||t instanceof String}
function isObj(o){return o && typeof(o)==='object' && o.constructor===Object}
function isElm(e){return e instanceof Element||e instanceof HTMLDocument}
function isList(e){return NodeList.prototype.isPrototypeOf(e)}
function isHtml(t){return /<[a-z/][\s\S]*>/i.test(t)}
function toElm(h){let e=document.createElement('div');e.innerHTML=h;return e.firstChild;}
function insert(e,d,p){e.insertAdjacentHTML(p||'beforeend',d)}/*p=beforebegin/afterbegin/beforeend/afterend*/
function append(e,d){isElm(d)?e.appendChild(d):e.innerHTML=e.innerHTML+d}
function eClone(e,p){return p>=0?e[p].cloneNode(true):e[e.length+p].cloneNode(true)}
function obj2str(o){let k,t='';for(k in o)t +=k+'='+o[k]+'&';return t.slice(0,-1)}
function arr2obj(a){let i,o={};for(i in a){let prt=a[i].split('=');o[prt[0]]=prt[1]}return o}
function uri(u){let a=document.createElement('a');a.href=u||location.href;a.param=arr2obj(a.search.substr(1).split('&'));return a}
function each(a,f){for(let i=0,l=a.length;i<l;i++)if(f.call(i,a[i])===false)break}
function attr(e,a,v){if(v==void 0)return e[0].getAttribute(a);each(e,function(el){v?el.setAttribute(a,v):el.removeAttribute(a)})}
function on(e,ev,f){e.addEventListener?e.addEventListener(ev,f,false):e.attachEvent?e.attachEvent("on"+ev,f):e["on"+ev]=f}
function off(e,ev,f){e.removeEventListener?e.removeEventListener(ev,f,false):e.detachEvent?e.detachEvent("on"+ev,f):e["on"+ev]=null}
function addClass(e,n){if(e.classList)e.classList.add(n);else{let a=e.className.split(' '),p=a.indexOf(n);if(p<0)e.className=a.push(n).join(' ')}}
function removeClass(e,n){if(e.classList)e.classList.remove(n);else{let a=e.className.split(' '),p=a.indexOf(n);if(p>-1)e.className=a.splice(p,1).join(' ')}}
function toggleClass(e,n){if(e.classList)e.classList.toggle(n);else{let a=e.className.split(' '),p=a.indexOf(n);e.className=(p<0? a.push(n):a.splice(p,1)).join(' ')}}
function store(n,v){if(n=='clear')localStorage.clear();else if(v===void 0)return localStorage.getItem(n);else if(v==='remove')localStorage.removeItem(n);else localStorage.setItem(n,v);}
function tag(t,at,h){
	let e=document.createElement(t);
	at=isArr(at)?arr2obj(at):at;
	if(!isStr(at))for(let key in at)e.setAttribute(key,at[key]);
	else if(h==void 0)h=at;
	if(isSet(h))isStr(h)?e.innerHTML=h:e.appendChild(h);
	return e;
}
function ajax(u,f,d,m){
	var xh=new XMLHttpRequest();
	xh.open((m||(d?'POST':'GET')),u,true);
	xh.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
	xh.onreadystatechange=function(){if(this.readyState==4&&this.status==200)f(this.responseText)};
	xh.send(d);
}
function filter(e,v,start){
	let txt=e.textContent||e.innerText;
	if(txt){
		if(start||true)e.style.display=txt.toLowerCase().startsWith(v.toLowerCase())?'':'none';
		else e.style.display=txt.toLowerCase().indexOf(v.toLowerCase())>-1?'':'none';
	}
}
var j=J.prototype;
class J{
	constructor(s, d){
		this.s = s || document
		var e = isElm(this.s) ? this.s : (d || document)["querySelectorAll"](this.s)
		if (e.nodeType || isElm(e) || e === window)e = [e]
		this.length = e.length
		for (var i = 0, l = e.length; i < l; i++) this[i] = e[i]
	}
}
S=function(s,d){return new J(s,d)}
j.each=function(f){each(this,f);return this}
j.append=function(d){this.each(function(el){append(el,d)});return this}
j.insert=function(d,p){this.each(function(el){insert(el,d,p)});return this}
j.on=function(ev,f){this.each(function(el){on(el,ev,f)});return this}
j.off=function(ev,f){this.each(function(el){off(el,ev,f)});return this}
j.tag=function(t,at,h){this.each(function(el){append(el,tag(t,at,h))});return this}
j.css=function(p,v){this.each(function(el){v!==void 0?el.style[p]=v:el.style=p});return this}
j.attr=function(at,v){if(v===void 0)return this[0].getAttribute(at);attr(this,at,v);return this}
j.vall=function(v){if(v===void 0)return this[0].value;this.each(function(el){el.value=v });return this}
j.html=function(h){if(h===void 0)return this[0].innerHTML;this.each(function(el){el.innerHTML=h });return this}
j.addClass=function(n){this.each(function(el){addClass(el,n)});return this}
j.removeClass=function(n){this.each(function(el){removeClass(el,n)});return this}
j.toggleClass=function(n){this.each(function(el){toggleClass(el,n)});return this}
j.filter=function(v,st){this.each(function(el){filter(el,v,st)});return this}
