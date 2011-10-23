const POSTERS_PER_ROW = 108;
const RING_RADIUS = 300;

function randomString(){
	var chars = "£@ABCDEFGHJKLMNPQRSTUVWXTZあえおきけせまわやをのねひはれ";
	var string_length = 1;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}		

function setup_posters(row){
	var posterAngle = 360 / POSTERS_PER_ROW;
	for (var i = 0; i < POSTERS_PER_ROW; i ++) {
		var poster = document.createElement('div');
		poster.className = 'code';

		var transform = 'rotateX(' + (i*6) + 'deg) rotateY(' + (posterAngle * Math.floor(Math.random()*360)) + 'deg) translateZ(' + (RING_RADIUS+Math.floor(Math.random()*50)) + 'px)';
		poster.style.webkitTransform = transform;
		poster.style.opacity = Math.random();
		poster.style.fontSize = (Math.floor(Math.random()*42)+8)+"px";   
		poster.style.top = Math.floor(Math.random()*100)+"px";
		poster.style.left = Math.floor(Math.random()*300)+"px";

		var content = poster.appendChild(document.createElement('p'));
		content.textContent = randomString();
		row.appendChild(poster);
	}
}

function init(){
	setup_posters(document.getElementById('ring-1'));
	setup_posters(document.getElementById('ring-2'));
	setup_posters(document.getElementById('ring-3'));
}

window.addEventListener('load', init, false);
