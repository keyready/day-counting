"use strict";(self.webpackChunkhack_change_2023_client=self.webpackChunkhack_change_2023_client||[]).push([[527],{6756:(e,t,n)=>{n.d(t,{b:()=>p});var r=n(4942),i=n(885),s=n(5987),o=n(7294),a=n(3329),l=n(5893),c=["children","step"];function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var p=(0,o.memo)((function(e){var t=e.children,n=e.step,r=void 0===n?1500:n,d=(0,s.Z)(e,c),p=(0,o.useState)(window.innerWidth),f=(0,i.Z)(p,2),m=f[0],h=f[1];return(0,o.useEffect)((function(){var e=function(){h(window.innerWidth)};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),m>r?(0,l.jsx)(a.U,u(u({},d),{},{children:t})):(0,l.jsx)(a.g,u(u({},d),{},{children:t}))}))},9527:(e,t,n)=>{n.r(t),n.d(t,{default:()=>H});var r=n(4942),i=n(9330),s=n(7294),o=n(3942),a=n(6460),l=n(6466),c=n(8918),d=n(3329),u=n(8502),p=n(9201),f=n(2469),m=n(4841),h=n(85),x=n(6367),g=n(3652),v=n(3643);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function j(e){var t=function(e,t){if("object"!==b(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===b(t)?t:String(t)}var y={root:function(e){var t=e.props;return(0,v.AK)("p-skeleton p-component",{"p-skeleton-circle":"circle"===t.shape,"p-skeleton-none":"none"===t.animation})}},w=g.V.extend({defaultProps:{__TYPE:"Skeleton",shape:"rectangle",size:null,width:"100%",height:"1rem",borderRadius:null,animation:"wave",style:null,className:null},css:{classes:y,inlineStyles:{root:{position:"relative"}},styles:'\n@layer primereact {\n    .p-skeleton {\n        position: relative;\n        overflow: hidden;\n    }\n    \n    .p-skeleton::after {\n        content: "";\n        animation: p-skeleton-animation 1.2s infinite;\n        height: 100%;\n        left: 0;\n        position: absolute;\n        right: 0;\n        top: 0;\n        transform: translateX(-100%);\n        z-index: 1;\n    }\n    \n    .p-skeleton-circle {\n        border-radius: 50%;\n    }\n    \n    .p-skeleton-none::after {\n        animation: none;\n    }\n}\n\n@keyframes p-skeleton-animation {\n    from {\n        transform: translateX(-100%);\n    }\n    to {\n        transform: translateX(100%);\n    }\n}\n'}});function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){var r,i,s;r=e,i=t,s=n[t],(i=j(i))in r?Object.defineProperty(r,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):r[i]=s})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var P=s.memo(s.forwardRef((function(e,t){var n=s.useContext(x.Ou),r=w.getProps(e,n),i=w.setMetaData({props:r}),o=i.ptm,a=i.cx,l=i.sx,c=i.isUnstyled;(0,g.e)(w.css.styles,c,{name:"skeleton"});var d=s.useRef(null);s.useImperativeHandle(t,(function(){return{props:r,getElement:function(){return d.current}}}));var u=r.size?{width:r.size,height:r.size,borderRadius:r.borderRadius}:{width:r.width,height:r.height,borderRadius:r.borderRadius},p=(0,v.dG)({ref:d,className:(0,v.AK)(r.className,a("root")),style:k(k({},u),l("root"))},w.getOtherProps(r),o("root"));return s.createElement("div",p)})));P.displayName="Skeleton";var S=n(6756),z=n(2253),E=n(3379),N=n.n(E),D=n(7795),W=n.n(D),C=n(569),F=n.n(C),Z=n(3565),_=n.n(Z),A=n(9216),R=n.n(A),U=n(4589),L=n.n(U),T=n(1637),G={};G.styleTagTransform=L(),G.setAttributes=_(),G.insert=F().bind(null,"head"),G.domAPI=W(),G.insertStyleElement=R(),N()(T.Z,G);const X=T.Z&&T.Z.locals?T.Z.locals:void 0;var q=n(5893);const H=function(){(0,s.useEffect)((function(){document.title="Обратный отсчет"}),[]);var e=(0,z.L)(),t=(0,o.v9)(a.is),n=(0,m.H9)((null==t?void 0:t.id)||-1),x=n.currentData,g=n.isFetching,v=n.error,b=n.refetch,j=(0,m.tj)((null==t?void 0:t.id)||-1),y=j.currentData,w=j.isFetching,O=j.refetch;(0,s.useEffect)((function(){O(),b()}),[O,b]);var k=(0,s.useCallback)((function(){return"list"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"grid")?(0,q.jsx)(d.g,{maxW:!0,gap:"16",className:X.CounterList,children:new Array(5).fill(0).map((function(e,t){return(0,q.jsx)(P,{width:"100%",height:"50px"},t)}))}):(0,q.jsx)("div",{className:X.CounterGrid,children:new Array(8).fill(0).map((function(e,t){return(0,q.jsx)(P,{width:"100%",height:"200px"},t)}))})}),[]);return(0,q.jsxs)(i.T,{children:[(0,q.jsxs)(S.b,{maxW:!0,step:1200,gap:"32",children:[(0,q.jsxs)(d.g,{maxW:!0,children:[(0,q.jsxs)(d.U,{maxW:!0,justify:"between",children:[(0,q.jsx)(l.xv,{title:null!=t&&t.name?"Привет, ".concat(t.name,"!"):"Привет!",size:"large"}),!(null!=t&&t.name)&&e<1200&&(0,q.jsx)(p.F,{to:h.h3.auth,children:"Кто я?.."})]}),(0,q.jsx)(c.i,{className:X.divider}),(0,q.jsx)(l.xv,{title:"Это приложение я сделал специально для тебя!"}),(0,q.jsx)(l.xv,{text:"Здесь ты сможешь отслеживать, сколько времени осталось до какого-либо события."}),(0,q.jsx)(l.xv,{text:"Ты можешь добавлять общие счетчики, как ниже, — их видят все. А можешь только те, которые будут только для тебя. И при желании сможешь поделиться ими со своим другом, который тоже использует это приложение"}),(0,q.jsx)(c.i,{className:X.divider}),(0,q.jsx)(l.xv,{title:"Ты уж извини, что дизайн такой скромный, на большее фантазии не хватило...",size:"small"}),e<1200&&(0,q.jsx)(c.i,{className:X.divider})]}),(0,q.jsxs)(d.g,{maxW:!0,className:X.todo,children:[(null==t?void 0:t.id)&&w&&k("list"),(null==t?void 0:t.id)&&(null==y?void 0:y.length)&&(0,q.jsx)(m.gV,{counters:y}),!w&&!(null!=y&&y.length)&&(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(l.xv,{title:"Тут будут твои персональные счетчики, когда ты"}),(0,q.jsxs)(d.g,{maxW:!0,children:[(0,q.jsxs)(d.U,{maxW:!0,gap:"16",children:[(0,q.jsx)(l.xv,{headerClassname:(0,u.A)("",(0,r.Z)({},X.done,!(null==t||!t.name))),title:"a) авторизуешься",size:"small"}),!(null!=t&&t.name)&&e>700&&(0,q.jsxs)(p.F,{className:X.link,to:h.h3.auth,children:["странно, почему ты этого еще не сделал...",(0,q.jsx)(f.Uq2,{})]})]}),(0,q.jsxs)(d.U,{maxW:!0,children:[(0,q.jsx)(l.xv,{title:"б) создашь их!",size:"small"}),(null==t?void 0:t.name)&&!(null!=y&&y.length)&&(0,q.jsxs)(p.F,{className:X.link,to:h.h3.createcounter,children:["полетели?)",(0,q.jsx)(f.Uq2,{})]})]})]})]})]})]}),(0,q.jsx)(c.i,{className:X.divider}),(0,q.jsxs)(d.g,{maxW:!0,children:[(0,q.jsx)(l.xv,{size:"large",title:"А вот тут общие счетчики"}),(null==x?void 0:x.length)&&(0,q.jsx)(m.Fd,{counters:x}),!g&&!(null!=x&&x.length)&&!v&&(0,q.jsxs)(q.Fragment,{children:[(0,q.jsx)(l.xv,{size:"large",text:"Только вот почему-то их никто не создал..."}),(0,q.jsx)(p.F,{to:h.h3.createcounter,children:"Будешь первым?"})]}),!(null!=x&&x.length)&&(0,q.jsx)(l.xv,{size:"large",text:"Никто ничего не ждет... Будешь первым?"}),g&&k()]})]})}},1637:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(8081),i=n.n(r),s=n(3645),o=n.n(s)()(i());o.push([e.id,".dc2cd{margin:20px 0}.dc2cd:last-child{margin-bottom:0}.f027b{margin:0 20px;display:block;align-self:stretch}.a413d{align-self:start}.aa265{text-decoration:line-through}.c960e{font-size:16px;text-decoration:underline !important;font-style:italic}.a1a8f{width:100%;padding:20px;border-radius:10px;background:rgba(0,0,0,.1);display:grid;grid-template-columns:repeat(3, 1fr);grid-gap:10px}.d0c69{width:100%;padding:20px;border-radius:10px;background:rgba(0,0,0,.1)}",""]),o.locals={divider:"dc2cd",vert_divider:"f027b",todo:"a413d",done:"aa265",link:"c960e",CounterGrid:"a1a8f",CounterList:"d0c69"};const a=o}}]);