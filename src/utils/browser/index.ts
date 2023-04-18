export function isWechat(){  
  var ua = navigator.userAgent.toLowerCase();
  　　var isWechat = ua.indexOf('micromessenger') != -1;
  　　if (isWechat) {
     　　 return true;
  　　}else{
     　　 return false;      
  　　}
  
}  
