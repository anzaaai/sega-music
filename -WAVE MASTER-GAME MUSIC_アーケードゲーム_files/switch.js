window.onload = function(){
	createTab();
	hideHeading();
	showCategory('LineA');
	setTabClick('aNav','LineA');
	setTabClick('kaNav','LineKA');
	setTabClick('saNav','LineSA');
	setTabClick('taNav','LineTA');
	setTabClick('naNav','LineNA');
	setTabClick('haNav','LineHA');
	setTabClick('maNav','LineMA');
	setTabClick('yaNav','LineYA');
	setTabClick('raNav','LineRA');
	setTabClick('waNav','LineWA');
	setTabClick('numNav','LineNUM');
	setTabClick('alfNav','LineALF');
};

function hide(elementId) {
	document.getElementById(elementId).style.display = "none";
}
function show(elementId) {
	document.getElementById(elementId).style.display = "block";
}
function hideHeading() {
	hide('tab_A');
	hide('tab_KA');
	hide('tab_SA');
	hide('tab_TA');
	hide('tab_NA');
	hide('tab_HA');
	hide('tab_MA');
	hide('tab_YA');
	hide('tab_RA');
	hide('tab_WA');
	hide('tab_NUM');
	hide('tab_ALF');
}
function showCategory(categoryName){
	hide('LineA'); 
	hide('LineKA'); 
	hide('LineSA'); 
	hide('LineTA'); 
	hide('LineNA'); 
	hide('LineHA'); 
	hide('LineMA'); 
	hide('LineYA'); 
	hide('LineRA'); 
	hide('LineWA'); 
	hide('LineNUM'); 
	hide('LineALF'); 
	show(categoryName);
	changeTab(categoryName);
}
function createTab() {
	var wrapper = document.getElementById("wrapper");
	var content = document.getElementById("content");
	var nav = document.createElement("ul");
	nav.setAttribute('id','nav');
	nav.appendChild(createListItem('aNav','#LineA','¥¢¡Á¥ª'));
	nav.appendChild(createListItem('kaNav','#LineKA','¥«¡Á¥³'));
	nav.appendChild(createListItem('saNav','#LineSA','¥µ¡Á¥½'));
	nav.appendChild(createListItem('taNav','#LineTA','¥¿¡Á¥È'));
	nav.appendChild(createListItem('naNav','#LineNA','¥Ê¡Á¥Î'));
	nav.appendChild(createListItem('haNav','#LineHA','¥Ï¡Á¥Û'));
	nav.appendChild(createListItem('maNav','#LineMA','¥Þ¡Á¥â'));
	nav.appendChild(createListItem('yaNav','#LineYA','¥ä¡Á¥è'));
	nav.appendChild(createListItem('raNav','#LineRA','¥é¡Á¥í'));
	nav.appendChild(createListItem('waNav','#LineWA','¥ï¡Á¥ò'));
	nav.appendChild(createListItem('numNav','#LineNUM','0¡Á9'));
	nav.appendChild(createListItem('alfNav','#LineALF','A¡ÁZ'));
	wrapper.insertBefore(nav,content);
}
function createListItem(id,href,text) {
	var li = document.createElement("li");
	var a = document.createElement("a");
	var t = document.createTextNode(text);
	li.setAttribute('id',id);
	a.setAttribute('href',href);
	a.appendChild(t);
	li.appendChild(a);
	return li;
}
function setTabClick(listName,categoryName) {
	var e = document.getElementById(listName).getElementsByTagName('a')[0];
	e.onclick = function(){
		showCategory(categoryName);
		return false;
	};
}
function changeTab(categoryName){
	var e = document.getElementById('nav');
	e.className = categoryName;
}