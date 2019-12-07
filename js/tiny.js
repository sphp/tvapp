var Js=function(a,b){
	typeof(a)==='string'? this.elms=(b||document)['querySelectorAll'](a):[a]
},
js=Js.prototype;
js.each=function(fn){for(let i=0,l=this.elms.length;i<l;i++)fn(this.elms[i],i);return this}
js.html=function(a){if(a==void 0)return this.elms[0].innerHTML;this.each(function(elm){elm.innerHTML=a});return this}
js.attr=function(a,v){if(v==void 0)this.elms[0].getAttribute(a);this.each(function(elm){v?elm.setAttribute(a,v):elm.removeAttribute(a)});return this}
js.css =function(p,v){this.each(function(elm){v!==void 0?elm.style[p]=v:elm.style=p});return this}
js.on  =function(e,fn){this.each(function(elm){elm.addEventListener?elm.addEventListener(e,fn,false):elm.attachEvent?elm.attachEvent("on"+e,fn):elm["on"+e]=fn});return this}
js.off =function(e,fn){this.each(function(elm){elm.removeEventListener?elm.removeEventListener(e,fn,false):elm.detachEvent?elm.detachEvent("on"+e,fn):elm["on"+e]=null;});return this}
js.addClass= function(name){
	this.each(function(elm){
		if(elm.classList) elm.classList.add(name);
		else{let a=elm.className.split(' '),p=a.indexOf(name);if(p<0)elm.className=a.push(name).join(' ')}
	});return this;
}
js.removeClass= function(name){
	this.each(function(elm){
		if(elm.classList) elm.classList.remove(name);
		else{let a=elm.className.split(' '),p=a.indexOf(name);if(p>-1)elm.className=a.splice(p,1).join(' ')}
	});return this;
}
js.toggleClass= function(name){
	this.each(function(elm){
		if(elm.classList) elm.classList.toggle(name);
		else{
			let a=elm.className.split(' '),p=a.indexOf(name);elm.className=(p<0?a.push(name):a.splice(p,1)).join(' ');
		}
	});return this;
}
window._=function(a,b){return new Js(a,b)}