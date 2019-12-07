/*for blogspot Remove m=1 from mobile device url*/
var url=window.location.href,pos=url.search(/%3D|%3D%3D|&m=1|\?m=1/);
if(pos>0)window.history.replaceState({},document.title,url.substring(0,pos));
var i,prm={},w=window,d=document,wiw=w.innerWidth,wih=w.innerHeight,
baseURL=w.location.protocol+'//'+w.location.host+w.location.pathname;
function len(v){return Object.keys(v).length}
function uencode(a){return encodeURIComponent(a)}
function udecode(a){return decodeURIComponent(a)}
function strobj(o){return JSON.stringify(o)}
function inarr(a,v){return a.indexOf(v)>=0}
function isarr(a){return Array.isArray(a)}
function isset(a){return typeof a !== 'undefined'}
function ishtml(a){return /<[a-z/][\s\S]*>/i.test(a)}
function isstr(a){return typeof a==='string'||a instanceof String}
function iselm(a){return a instanceof Element||a instanceof HTMLDocument}
function isobj(a){return a && typeof a==='object' && a.constructor===Object}
function nocash(url){return url+(url.indexOf('?')>0?'&v=':'?v=')+new Date().getTime()}
function parse(a,t){return new DOMParser().parseFromString(a,t===void 0?'text/html':t)}
function elm(t,at,ht){let k,e=d.createElement(t);if(isobj(at))for(k in at)e.setAttribute(k,at[k]);e.innerHTML=ht||at;return e}
function toelm(a){return elm('div',a).firstChild}
function byid(a,b){return (b||d)['getElementByid'](a)}
function byclass(a,b){return (b||d)['getElementsByClassName'](a)}
function selall(a,b){ return (b||d)['querySelectorAll'](a);}
function select(a,b){if(ishtml(a))a=toelm(a);return iselm(a)?a:(b||d)['querySelector'](a)}

function eloop(a,cb){a=isstr(a)?selall(a):(iselm(a)?[a]:a); for(i=0;i<a.length;i++)cb(a[i],i)}
function eeach(a,fn,v){a=isstr(a)?selall(a):(iselm(a)?[a]:a);for(i=0;i<a.length;i++)a[i][fn]=v}
function einsert(a,b,p){eloop(b, function(e){(e)['insertAdjacentHTML'](p||'beforeend',a)})}/*beforebegin,afterbegin,beforeend,afterend*/
function eappend(a,b){(iselm(b)?b:select(b))['appendChild'](iselm(a)?a: select(a))}
function eclone(e,p){return p>=0?e[p].cloneNode(true):e[e.length+p].cloneNode(true)}

function efind(a,b,c){let e=(b>=0?c:b||d)['querySelectorAll'](a);return b>=0?e[b]:(e.length==1?e[0]:e)}
function find(a,b,c){let e=(b>=0?c:b||d)['querySelectorAll'](a);return b>=0 ?e[b]:e;}

