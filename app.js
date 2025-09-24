(() => {
  const games = [
    {id:'mines', title:'Mines', desc:'Подсказка безопасных клеток', icon:'/icons/icon-mines.png'},
    {id:'aviator', title:'Aviator', desc:'Прогноз коэф. взлёта', icon:'/icons/icon-aviator.png'},
    {id:'luckyjet', title:'Lucky Jet', desc:'Прогноз коэф. взлёта', icon:'/icons/icon-lucky.png'},
    {id:'plinko', title:'Plinko', desc:'Прогноз сектора падения', icon:'/icons/icon-plinko.png'},
    {id:'crash', title:'Crash', desc:'Прогноз множителя', icon:'/icons/icon-crash.png'}
  ];

  const menu = document.getElementById('menu');
  const screen = document.getElementById('screen');

  games.forEach(g => {
    const t = document.createElement('div');
    t.className='tile';
    t.innerHTML = `<img src="${g.icon}" alt=""><h3>${g.title}</h3><div class="small">${g.desc}</div>`;
    t.onclick = ()=>openGame(g.id);
    menu.appendChild(t);
  });

  const rand = (n)=>Math.floor(Math.random()*n);
  const choice = (arr)=>arr[rand(arr.length)];

  function genMines(){ return {cells:choice([3,4,5,6])}; }
  function genAviator(){ return {mult:(1+Math.random()*10).toFixed(2)}; }
  function genLuckyJet(){ return {mult:(1+Math.random()*12).toFixed(2)}; }
  function genPlinko(){ return {bucket:rand(7)+1}; }
  function genCrash(){ return {cat:choice(['Low','Medium','High']),mult:(1+Math.random()*20).toFixed(2)}; }

  function openGame(id){
    screen.innerHTML='';
    const el = document.createElement('div'); el.className='card';
    const h = document.createElement('h3'); h.innerText=games.find(x=>x.id===id).title; el.appendChild(h);
    const btn = document.createElement('button'); btn.innerText='Получить сигнал'; el.appendChild(btn);
    const sigBox = document.createElement('div'); sigBox.className='signal'; el.appendChild(sigBox);
    const hist = document.createElement('div'); hist.className='history'; el.appendChild(hist);

    function render(){
      let s;
      if(id==='mines') s=`Рекомендовано безопасных клеток: ${genMines().cells}`;
      if(id==='aviator') s=`Прогноз: ${genAviator().mult}x`;
      if(id==='luckyjet') s=`Lucky Jet: ${genLuckyJet().mult}x`;
      if(id==='plinko') s=`Plinko бакет: ${genPlinko().bucket}`;
      if(id==='crash') {let g=genCrash(); s=`Crash: ${g.cat} — ${g.mult}x`;}
      sigBox.innerText = s;
      const d = document.createElement('div'); d.innerText=s;
      hist.prepend(d);
    }

    btn.onclick = render;
    screen.appendChild(el);
    render(); // первый сигнал сразу
  }
})();