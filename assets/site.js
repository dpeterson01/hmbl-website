(function(){
  var d=document.documentElement;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!('IntersectionObserver' in window)||reduce) return;
  d.classList.add('motion');

  // Auto-tag reveal targets
  var sel=['.section-head','.split>header','.recog li','.recog-foot','.outcome','.honest li','.stage-lead','.stage-pair>div','.aside','.level','.pair p','.sizes>div','.steps li','.rows .row','.cta .wrap>*','.two>*'];
  document.querySelectorAll(sel.join(',')).forEach(function(el){
    if(el.closest('.hero')) return;
    el.classList.add('rv');
    var sib=el.parentElement?Array.prototype.indexOf.call(el.parentElement.children,el):0;
    el.style.setProperty('--i',Math.min(sib,6));
  });

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -8% 0px',threshold:0.12});
  document.querySelectorAll('.rv,.meter').forEach(function(el){ io.observe(el); });

  // Reading focus on the honesty lines
  var lines=document.querySelectorAll('.honest li');
  if(lines.length){
    var fo=new IntersectionObserver(function(es){
      es.forEach(function(e){ e.target.classList.toggle('focus',e.isIntersecting); });
    },{rootMargin:'-42% 0px -42% 0px'});
    lines.forEach(function(l){ fo.observe(l); });
  }

  // Header gains a backdrop once the page scrolls
  var nav=document.querySelector('.nav');
  var onScroll=function(){ nav&&nav.classList.toggle('scrolled',window.scrollY>8); };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
})();
