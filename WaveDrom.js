/*! wavedrom 2016-01-30 */
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a,b){function c(a){var b=parseInt(e.style.left,10),d=parseInt(e.style.top,10);(a.x<b||a.x>b+e.offsetWidth||a.y<d||a.y>d+e.offsetHeight)&&(e.parentNode.removeChild(e),document.body.removeEventListener("mousedown",c,!1))}var d,e;d=document.getElementById(b+a),d.childNodes[0].addEventListener("contextmenu",function(f){var g,h,i;e=document.createElement("div"),e.className="wavedromMenu",e.style.top=f.y+"px",e.style.left=f.x+"px",g=document.createElement("ul"),h=document.createElement("li"),h.innerHTML="Save as PNG",g.appendChild(h),i=document.createElement("li"),i.innerHTML="Save as SVG",g.appendChild(i),e.appendChild(g),document.body.appendChild(e),h.addEventListener("click",function(){var f,g,h,i,j,k,l,m;f="",0!==a&&(g=document.getElementById(b+0),f+=g.innerHTML.substring(166,g.innerHTML.indexOf('<g id="waves_0">'))),f=[d.innerHTML.slice(0,166),f,d.innerHTML.slice(166)].join(""),h="data:image/svg+xml;base64,"+btoa(f),i=new Image,i.src=h,j=document.createElement("canvas"),j.width=i.width,j.height=i.height,k=j.getContext("2d"),k.drawImage(i,0,0),l=j.toDataURL("image/png"),m=document.createElement("a"),m.href=l,m.download="wavedrom.png",m.click(),e.parentNode.removeChild(e),document.body.removeEventListener("mousedown",c,!1)},!1),i.addEventListener("click",function(){var f,g,h,i;f="",0!==a&&(g=document.getElementById(b+0),f+=g.innerHTML.substring(166,g.innerHTML.indexOf('<g id="waves_0">'))),f=[d.innerHTML.slice(0,166),f,d.innerHTML.slice(166)].join(""),h="data:image/svg+xml;base64,"+btoa(f),i=document.createElement("a"),i.href=h,i.download="wavedrom.svg",i.click(),e.parentNode.removeChild(e),document.body.removeEventListener("mousedown",c,!1)},!1),e.addEventListener("contextmenu",function(a){a.preventDefault()},!1),document.body.addEventListener("mousedown",c,!1),f.preventDefault()},!1)}b.exports=d},{}],2:[function(a,b,c){"use strict";var d=a("./jsonml-parse");b.exports=d},{"./jsonml-parse":15}],3:[function(a,b,c){"use strict";function d(){f(0,e("InputJSON_0"),"WaveDrom_Display_")}var e=a("./eva"),f=a("./render-wave-form");b.exports=d},{"./eva":4,"./render-wave-form":28}],4:[function(require,module,exports){"use strict";function eva(id){function erra(a){return{signal:[{name:["tspan",["tspan",{"class":"error h5"},"Error: "],a.message]}]}}var TheTextBox,source;if(TheTextBox=document.getElementById(id),TheTextBox.type&&"textarea"===TheTextBox.type)try{source=eval("("+TheTextBox.value+")")}catch(e){return erra(e)}else try{source=eval("("+TheTextBox.innerHTML+")")}catch(e){return erra(e)}if("[object Object]"!==Object.prototype.toString.call(source))return erra({message:'[Semantic]: The root has to be an Object: "{signal:[...]}"'});if(source.signal){if("[object Array]"!==Object.prototype.toString.call(source.signal))return erra({message:'[Semantic]: "signal" object has to be an Array "signal:[]"'})}else{if(!source.assign)return erra({message:'[Semantic]: "signal:[...]" or "assign:[...]" property is missing inside the root Object'});if("[object Array]"!==Object.prototype.toString.call(source.assign))return erra({message:'[Semantic]: "assign" object hasto be an Array "assign:[]"'})}return source}module.exports=eva},{}],5:[function(a,b,c){"use strict";function d(a){var b=0,c=0,d=[];return a.forEach(function(a){"vvv-2"===a||"vvv-3"===a||"vvv-4"===a||"vvv-5"===a?c+=1:0!==c&&(d.push(b-(c+1)/2),c=0),b+=1}),0!==c&&d.push(b-(c+1)/2),d}b.exports=d},{}],6:[function(a,b,c){"use strict";function d(a,b,c){var d,e,f=[];if(4===a.length){for(e=0;c>e;e+=1){for(f.push(a[0]),d=0;b>d;d+=1)f.push(a[1]);for(f.push(a[2]),d=0;b>d;d+=1)f.push(a[3])}return f}for(1===a.length&&a.push(a[0]),f.push(a[0]),d=0;c*(2*(b+1))-1>d;d+=1)f.push(a[1]);return f}b.exports=d},{}],7:[function(a,b,c){"use strict";function d(a,b,c){var d;switch(d=[],a){case"p":d=e(["pclk","111","nclk","000"],b,c);break;case"n":d=e(["nclk","000","pclk","111"],b,c);break;case"P":d=e(["Pclk","111","nclk","000"],b,c);break;case"N":d=e(["Nclk","000","pclk","111"],b,c);break;case"l":case"L":case"0":d=e(["000"],b,c);break;case"h":case"H":case"1":d=e(["111"],b,c);break;case"=":d=e(["vvv-2"],b,c);break;case"2":d=e(["vvv-2"],b,c);break;case"3":d=e(["vvv-3"],b,c);break;case"4":d=e(["vvv-4"],b,c);break;case"5":d=e(["vvv-5"],b,c);break;case"d":d=e(["ddd"],b,c);break;case"u":d=e(["uuu"],b,c);break;case"z":d=e(["zzz"],b,c);break;default:d=e(["xxx"],b,c)}return d}var e=a("./gen-brick");b.exports=d},{"./gen-brick":6}],8:[function(a,b,c){"use strict";function d(a,b,c){var d,f,g,h,i,j,k,l,m,n,o,p,q,r,s;return d={p:"pclk",n:"nclk",P:"Pclk",N:"Nclk",h:"pclk",l:"nclk",H:"Pclk",L:"Nclk"},f={0:"0",1:"1",x:"x",d:"d",u:"u",z:"z","=":"v",2:"v",3:"v",4:"v",5:"v"},g={0:"",1:"",x:"",d:"",u:"",z:"","=":"-2",2:"-2",3:"-3",4:"-4",5:"-5"},h={p:"0",n:"1",P:"0",N:"1",h:"1",l:"0",H:"1",L:"0",0:"0",1:"1",x:"x",d:"d",u:"u",z:"z","=":"v",2:"v",3:"v",4:"v",5:"v"},i={p:"",n:"",P:"",N:"",h:"",l:"",H:"",L:"",0:"",1:"",x:"",d:"",u:"",z:"","=":"-2",2:"-2",3:"-3",4:"-4",5:"-5"},j={p:"111",n:"000",P:"111",N:"000",h:"111",l:"000",H:"111",L:"000",0:"000",1:"111",x:"xxx",d:"ddd",u:"uuu",z:"zzz","=":"vvv-2",2:"vvv-2",3:"vvv-3",4:"vvv-4",5:"vvv-5"},k={p:"nclk",n:"pclk",P:"nclk",N:"pclk"},l={p:"000",n:"111",P:"000",N:"111"},m={hp:"111",Hp:"111",ln:"000",Ln:"000",nh:"111",Nh:"111",pl:"000",Pl:"000"},n=a.split(""),o=j[n[1]],p=d[n[1]],void 0===p?(q=f[n[1]],void 0===q?e(["xxx"],b,c):(r=h[n[0]],void 0===r?e(["xxx"],b,c):e([r+"m"+q+i[n[0]]+g[n[1]],o],b,c))):(s=m[a],void 0!==s&&(p=s),q=k[n[1]],void 0===q?e([p,o],b,c):e([p,o,q,l[n[1]]],b,c))}var e=a("./gen-brick");b.exports=d},{"./gen-brick":6}],9:[function(a,b,c){"use strict";var d=a("./process-all"),e=a("./eva"),f=a("./render-wave-form"),g=a("./editor-refresh");b.exports={processAll:d,eva:e,renderWaveForm:f,editorRefresh:g}},{"./editor-refresh":3,"./eva":4,"./process-all":21,"./render-wave-form":28}],10:[function(a,b,c){"use strict";function d(a,b){for(var c,d;b.childNodes.length;)b.removeChild(b.childNodes[0]);d=["svg",{id:"svgcontent_"+a,xmlns:f.svg,"xmlns:xlink":f.xlink,overflow:"hidden"},["style",".pinname {font-size:12px; font-style:normal; font-variant:normal; font-weight:500; font-stretch:normal; text-align:center; text-anchor:end; font-family:Helvetica} .wirename {font-size:12px; font-style:normal; font-variant:normal; font-weight:500; font-stretch:normal; text-align:center; text-anchor:start; font-family:Helvetica} .wirename:hover {fill:blue} .gate {color:#000; fill:#ffc; fill-opacity: 1;stroke:#000; stroke-width:1; stroke-opacity:1} .gate:hover {fill:red !important; } .wire {fill:none; stroke:#000; stroke-width:1; stroke-opacity:1} .grid {fill:#fff; fill-opacity:1; stroke:none}"]],c=e(d),b.insertBefore(c,null)}var e=a("./create-element"),f=a("./w3");b.exports=d},{"./create-element":2,"./w3":30}],11:[function(a,b,c){"use strict";function d(a,b,c,d){for(var h,i,j;b.childNodes.length;)b.removeChild(b.childNodes[0]);for(i in g)break;j=g["default"]||g[i],c&&c.config&&c.config.skin&&g[c.config.skin]&&(j=g[c.config.skin]),0===a?(d.xs=Number(j[3][1][2][1].width),d.ys=Number(j[3][1][2][1].height),d.xlabel=Number(j[3][1][2][1].x),d.ym=Number(j[3][1][2][1].y)):j=["svg",{id:"svg",xmlns:f.svg,"xmlns:xlink":f.xlink,height:"0"},["g",{id:"waves"},["g",{id:"lanes"}],["g",{id:"groups"}]]],j[j.length-1][1].id="waves_"+a,j[j.length-1][2][1].id="lanes_"+a,j[j.length-1][3][1].id="groups_"+a,j[1].id="svgcontent_"+a,j[1].height=0,h=e(j),b.insertBefore(h,null)}var e=a("./create-element"),f=a("./w3"),g=a("./wave-skin");b.exports=d},{"./create-element":2,"./w3":30,"./wave-skin":32}],12:[function(a,b,c){"use strict";function d(a,b,c){"string"==typeof c&&(c=new Function("event",c)),"function"==typeof c&&(a[b]=c)}function e(a,b){if(b.name&&document.attachEvent)try{var c=document.createElement("<"+a.tagName+" name='"+b.name+"'>");a.tagName===c.tagName&&(a=c)}catch(e){console.log(e)}for(var i in b)if(b.hasOwnProperty(i)){var j=b[i];i&&null!==j&&"undefined"!=typeof j&&(i=f[i.toLowerCase()]||i,"style"===i?"undefined"!=typeof a.style.cssText?a.style.cssText=j:a.style=j:h[i]?(d(a,i,j),g[i]&&d(a,g[i],j)):"string"==typeof j||"number"==typeof j||"boolean"==typeof j?(a.setAttribute(i,j),g[i]&&a.setAttribute(g[i],j)):(a[i]=j,g[i]&&(a[g[i]]=j)))}return a}var f={rowspan:"rowSpan",colspan:"colSpan",cellpadding:"cellPadding",cellspacing:"cellSpacing",tabindex:"tabIndex",accesskey:"accessKey",hidefocus:"hideFocus",usemap:"useMap",maxlength:"maxLength",readonly:"readOnly",contenteditable:"contentEditable"},g={enctype:"encoding",onscroll:"DOMMouseScroll"},h=function(a){for(var b,c={};a.length;)b=a.shift(),c["on"+b.toLowerCase()]=b;return c}("blur,change,click,dblclick,error,focus,keydown,keypress,keyup,load,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,resize,scroll,select,submit,unload".split(","));b.exports=e},{}],13:[function(a,b,c){"use strict";function d(a,b){b&&(a.tagName&&"style"===a.tagName.toLowerCase()&&document.createStyleSheet?a.cssText=b:a.canHaveChildren!==!1&&a.appendChild(b))}b.exports=d},{}],14:[function(a,b,c){"use strict";function d(a){var b=document.createElement("div");if(b.innerHTML=a,e(b),1===b.childNodes.length)return b.firstChild;for(var c=document.createDocumentFragment?document.createDocumentFragment():document.createElement("");b.firstChild;)c.appendChild(b.firstChild);return c}var e=a("./jsonml-trim-whitespace");b.exports=d},{"./jsonml-trim-whitespace":16}],15:[function(a,b,c){"use strict";function d(a){return a instanceof Array&&"string"==typeof a[0]}function e(a,b,c){return document.createTextNode("["+a+"-"+c+"]")}var f,g,h=a("./jsonml-hydrate"),i=a("./w3"),j=a("./jsonml-append-child"),k=a("./jsonml-add-attributes"),l=a("./jsonml-trim-whitespace"),m=null;f=function(a,b,c){for(var d=1;d<b.length;d++)b[d]instanceof Array||"string"==typeof b[d]?j(a,g(b[d],c)):b[d]&&b[d].value?j(a,h(b[d].value)):"object"==typeof b[d]&&null!==b[d]&&1===a.nodeType&&(a=k(a,b[d]));return a},g=function(a,b){var c;try{if(!a)return null;if("string"==typeof a)return document.createTextNode(a);if(a&&a.value)return h(a.value);if(!d(a))throw new SyntaxError("invalid JsonML");var k=a[0];if(!k){for(var n=document.createDocumentFragment?document.createDocumentFragment():document.createElement(""),o=2;o<a.length;o++)j(n,g(a[o],b));return l(n),1===n.childNodes.length?n.firstChild:n}return"style"===k.toLowerCase()&&document.createStyleSheet?(f(document.createStyleSheet(),a,b),null):(c=f(document.createElementNS(i.svg,k),a,b),l(c),c)}catch(p){try{var q="function"==typeof m?m:e;return q(p,a,b)}catch(r){return document.createTextNode("["+r+"]")}}},b.exports=g},{"./jsonml-add-attributes":12,"./jsonml-append-child":13,"./jsonml-hydrate":14,"./jsonml-trim-whitespace":16,"./w3":30}],16:[function(a,b,c){"use strict";function d(a){return a&&3===a.nodeType&&(!a.nodeValue||!/\S/.exec(a.nodeValue))}function e(a){if(a){for(;d(a.firstChild);)a.removeChild(a.firstChild);for(;d(a.lastChild);)a.removeChild(a.lastChild)}}b.exports=e},{}],17:[function(a,b,c){"use strict";var d={xs:20,ys:20,xg:120,yh0:0,yh1:0,yf0:0,yf1:0,y0:5,yo:30,tgo:-10,ym:15,xlabel:6,xmax:1,scale:1,head:{},foot:{}};b.exports=d},{}],18:[function(a,b,c){"use strict";function d(a,b){function c(a){return a>0?Math.round(a):1}var d;b.hscale=1,b.hscale0&&(b.hscale=b.hscale0),a&&a.config&&a.config.hscale&&(d=Math.round(c(a.config.hscale)),d>0&&(d>100&&(d=100),b.hscale=d)),b.yh0=0,b.yh1=0,b.head=a.head,a&&a.head&&((a.head.tick||0===a.head.tick||a.head.tock||0===a.head.tock)&&(b.yh0=20),a.head.text&&(b.yh1=46,b.head.text=a.head.text)),b.yf0=0,b.yf1=0,b.foot=a.foot,a&&a.foot&&((a.foot.tick||0===a.foot.tick||a.foot.tock||0===a.foot.tock)&&(b.yf0=20),a.foot.text&&(b.yf1=46,b.foot.text=a.foot.text))}b.exports=d},{}],19:[function(a,b,c){"use strict";function d(a,b,c){var d,g,h,i,j=[],k=[];for(j=a.split(""),h=j.shift(),d=1;"."===j[0]||"|"===j[0];)j.shift(),d+=1;for(k=k.concat(e(h,b,d));j.length;){for(g=h,h=j.shift(),d=1;"."===j[0]||"|"===j[0];)j.shift(),d+=1;k=k.concat(f(g+h,b,d))}for(i=0;i<c.phase;i+=1)k.shift();return k}var e=a("./gen-first-wave-brick"),f=a("./gen-wave-brick");b.exports=d},{"./gen-first-wave-brick":7,"./gen-wave-brick":8}],20:[function(a,b,c){"use strict";function d(a){var b;return b=a.data,void 0===b?null:"string"==typeof b?b.split(" "):b}function e(a,b){var c,e,g=[],h=[];for(c in a)e=a[c],b.period=e.period?e.period:1,b.phase=e.phase?2*e.phase:0,g.push([]),h[0]=e.name||" ",h[1]=e.phase||0,g[g.length-1][0]=h.slice(0),g[g.length-1][1]=e.wave?f(e.wave,b.period*b.hscale-1,b):null,g[g.length-1][2]=d(e);return g}var f=a("./parse-wave-lane");b.exports=e},{"./parse-wave-lane":19}],21:[function(a,b,c){"use strict";function d(){var a,b,c,d;for(c=0,a=document.querySelectorAll("*"),b=0;b<a.length;b++)a.item(b).type&&"WaveDrom"===a.item(b).type&&(a.item(b).setAttribute("id","InputJSON_"+c),d=document.createElement("div"),d.id="WaveDrom_Display_"+c,a.item(b).parentNode.insertBefore(d,a.item(b)),c+=1);for(b=0;c>b;b+=1)g(b,e("InputJSON_"+b),"WaveDrom_Display_"),f(b,"WaveDrom_Display_");document.head.innerHTML+='<style type="text/css">div.wavedromMenu{position:fixed;border:solid 1pt#CCCCCC;background-color:white;box-shadow:0px 10px 20px #808080;cursor:default;margin:0px;padding:0px;}div.wavedromMenu>ul{margin:0px;padding:0px;}div.wavedromMenu>ul>li{padding:2px 10px;list-style:none;}div.wavedromMenu>ul>li:hover{background-color:#b5d5ff;}</style>'}var e=a("./eva"),f=a("./append-save-as-dialog"),g=a("./render-wave-form");b.exports=d},{"./append-save-as-dialog":1,"./eva":4,"./render-wave-form":28}],22:[function(a,b,c){"use strict";function d(a,b){var c,e,f={},g={x:10};for(("string"==typeof a[0]||"number"==typeof a[0])&&(e=a[0],g.x=25),b.x+=g.x,c=0;c<a.length;c++)"object"==typeof a[c]&&("[object Array]"===Object.prototype.toString.call(a[c])?(f.y=b.y,b=d(a[c],b),b.groups.push({x:b.xx,y:f.y,height:b.y-f.y,name:b.name})):(b.lanes.push(a[c]),b.width.push(b.x),b.y+=1));return b.xx=b.x,b.x-=g.x,b.name=e,b}b.exports=d},{}],23:[function(a,b,c){"use strict";function d(a,b,c,d,h){function i(){r&&s&&(x=document.createElementNS(g.svg,"path"),x.id="gmark_"+A.from+"_"+A.to,x.setAttribute("d","M "+r.x+","+r.y+" "+s.x+","+s.y),x.setAttribute("style","fill:none;stroke:#00F;stroke-width:1"),j.insertBefore(x,null))}var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z=[],A={words:[],from:0,shape:"",to:0,label:""},B={};if(b){for(k in b)if(h.period=b[k].period?b[k].period:1,h.phase=b[k].phase?2*b[k].phase:0,m=b[k].node)for(z=m.split(""),n=0;z.length;)o=z.shift(),"."!==o&&(B[o]={x:h.xs*(2*n*h.period*h.hscale-h.phase)+h.xlabel,y:k*h.yo+h.y0+.5*h.ys}),n+=1;if(j=document.createElementNS(g.svg,"g"),j.id="wavearcs_"+c,a.insertBefore(j,null),d.edge)for(k in d.edge)if(A.words=d.edge[k].split(" "),A.label=d.edge[k].substring(A.words[0].length),A.label=A.label.substring(1),A.from=A.words[0].substr(0,1),A.to=A.words[0].substr(-1,1),A.shape=A.words[0].slice(1,-1),r=B[A.from],s=B[A.to],i(),r&&s){switch(A.label&&(p=e.parse(A.label),p.unshift("text",{style:"font-size:10px;","text-anchor":"middle","xml:space":"preserve"}),p=f(p),q=f(["rect",{height:9,style:"fill:#FFF;"}]),j.insertBefore(q,null),j.insertBefore(p,null),y=p.getBBox().width,q.setAttribute("width",y)),t=s.x-r.x,u=s.y-r.y,v=(r.x+s.x)/2,w=(r.y+s.y)/2,A.shape){case"-":break;case"~":x.setAttribute("d","M "+r.x+","+r.y+" c "+.7*t+", 0 "+.3*t+", "+u+" "+t+", "+u);break;case"-~":x.setAttribute("d","M "+r.x+","+r.y+" c "+.7*t+", 0 "+t+", "+u+" "+t+", "+u),A.label&&(v=r.x+.75*(s.x-r.x));break;case"~-":x.setAttribute("d","M "+r.x+","+r.y+" c 0, 0 "+.3*t+", "+u+" "+t+", "+u),A.label&&(v=r.x+.25*(s.x-r.x));break;case"-|":x.setAttribute("d","m "+r.x+","+r.y+" "+t+",0 0,"+u),A.label&&(v=s.x);break;case"|-":x.setAttribute("d","m "+r.x+","+r.y+" 0,"+u+" "+t+",0"),A.label&&(v=r.x);break;case"-|-":x.setAttribute("d","m "+r.x+","+r.y+" "+t/2+",0 0,"+u+" "+t/2+",0");break;case"->":x.setAttribute("style","marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none");break;case"~>":x.setAttribute("style","marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","M "+r.x+","+r.y+" c "+.7*t+", 0 "+.3*t+", "+u+" "+t+", "+u);break;case"-~>":x.setAttribute("style","marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","M "+r.x+","+r.y+" c "+.7*t+", 0 "+t+", "+u+" "+t+", "+u),A.label&&(v=r.x+.75*(s.x-r.x));break;case"~->":x.setAttribute("style","marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","M "+r.x+","+r.y+" c 0, 0 "+.3*t+", "+u+" "+t+", "+u),A.label&&(v=r.x+.25*(s.x-r.x));break;case"-|>":x.setAttribute("style","marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","m "+r.x+","+r.y+" "+t+",0 0,"+u),A.label&&(v=s.x);break;case"|->":x.setAttribute("style","marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","m "+r.x+","+r.y+" 0,"+u+" "+t+",0"),A.label&&(v=r.x);break;case"-|->":x.setAttribute("style","marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","m "+r.x+","+r.y+" "+t/2+",0 0,"+u+" "+t/2+",0");break;case"<->":x.setAttribute("style","marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none");break;case"<~>":x.setAttribute("style","marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","M "+r.x+","+r.y+" c "+.7*t+", 0 "+.3*t+", "+u+" "+t+", "+u);break;case"<-~>":x.setAttribute("style","marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","M "+r.x+","+r.y+" c "+.7*t+", 0 "+t+", "+u+" "+t+", "+u),A.label&&(v=r.x+.75*(s.x-r.x));break;case"<-|>":x.setAttribute("style","marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","m "+r.x+","+r.y+" "+t+",0 0,"+u),A.label&&(v=s.x);break;case"<-|->":x.setAttribute("style","marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none"),x.setAttribute("d","m "+r.x+","+r.y+" "+t/2+",0 0,"+u+" "+t/2+",0");break;default:x.setAttribute("style","fill:none;stroke:#F00;stroke-width:1")}A.label&&(p.setAttribute("x",v),p.setAttribute("y",w+3),q.setAttribute("x",v-y/2),q.setAttribute("y",w-5))}for(l in B)l===l.toLowerCase()&&B[l].x>0&&(q=f(["rect",{y:B[l].y-4,height:8,style:"fill:#FFF;"}]),p=f(["text",{style:"font-size:8px;",x:B[l].x,y:B[l].y+2,"text-anchor":"middle"},l+""]),j.insertBefore(q,null),j.insertBefore(p,null),y=p.getBBox().width+2,q.setAttribute("x",B[l].x-y/2),q.setAttribute("width",y))}}var e=a("tspan"),f=a("./create-element"),g=a("./w3");b.exports=d},{"./create-element":2,"./w3":30,tspan:34}],24:[function(a,b,c){"use strict";function d(a,b){var c,e,f;for(b.xmax=Math.max(b.xmax,b.x),c=b.y,f=a.length,e=1;f>e;e++)"[object Array]"===Object.prototype.toString.call(a[e])?b=d(a[e],{x:b.x+1,y:b.y,xmax:b.xmax}):(a[e]={name:a[e],x:b.x+1,y:b.y},b.y+=2);return a[0]={name:a[0],x:b.x,y:Math.round((c+(b.y-2))/2)},b.x--,b}function e(a,b,c){var d,e,f=" M 4,0 C 4,1.1 3.1,2 2,2 0.9,2 0,1.1 0,0 c 0,-1.1 0.9,-2 2,-2 1.1,0 2,0.9 2,2 z",g={"~":"M -11,-6 -11,6 0,0 z m -5,6 5,0"+f,"=":"M -11,-6 -11,6 0,0 z m -5,6 5,0","&":"m -16,-10 5,0 c 6,0 11,4 11,10 0,6 -5,10 -11,10 l -5,0 z","~&":"m -16,-10 5,0 c 6,0 11,4 11,10 0,6 -5,10 -11,10 l -5,0 z"+f,"|":"m -18,-10 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 2.5,-5 2.5,-15 0,-20 z","~|":"m -18,-10 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 2.5,-5 2.5,-15 0,-20 z"+f,"^":"m -21,-10 c 1,3 2,6 2,10 m 0,0 c 0,4 -1,7 -2,10 m 3,-20 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 1,-3 2,-6 2,-10 0,-4 -1,-7 -2,-10 z","~^":"m -21,-10 c 1,3 2,6 2,10 m 0,0 c 0,4 -1,7 -2,10 m 3,-20 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 1,-3 2,-6 2,-10 0,-4 -1,-7 -2,-10 z"+f,"+":"m -8,5 0,-10 m -5,5 10,0 m 3,0 c 0,4.418278 -3.581722,8 -8,8 -4.418278,0 -8,-3.581722 -8,-8 0,-4.418278 3.581722,-8 8,-8 4.418278,0 8,3.581722 8,8 z","*":"m -4,4 -8,-8 m 0,8 8,-8 m 4,4 c 0,4.418278 -3.581722,8 -8,8 -4.418278,0 -8,-3.581722 -8,-8 0,-4.418278 3.581722,-8 8,-8 4.418278,0 8,3.581722 8,8 z"},h={BUF:1,INV:1,AND:"&",NAND:"&",OR:"≥1",NOR:"≥1",XOR:"=1",XNOR:"=1",box:""},i={INV:1,NAND:1,NOR:1,XNOR:1};return c===b&&(c=4,b=-4),d=g[a],e=h[a],d?["path",{"class":"gate",d:d}]:e?["g",["path",{"class":"gate",d:"m -16,"+(b-3)+" 16,0 0,"+(c-b+6)+" -16,0 z"+(i[a]?f:"")}],["text",["tspan",{x:"-14",y:"4","class":"wirename"},e+""]]]:["text",["tspan",{x:"-14",y:"4","class":"wirename"},a+""]]}function f(a){var b,c,d,f=["g"],g=[],h=a.length;for(b=2;h>b;b++)g.push(a[b][1]);for(c=Math.min.apply(null,g),d=Math.max.apply(null,g),f.push(["g",{transform:"translate(16,0)"},["path",{d:"M  "+a[2][0]+","+c+" "+a[2][0]+","+d,"class":"wire"}]]),b=2;h>b;b++)f.push(["g",["path",{d:"m  "+a[b][0]+","+a[b][1]+" 16,0","class":"wire"}]]);return f.push(["g",{transform:"translate("+a[1][0]+","+a[1][1]+")"},["title",a[0]],e(a[0],c-a[1][1],d-a[1][1])]),f}function g(a,b){var c,d,e,h,i,j=["g"],k=[];if("[object Array]"===Object.prototype.toString.call(a)){for(d=a.length,k.push(a[0].name),k.push([32*(b-a[0].x),8*a[0].y]),c=1;d>c;c++)"[object Array]"===Object.prototype.toString.call(a[c])?k.push([32*(b-a[c][0].x),8*a[c][0].y]):k.push([32*(b-a[c].x),8*a[c].y]);for(j.push(f(k)),c=1;d>c;c++)j.push(g(a[c],b))}else i=a.name,e=32*(b-a.x),h=8*a.y,j.push(["g",{transform:"translate("+e+","+h+")"},["title",i],["path",{d:"M 2,0 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z"}],["text",["tspan",{x:"-4",y:"4","class":"pinname"},i]]]);return j}function h(a,b){var c,e,f,h,j,k,l,m,n,o,p=["g"],q=["g"];for(m=b.assign.length,e={x:0,y:2,xmax:0},c=b.assign,l=0;m>l;l++)e=d(c[l],e),e.x++;for(f=e.xmax+3,l=0;m>l;l++)p.push(g(c[l],f));for(j=32*(f+1)+1,k=8*(e.y+1)-7,m=4*(f+1),o=e.y+1,l=0;m>=l;l++)for(n=0;o>=n;n++)q.push(["rect",{height:1,width:1,x:8*l-.5,y:8*n-.5,"class":"grid"}]);h=document.getElementById("svgcontent_"+a),h.setAttribute("viewBox","0 0 "+j+" "+k),h.setAttribute("width",j),h.setAttribute("height",k),h.insertBefore(i(["g",{transform:"translate(0.5, 0.5)"},q,p]),null)}var i=a("./create-element");b.exports=h},{"./create-element":2}],25:[function(a,b,c){"use strict";function d(a,b,c,d){var f,g,h,i,j,k,l=[];if(b){g=document.createElementNS(e.svg,"g"),g.id="wavegaps_"+c,a.insertBefore(g,null);for(f in b)if(d.period=b[f].period?b[f].period:1,d.phase=b[f].phase?2*b[f].phase:0,h=document.createElementNS(e.svg,"g"),h.id="wavegap_"+f+"_"+c,h.setAttribute("transform","translate(0,"+(d.y0+f*d.yo)+")"),g.insertBefore(h,null),k=b[f].wave)for(l=k.split(""),j=0;l.length;)"|"===l.shift()&&(i=document.createElementNS(e.svg,"use"),i.setAttributeNS(e.xlink,"xlink:href","#gap"),i.setAttribute("transform","translate("+d.xs*((2*j+1)*d.period*d.hscale-d.phase)+")"),h.insertBefore(i,null)),j+=1}}var e=a("./w3");b.exports=d},{"./w3":30}],26:[function(a,b,c){"use strict";function d(a,b,c){var d,f,g,h=["g"];return a.forEach(function(a,i){h.push(["path",{id:"group_"+i+"_"+b,d:"m "+(a.x+.5)+","+(a.y*c.yo+3.5+c.yh0+c.yh1)+" c -3,0 -5,2 -5,5 l 0,"+(a.height*c.yo-16)+" c 0,3 2,5 5,5",style:"stroke:#0041c4;stroke-width:1;fill:none"}]),void 0!==a.name&&(d=a.x-10,f=c.yo*(a.y+a.height/2)+c.yh0+c.yh1,g=e.parse(a.name),g.unshift("text",{"text-anchor":"middle","class":"info","xml:space":"preserve"}),h.push(["g",{transform:"translate("+d+","+f+")"},["g",{transform:"rotate(270)"},g]]))}),h}var e=a("tspan");b.exports=d},{tspan:34}],27:[function(a,b,c){"use strict";function d(a,b,c,d){function g(a,b,c){var d;a[b]&&a[b].text&&(d=e.parse(a[b].text),d.unshift("text",{x:a.xmax*a.xs/2,y:c,"text-anchor":"middle",fill:"#000","xml:space":"preserve"}),d=f(d),j.insertBefore(d,null))}function h(a,b,c,d,g,h,k){var l,m,n,o,p=1,q=0,r=[];if(void 0!==a[b]&&void 0!==a[b][c]){if(n=a[b][c],"string"==typeof n)n=n.split(" ");else if("number"==typeof n||"boolean"==typeof n)for(m=Number(n),n=[],i=0;k>i;i+=1)n.push(i+m);if("[object Array]"===Object.prototype.toString.call(n)&&0!==n.length){if(1===n.length)if(m=Number(n[0]),isNaN(m))r=n;else for(i=0;k>i;i+=1)r[i]=i+m;else if(2===n.length)if(m=Number(n[0]),p=Number(n[1]),o=n[1].split("."),2===o.length&&(q=o[1].length),isNaN(m)||isNaN(p))r=n;else for(m=p*m,i=0;k>i;i+=1)r[i]=(p*i+m).toFixed(q);else r=n;for(i=0;k>i;i+=1)o=r[i],l=e.parse(o),l.unshift("text",{x:i*g+d,y:h,"text-anchor":"middle","class":"muted","xml:space":"preserve"}),l=f(l),j.insertBefore(l,null)}}}var i,j,k,l,m,n;for(l=2*d.hscale,m=l*d.xs,k=d.xmax/l,n=b.length*d.yo,j=f(["g",{id:"gmarks_"+c}]),a.insertBefore(j,a.firstChild),i=0;k+1>i;i+=1)j.insertBefore(f(["path",{id:"gmark_"+i+"_"+c,d:"m "+i*m+",0 0,"+n,style:"stroke:#888;stroke-width:0.5;stroke-dasharray:1,3"}]),null);g(d,"head",d.yh0?-33:-13),g(d,"foot",n+(d.yf0?45:25)),h(d,"head","tick",0,m,-5,k+1),h(d,"head","tock",m/2,m,-5,k),h(d,"foot","tick",0,m,n+15,k+1),h(d,"foot","tock",m/2,m,n+15,k)}var e=a("tspan"),f=a("./create-element");b.exports=d},{"./create-element":2,tspan:34}],28:[function(a,b,c){"use strict";function d(a,b,c){var d,r,s,t,u,v,w,x,y,z=0;if(b.signal){p(a,document.getElementById(c+a),b,f),h(b,f),d=e(b.signal,{x:0,y:0,xmax:0,width:[],lanes:[],groups:[]}),r=document.getElementById("lanes_"+a),s=document.getElementById("groups_"+a),u=i(d.lanes,f),x=m(r,u,a,f);for(y in x)z=Math.max(z,x[y]+d.width[y]);j(r,u,a,f),o(r,d.lanes,a,b,f),k(r,d.lanes,a,f),s.innerHTML=g(l(d.groups,a,f)),f.xg=Math.ceil((z-f.tgo)/f.xs)*f.xs,v=f.xg+f.xs*(f.xmax+1),w=u.length*f.yo+f.yh0+f.yh1+f.yf0+f.yf1,t=document.getElementById("svgcontent_"+a),t.setAttribute("viewBox","0 0 "+v+" "+w),t.setAttribute("width",v),t.setAttribute("height",w),t.setAttribute("overflow","hidden"),r.setAttribute("transform","translate("+(f.xg+.5)+", "+(f.yh0+f.yh1+.5)+")")}else b.assign&&(q(a,document.getElementById(c+a),b),n(a,b))}var e=a("./rec"),f=a("./lane"),g=a("onml/lib/stringify"),h=a("./parse-config"),i=a("./parse-wave-lanes"),j=a("./render-marks"),k=a("./render-gaps"),l=a("./render-groups"),m=a("./render-wave-lane"),n=a("./render-assign"),o=a("./render-arcs"),p=a("./insert-svg-template"),q=a("./insert-svg-template-assign");b.exports=d},{"./insert-svg-template":11,"./insert-svg-template-assign":10,"./lane":17,"./parse-config":18,"./parse-wave-lanes":20,"./rec":22,"./render-arcs":23,"./render-assign":24,"./render-gaps":25,"./render-groups":26,"./render-marks":27,"./render-wave-lane":29,"onml/lib/stringify":33}],29:[function(a,b,c){"use strict";function d(a,b,c,d){var i,j,k,l,m,n,o,p,q,r=[1],s=0,t=0,u=[];for(j=0;j<b.length;j+=1)if(p=b[j][0][0],p&&(l=f(["g",{id:"wavelane_"+j+"_"+c,transform:"translate(0,"+(d.y0+j*d.yo)+")"}]),a.insertBefore(l,null),n=e.parse(p),n.unshift("text",{x:d.tgo,y:d.ym,"class":"info","text-anchor":"end","xml:space":"preserve"}),n=f(n),l.insertBefore(n,null),u.push(n.getBBox().width),q=b[j][0][1],q=q>0?Math.ceil(2*q)-2*q:-2*q,m=f(["g",{id:"wavelane_draw_"+j+"_"+c,transform:"translate("+q*d.xs+", 0)"}]),l.insertBefore(m,null),b[j][1])){for(i=0;i<b[j][1].length;i+=1)o=document.createElementNS(g.svg,"use"),o.setAttributeNS(g.xlink,"xlink:href","#"+b[j][1][i]),o.setAttribute("transform","translate("+i*d.xs+")"),m.insertBefore(o,null);if(b[j][2]&&b[j][2].length&&(r=h(b[j][1]),0!==r.length))for(k in r)b[j][2]&&"undefined"!=typeof b[j][2][k]&&(n=e.parse(b[j][2][k]),n.unshift("text",{x:r[k]*d.xs+d.xlabel,y:d.ym,"text-anchor":"middle","xml:space":"preserve"}),n=f(n),m.insertBefore(n,null));b[j][1].length>s&&(s=b[j][1].length)}return d.xmax=s,d.xg=t+20,u}var e=a("tspan"),f=a("./create-element"),g=a("./w3"),h=a("./find-lane-markers");b.exports=d},{"./create-element":2,"./find-lane-markers":5,"./w3":30,tspan:34}],30:[function(a,b,c){"use strict";b.exports={svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",xmlns:"http://www.w3.org/XML/1998/namespace"}},{}],31:[function(a,b,c){"use strict";window.WaveDrom=window.WaveDrom||{};var d=a("./");window.WaveDrom.ProcessAll=d.processAll,window.WaveDrom.RenderWaveForm=d.renderWaveForm,window.WaveDrom.EditorRefresh=d.editorRefresh,window.WaveDrom.eva=d.eva},{"./":9}],32:[function(a,b,c){"use strict";b.exports=window.WaveSkin},{}],33:[function(a,b,c){"use strict";function d(a){return a&&"[object Object]"===Object.prototype.toString.call(a)}function e(a){var b,c=[];return"string"!=typeof a?a:(b=a.split("\n"),1===b.length?"  "+a:(b.forEach(function(a){return""===a.trim()?void c.push(a):void c.push("  "+a)}),c.join("\n")))}function f(a){var b=a.split("\n"),c=[];return b.forEach(function(a){""!==a.trim()&&c.push(a)}),c.join("\n")}function g(a){var b,c,h,i;return c="",i=!0,h=a.some(function(a,e,f){if(0!==e){if(1===e){if(d(a))return Object.keys(a).forEach(function(c){b+=" "+c+'="'+a[c]+'"'}),2===f.length?!0:void(b+=">");b+=">"}switch(typeof a){case"string":case"number":case"boolean":return void(c+=a+"\n")}i=!1,c+=g(a)}else if(b="<"+a,1===f.length)return!0}),h?b+"/>\n":i?b+f(c)+"</"+a[0]+">\n":b+"\n"+e(c)+"</"+a[0]+">\n"}b.exports=g},{}],34:[function(a,b,c){"use strict";function d(a,b){b.add&&b.add.split(";").forEach(function(b){var c=b.split(" ");a[c[0]][c[1]]=!0}),b.del&&b.del.split(";").forEach(function(b){var c=b.split(" ");delete a[c[0]][c[1]]})}function e(a){return Object.keys(a).reduce(function(b,c){var d=Object.keys(a[c]);return d.length>0&&(b[c]=d.join(" ")),b},{})}function f(a){var b,c,f,i,j;if(void 0===a)return[];if("number"==typeof a)return[a+""];if("string"!=typeof a)return[a];for(c=[],b={"text-decoration":{},"font-weight":{},"font-style":{},"baseline-shift":{},"font-size":{},"font-family":{}};;){if(f=a.search(g),-1===f)return c.push(["tspan",e(b),a]),c;if(f>0&&(j=a.slice(0,f),c.push(["tspan",e(b),j])),i=a.match(g)[0],d(b,h[i]),a=a.slice(f+i.length),0===a.length)return c}}var g=/<o>|<ins>|<s>|<sub>|<sup>|<b>|<i>|<tt>|<\/o>|<\/ins>|<\/s>|<\/sub>|<\/sup>|<\/b>|<\/i>|<\/tt>/,h={"<o>":{add:"text-decoration overline"},"</o>":{del:"text-decoration overline"},"<ins>":{add:"text-decoration underline"},"</ins>":{del:"text-decoration underline"},"<s>":{add:"text-decoration line-through"},"</s>":{del:"text-decoration line-through"},"<b>":{add:"font-weight bold"},"</b>":{del:"font-weight bold"},"<i>":{add:"font-style italic"},"</i>":{del:"font-style italic"},"<sub>":{add:"baseline-shift sub;font-size .7em"},"</sub>":{del:"baseline-shift sub;font-size .7em"},"<sup>":{add:"baseline-shift super;font-size .7em"},"</sup>":{del:"baseline-shift super;font-size .7em"},"<tt>":{add:"font-family monospace"},"</tt>":{del:"font-family monospace"}};c.parse=f},{}]},{},[31]);