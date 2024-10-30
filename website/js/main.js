document.addEventListener("DOMContentLoaded",()=>{
	fetch('https://main-feed-service-nr6j26ghda-uk.a.run.app/main_feed', {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json',
	    'Origin': 'http://127.0.0.1/',
	    'Access-Control-Allow-Origin': '*'
	  }
	})
	.then(response=>{
		if(!response.ok){
			throw new Error("Network response was not ok");
		}
		return response.json();
	})
	.then(data=>{
		let list =data.items;
		if(data){
			for(let i=0;i<list.length;i++){
				//console.log(i)
				let divi=document.createElement("div");
				divi.classList="contentwrap template"+i;
				divi.innerHTML=gc("template")[0].innerHTML;
				gc("maintable")[0].after(divi);
				divi.querySelector(".font1").textContent="user"+list[i].pid;
				divi.querySelector(".area").textContent=list[i].title;
				divi.querySelector(".content").textContent=list[i].content;
				divi.querySelector(".contentwrapfooter").innerHTML="";
				if(list[i].comments.length>0){
					let comments=list[i].comments;
					for(let l=0;l<comments.length;l++){
						let divl=document.createElement("div");
						divl.classList="contentwrap contentwrapmin";
						divl.innerHTML=gc("template")[0].querySelector(".contentwrapmin").innerHTML;
						divi.querySelector(".contentwrapfooter").appendChild(divl);
						divl.querySelector(".font1").textContent=comments[l].writer_uni;
						divl.querySelector(".area").textContent=comments[l].title;
						divl.querySelector(".content").textContent=comments[l].content;
						divl.querySelector(".goodnum").textContent=comments[l].likes;
						
						if(comments[l].replies.length>0){
							let replies=comments[l].replies
							for(let o=0;o<replies.length;o++){
								let divo=document.createElement("div");
								divo.classList="contentwrap contentwrapmin";
								divo.innerHTML=gc("template")[0].querySelector(".contentwrapmin").innerHTML;
								divl.querySelector(".contentwrapfooter").appendChild(divo);
								divo.querySelector(".font1").textContent=replies[o].writer_uni;
								divo.querySelector(".area").textContent=replies[o].title;
								divo.querySelector(".content").textContent=replies[o].content;
								divo.querySelector(".goodnum").textContent=replies[o].likes;
							}
						}
					}
				}
			}
		}
	})
	.catch(error=>{
		console.error('There was a problem with the fetch operation:', error);
	}) 
	/* var url="https://mainfeed-service-image-2-745799261495.us-east4.run.app/main_feed";
	var request=new XMLHttpRequest();
	request.open("get",url);
	request.send(null);
	request.onload=function(){
		if(request.status == 200){
			var json=JSON.stringify(request.responseText);
			console.log(json);
		}
	} */
	function gc(cls){
		return document.getElementsByClassName(cls);
	}
})