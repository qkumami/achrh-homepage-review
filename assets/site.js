/* ACHRH site — shared behaviour: mobile nav toggle. Preview only. */
(function(){
  var t=document.querySelector('.navtoggle'),m=document.getElementById('mobile-nav');
  if(t&&m){
    var c=m.querySelector('.close');
    t.addEventListener('click',function(){m.classList.add('open');m.setAttribute('aria-hidden','false');});
    if(c)c.addEventListener('click',function(){m.classList.remove('open');m.setAttribute('aria-hidden','true');});
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');}});
  }
})();