function eshift(el,di){
   let cln=eclone(el, di), pn = el[0].parentNode;
   return di<0 ? pn.insertBefore(cln, pn.children[0]) : pn.appendChild(cln);
}
function ajax(url,fn,d,m){
   var xh=new XMLHttpRequest();
   xh.open((m||(d?'POST':'GET')),url,true);
   xh.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
   xh.onreadystatechange=function(){if(this.readyState==4&&this.status==200)fn(this.responseText)};
   xh.send(d);
}
function arr2obj(arr){let i,obj={}; for(i in arr){let p=arr[i].split('=');obj[p[0]]=p[1]} return obj}
function uri(u){let a=document.createElement('a'); a.href=u||location.href;a.param = arr2obj(a.search.substr(1).split('&'));return a}
function obj2url(obj){let k,str='';for(k in obj) str += k+'='+obj[k]+'&';return str.slice(0,-1)}
/*
var prm = uri();
alert(prm);
alert(prm.param.p);
alert(prm.pathname);
alert(prm.host);
*/
function ewidth(e){
   let css=e.currentStyle||w.getComputedStyle(e);
   return parseFloat(css.width)+parseFloat(css.marginLeft)+parseFloat(css.marginRight)
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
/*
var $ = (function () {
   'use strict';
   var Constructor = function (selector) {
      if (selector === 'document') this.elems = [document];
      else if(selector === 'window')this.elems = [window];
      else this.elems = document.querySelectorAll(selector);
   };
   var instantiate=function(selector){
      return new Constructor(selector);
   };
   return instantiate;
})();
elm.class('name','toggle')
*/
function storage(name, value){
   if(name=='clear')localStorage.clear();
   else if(value === void 0)return localStorage.getItem(name);
   else if(value=='remove')localStorage.removeItem(name);
   else localStorage.setItem(name, value);
}
function paging(listlen, page, limit, sbtn){
   page = page!==void 0?Number(page):(isset(prm.page)?Number(prm.page):1);
   limit= limit!==void 0?Number(limit):(isset(prm.limit)?Number(prm.limit):30);
   sbtn = sbtn!==void 0?Number(sbtn):3;
   var btns='', _url = url.replace(/&page=\d+/g,''), first, last, start, end, totpag, totbtn, offset, i;
   if(_url.substr(_url.length-1)=='&') _url = _url.slice(0, -1);
   if(listlen>limit){
      offset = (page*limit)-limit; 
      totbtn = (sbtn*2)+1; 
      totpag = Math.ceil(listlen/limit);
      for(i=1;i<=totpag;i++){
         start = page>=totpag-sbtn ? totpag-totbtn : page-sbtn;
         end    = page<=sbtn?totbtn:page+sbtn;
         if( i >= start && i <= end){
            first = (page>=sbtn && totpag>totbtn) ? '<a href="'+_url+'&page='+1+'">first</a>':'';
            btns += '<a href="'+_url+'&page='+i+'"'+ (i==page? ' class="active"' : '') +'>'+i+'</a>';
            last = (page<totpag-sbtn)?'<a href="'+_url+'&page='+totpag+'">last</a>':'';
         }
      }
      /*if(totpag>=page) list = list.slice(offset, page<totpag ? offset+limit : list.length);*/
      if(totpag>page)list=offset+' to '+(offset+limit);else if(totpag==page)list=offset+' '+listlen;else list='nill';
      return list+'<div class="row paging">'+first+btns+last+'</div>';
   }
}
/*Responsive position for chield elements inside parent element*/
function responsive(p, c){
   p = select(p); c = selall(c);
   var pw = p.offsetWidth, cw=ewidth(c[0]), rows = 640<pw ? 5 : 10,
   rcnum = Math.floor(pw/cw),
   rempx = Math.floor(pw-rcnum*cw);
   if(c.length==1){
      let boxes = rows*rcnum, boxdata = '';
      for(let i=0; i<boxes; i++) boxdata += '<div class="box pseudo"></div>';
      select('.wrapper').innerHTML = boxdata;
   }
   p.style.padding = '0 '+rempx/2+'px';
}
function slide(wrapper, items, prev, next){
   var posX1 = 0,posX2 = 0,
   posInitial,
   posFinal,
   threshold = 100,
   slides = items.getElementsByClassName('slide'),
   slidesLength = slides.length,
   slideSize  = items.getElementsByClassName('slide')[0].offsetWidth,
   firstSlide = slides[0],
   lastSlide  = slides[slidesLength - 1],
   cloneFirst = firstSlide.cloneNode(true),
   cloneLast  = lastSlide.cloneNode(true),
   index = 0,
   allowShift = true;
   // Clone first and last slide
   items.appendChild(cloneFirst);
   items.insertBefore(cloneLast, firstSlide);
   wrapper.classList.add('loaded');
   // Mouse and Touch events
   items.onmousedown = dragStart;
   // Touch events
   items.addEventListener('touchstart', dragStart);
   items.addEventListener('touchend', dragEnd);
   items.addEventListener('touchmove', dragAction);
   // Click events
   prev.addEventListener('click', function () { moveItem(-1) });
   next.addEventListener('click', function () { moveItem(1) });
   // Transition events
   items.addEventListener('transitionend', checkIndex);
   function dragStart (e) {
      e = e || window.event;
      e.preventDefault();
      posInitial = items.offsetLeft;
      if (e.type == 'touchstart'){
         posX1 = e.touches[0].clientX;
      }else{
         posX1 = e.clientX;
         document.onmouseup = dragEnd;
         document.onmousemove = dragAction;
      }
   }

   function dragAction (e) {
      e = e || window.event;
      if (e.type == 'touchmove') {
         posX2 = posX1 - e.touches[0].clientX;
         posX1 = e.touches[0].clientX;
      }else{
         posX2 = posX1 - e.clientX;
         posX1 = e.clientX;
      }
      items.style.left = (items.offsetLeft - posX2) + "px";
   }
   function dragEnd (e) {
      posFinal = items.offsetLeft;
      if (posFinal-posInitial < -threshold) moveItem(1, 'drag');
      else if (posFinal-posInitial > threshold) moveItem(-1, 'drag');
      else items.style.left = (posInitial) + "px";
      document.onmouseup = null;
      document.onmousemove = null;
   }
   function moveItem(dir, action) {
      items.classList.add('shifting');
      if (allowShift) {
         if (!action) { posInitial = items.offsetLeft; }
         if (dir == 1) {
            items.style.left = (posInitial - slideSize) + "px";
            index++;      
         } else if (dir == -1) {
            items.style.left = (posInitial + slideSize) + "px";
            index--;      
         }
      };
      allowShift = false;
   }
   function checkIndex(){
      items.classList.remove('shifting');
      if(index == -1) {
         items.style.left = -(slidesLength * slideSize) + "px";
         index = slidesLength - 1;
      }
      if(index == slidesLength){
         items.style.left = -(1 * slideSize) + "px";
         index = 0;
      }
      allowShift = true;
   }
}
function cpro(arr, prop, func){
   (function(arr){
      arr.forEach(function(item){
         if(item.hasOwnProperty(prop))return;
         Object.defineProperty(item, prop, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: func
         });
      });
   })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
}

function remove(){
   if (this.parentNode === null)return;
   this.parentNode.removeChild(this);
}
cpro(arr, 'remove', remove)

/*
var elms = selall('div');
log(elms.length);
function cpro(arr, prop, func){
   (function(arr){
      arr.forEach(function(item){
         if(item.hasOwnProperty(prop))return;
         Object.defineProperty(item, prop, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: func
         });
      });
   })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
}

function remove(){
   if (this.parentNode === null)return;
   this.parentNode.removeChild(this);
}

//cpro(arr, 'remove', remove)

(function(arr){
   arr.forEach(function(item){
      if(item.hasOwnProperty('remove'))return;
      Object.defineProperty(item,'remove',{
         configurable: true,
         enumerable: true,
         writable: true,
         value: function remove(){
            if (this.parentNode === null)return;
            this.parentNode.removeChild(this);
         }
      });
   });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
*/