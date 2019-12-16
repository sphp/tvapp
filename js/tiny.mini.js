function byid(s,d){return isElm(s)?s:(d||document)['getElementById'](s)}
function selone(s,d){return isElm(s)?s:(d||document)['querySelector'](s)}
function selall(s,d){return isList(s)?s:(d||document)['querySelectorAll'](s)}
function log(a){console.log(a)}
function str(v){return isElm(v)?v.outerHTML:v.toString()}
function isset(a){return typeof a!=='undefined'}
function isarr(a){return Array.isArray(a)}
function isstr(t){return typeof t==='string'||t instanceof String}
function isobj(o){return typeof o==='object' && o.constructor===Object}
function isElm(e){return e instanceof Element||e instanceof HTMLDocument}
function len(a){return isstr(a)||Array.isArray(a)?a.length:Object.keys(a).length}
function isList(e){return NodeList.prototype.isPrototypeOf(e)}
function isHtml(t){return /<[a-z/][\s\S]*>/i.test(t)}
function toElm(h){let e=document.createElement('div');e.innerHTML=h;return e.firstChild;}
function insert(e,d,p){e.insertAdjacentHTML(p||'beforeend',d)} /*p=beforebegin/afterbegin/beforeend/afterend*/
function append(e,d){isElm(d)?e.appendChild(d):e.innerHTML=e.innerHTML+d}
function eClone(e,p){return p>=0?e[p].cloneNode(true):e[e.length+p].cloneNode(true)}
function obj2str(o){let k,t='';for(k in o)t +=k+'='+o[k]+'&';return t.slice(0,-1)}
function arr2obj(a){let i,o={};for(i in a){let pos = a[i].indexOf('=');o[a[i].slice(0,pos)]=a[i].slice(pos+1)}return o}
function loop(a,f){for(let k in a)if(a.hasOwnProperty(k))f(k,a[k])}
function _each(a,f){for(let i=0,l=len(a); i<l; i++) if(f.call(i,a[i])===false)break}
function each(a,f){for(let k in a)if(a.hasOwnProperty(k))f(a[k],k)}
function attr(e,a,v){if(v==void 0)return e[0].getAttribute(a);each(e,function(el){v?el.setAttribute(a,v):el.removeAttribute(a)})}
function on(e,ev,f){e.addEventListener?e.addEventListener(ev,f,false):e.attachEvent?e.attachEvent("on"+ev,f):e["on"+ev]=f}
function off(e,ev,f){e.removeEventListener?e.removeEventListener(ev,f,false):e.detachEvent?e.detachEvent("on"+ev,f):e["on"+ev]=null}
function addClass(e,n){if(e.classList)e.classList.add(n);else{let a=e.className.split(' '),p=a.indexOf(n);if(p<0)e.className=a.push(n).join(' ')}}
function removeClass(e,n){if(e.classList)e.classList.remove(n);else{let a=e.className.split(' '),p=a.indexOf(n);if(p>-1)e.className=a.splice(p,1).join(' ')}}
function toggleClass(e,n){if(e.classList)e.classList.toggle(n);else{let a=e.className.split(' '),p=a.indexOf(n);e.className=(p<0? a.push(n):a.splice(p,1)).join(' ')}}
function store(n,v){if(n=='clear')localStorage.clear();else if(v===void 0)return localStorage.getItem(n);else if(v==='remove')localStorage.removeItem(n);else localStorage.setItem(n,v);}
function url(){
	var url=location;
	baseUrl = document.querySelector('base').href,
	baseDir = baseUrl.replace(url.origin, '');
	url.paths = url.pathname.replace(baseDir,'').replace(/^\/+/,'').replace(/\/$/,'').split('/');
	var query = url.search.substr(1);
	url.params = query ? arr2obj(query.split('&')) : [];
	url.base   = baseUrl;
	return url;
}
//function uri(u){let a=document.createElement('a');a.href=u||location.href;a.param=arr2obj(a.search.substr(1).split('&'));return a}
function tag(t,at,h){
	let e=document.createElement(t);
	at= isarr(at) ? arr2obj(at) : at;
	if(!isstr(at))for(let key in at)e.setAttribute(key,at[key]);
	else if(h==void 0)h=at;
	if(isset(h))isstr(h)?e.innerHTML=h:e.appendChild(h);
	return e;
}
function ajax(){
	var type = {html:"text/html",text:"text/plain",xml :"application/xml,text/xml",json:"application/json,text/javascript"},
	C = {
		url : location.href,
		data : null,
		async : !0,
		error  : function(x){log(x.responseText)},
		method  : 'GET',
		success  : function(r){log(r)},
		dataType  : type.text,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	};
	loop(arguments[0],function(k,v){C[k]=v})
	var X=new XMLHttpRequest()
	X.open(C.method, C.url, C.async)
	X.setRequestHeader('Content-Type',C.contentType)
	X.setRequestHeader('Accept',C.dataType)
	X.onreadystatechange=function(){if(this.readyState==4&&this.status==200) C.success(this.responseText)}
	X.onerror=function(){C.error(X.responseText)}
	X.send(C.data)
}
function ajax2(u,f,data,m){
	var xh=new XMLHttpRequest();
	xh.open((m||(data?'POST':'GET')),u,true);
	xh.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
	xh.onreadystatechange=function(){if(this.readyState==4&&this.status==200)f(this.responseText)};
	xh.send(data);
}

/**
 * Remove elements
 *
 * @param e	(list of nodes)		List of element
 * @param v	(string)			Search string
 * @param start	(bool)			Where to find (startsWith or anywhere)
 *
 * @return void					Nothing
 */
function filter(e,v,start){
	let txt=e.textContent||e.innerText;
	if(txt){
		if(start||true)e.style.display=txt.toLowerCase().startsWith(v.toLowerCase())?'':'none';
		else e.style.display=txt.toLowerCase().indexOf(v.toLowerCase())>-1?'':'none';
	}
}
function pagination(totalPage, thisPage){
   var _url = url.replace(/&page=\d+/g,''),first,last;
   if(_url.substr(_url.length-1)=='&') _url = _url.slice(0, -1);
   thisPage = Number(thisPage);
   html = '';
   for (var i = 1; i <= totalPage; i++){
      let start = (thisPage>totalPage-4) ? thisPage-3-(3-(totalPage-thisPage)) : thisPage-3,
            end = (thisPage<4) ? thisPage+3+4-thisPage : thisPage+3;
      if( i >= start && i <= end){
         first = (thisPage>4 && totalPage>7) ? '<a href="'+_url+'&page='+1+'">first</a>' : '';
         html += '<a href="'+_url+'&page='+i+'"'+ (i==thisPage? ' class="active"' : '') +'>'+i+'</a>';
         last = (i==totalPage) ? '' : '<a href="'+_url+'&page='+totalPage+'">last</a>';
      }
   }
   return '<div class="row paging">'+first+html+last+'</div>';
}

// DOM elemenets class
var J = function(sel,doc){
	this.sel = sel||document;
	var els=isElm(this.sel) ? this.sel :  (doc||document)["querySelectorAll"](this.sel);
	if(els.nodeType || isElm(els) || els === window) els = [els];
    	this.length = els.length;
    	for (var i=0, l = els.length; i < l; i++) this[i] = els[i];
}, j = J.prototype;
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
