var sp = document.querySelector('#sol_pay');
var s = document.createElement('span');
s.innerText = "Donate ";
s.style['font-weight'] = '500';
s.style['font-size'] = '20px';
s.style.border = '1px solid';
s.style.padding = '5px';
s.style['border-radius'] = '5px';
s.style.cursor = 'pointer';
s.style.position = 'relative';
s.onclick = donate;

var i = document.createElement('img');
i.src = "http://localhost:3000/images/sp-black.svg";
i.style['margin-top'] = '-4px';
i.style.with = '60px';

var f = document.createElement('input');
f.min = "1.00";
f.max = "10000.00";
f.step = "0.5";
f.type = 'number';
f.placeholder = '$5.00';
f.style.fontSize = '20px';
f.style.width = '100px';

sp.appendChild(f);
sp.appendChild(s);
s.appendChild(i);

function donate(){
  const value = document.querySelector('#sol_pay input').value;
}