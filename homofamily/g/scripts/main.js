"use strict";function setMpFilterAnimation(e,n,t,r){new ScrollMagic.Scene({triggerElement:"#"+t,triggerHook:"onEnter",duration:"100%",offset:-30,reverse:!0}).addTo(e).on("end",function(){$("#shuffle-mp-figure").detach().appendTo("#"+t+" .mp-figure"),n.filter(r),currentMpBoxID=t})}var currentMpBoxID="scene-mp-intro",MP_LIST=[{scene:"scene-mp-intro",key:""},{scene:"scene-mp-sp",key:"SP"},{scene:"scene-mp-ps",key:"PS"},{scene:"scene-mp-nt",key:"NT"},{scene:"scene-mp-na",key:"NA"}];$(document).ready(function(){var e=window.shuffle,n=document.getElementById("shuffle-mp-figure");$("#first-mp-box").css("min-height",$("#shuffle-mp-figure").height());var t=new e(n,{itemSelector:".mp-item"});n.addEventListener(e.EventType.LAYOUT,function(){$("#"+currentMpBoxID+" .mp-figure").css("min-height",$("#"+currentMpBoxID+" .mp-figure").height())});for(var r=new ScrollMagic.Controller,i=0;i<MP_LIST.length;i++)setMpFilterAnimation(r,t,MP_LIST[i].scene,MP_LIST[i].key)});