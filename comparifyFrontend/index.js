import axios from 'axios';
//import formdata from 'form-data';
//import * as fs from 'fs';
import Search from './model/search';
import message from './model/message';
import signin from './model/signin';
import signout from './model/dashboard';
const loc = window.location.href;
const com = loc.split("/").slice(-1);

// Viewport
if(com[0].startsWith("index.html") || com[0].startsWith("results.html") || com[0].startsWith("login.html") || com[0].startsWith("contact.html")){

   const viewname = com[0].split(".");
	window.addEventListener('load', async function(){
		if(viewname[0] == "index"){
			viewname[0] = "home";
		}
		try{
			const viewhome = await axios.post("http://localhost:4001/api/user/view", {
				pageName:viewname[0]
			}); 
			console.log(viewhome);
		}catch(error){}
	}) 
	
	
	
}

if(com[0].startsWith("index.html"))
{
	
	
    window.addEventListener('load',async function(){
          try{
		
		let adverts = await axios.get("http://localhost:4001/api/admin/advertisement");
		adverts.data.data.forEach(el=>{
			document.getElementById(el.adType).src="http://localhost:4001/"+el.adUrl;
			document.getElementById(el.adType).alt=el.adAltText;
			document.getElementById(el.adType+"-a").href=el.adAltUrl;
		});
		console.log('adverts loaded succesfully');

	  }catch(err){console.log(err);alert('unable to load product highlights');}
    })
}

const searchFun = async function() {
	console.log("working");
	let str = document.getElementById("searchbar").value;
	let sorting = document.getElementById("sort").value; 
	if(!str)
	{
		document.getElementById("searchbar").focus();
		alert('Enter product you want to search!');
		return null;
	}
	const search = new Search(str, sorting);
	console.log(search);
	if(await search.getResults()){
	  		location.href=`./results.html`;
	   }
}

/*search area */
if(com[0].startsWith("index.html") || com[0].startsWith("results.html")){	
	
	document.querySelector('.dropdown-nav').addEventListener('click',function(){
		document.querySelector('.nav-options').classList.toggle('nav-toggler');
	});
	Array.from(document.querySelectorAll('#searchbar')).forEach(el=>el.addEventListener('keypress',async(event)=>{
		if(event.key=="Enter"){
			await searchFun();
		}
	}));
	Array.from(document.querySelectorAll("#myBtn")).forEach(el=>el.addEventListener("click",searchFun));
}


if(com[0].startsWith("results.html")){
	// sortbtn-2
	Array.from(document.querySelectorAll('#searchbar'))[1].addEventListener('change',function(){

		Array.from(document.querySelectorAll('#searchbar'))[0].value=Array.from(document.querySelectorAll('#searchbar'))[1].value;
		// console.log(Array.from(document.querySelectorAll('#searchbar'))[0].value);
		// console.log(Array.from(document.querySelectorAll('#searchbar'))[1].value);
		
	});
	document.querySelector('.sortbtn-2').addEventListener('change',function(){
		document.querySelector('.sortbtn-1').value=document.querySelector('.sortbtn-2').value;
		console.log(document.querySelector('.sortbtn-1').value);
		console.log(document.querySelector('.sortbtn-2').value);
	});
	window.addEventListener('load', function() {
		let data = localStorage.getItem('data');
		let length = localStorage.getItem('length12');
		let sear = localStorage.getItem('ser');	
		data = JSON.parse(data);
		console.log(data);
		console.log(length);
		displayline(length,sear);	
		
		data.forEach(el => displayResults(el));	
		
		//viewcount
		
		console.log(document.querySelectorAll('.redirect-btn'));
		Array.from(document.querySelectorAll('.redirect-btn')).forEach(el =>{
			console.log("el");														   
			el.addEventListener('click', async function(){
				let redirect = el.dataset.href;
				console.log(redirect);
				let res;
				try{
					res = await axios.post("http://localhost:4001/api/user/redirect", {
					redirectTo: redirect
					
				});
				}catch(error){
					console.log(error);
				}
				
				console.log(res);
				location.href=redirect;
		})
		}
			
	);
});
	
	
	
	
}	

const displayline = (len,st) => {
	const uperline = `

	<div class="row search-text-cover">
                <div class="col-12 search-text">
                    ${len} search results found for <b>"${st}"</b>
                </div>
            </div>

	`;
	document.querySelector('.main').insertAdjacentHTML('beforeend', uperline);
}

const displayResults = (data,len,st) => {
	if(data.rating== null || data.rating== ""){
		data.rating = 2;
	}
	var str = data.link.split("/");
	
	var x=data.price;
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var price = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
	
	const markup = `
	<div class="row result-box">
                <div class="col-3 result-img">
                    <img src='${data.imgurl}'>
                </div>
                <div class="col-9 result-details">
                    <div class="result-title">
                        <h3>${data.title}</h3>
                    </div>
                    <div class="result-desc">
                        <span class="result-price">
                            ₹${price}
                        </span>
                        <span class="result-rating">
                            ${data.rating} <i class="bi bi-star-fill"></i>
                        </span>
                    </div>
                    <div class="result-seller">
                        <span class="result-url">
                            Intrested? <a data-href='${data.link}' class="redirect-btn">CLICK HERE</a>
                        </span>
                    </div>
                    <div class="result-warning">
                        <span class="result-msg">
                            By clicking above button, you will be redirected to ${str[2]}!
                        </span>
                    </div>
                </div>
            </div>

	`;
	document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
}

//catogory
if(com[0].startsWith("index.html"))
Array.from(document.querySelectorAll(".category-col")).forEach(el => el.addEventListener("click", function(){
	const type = el.dataset.name;
	document.getElementById("searchbar").value=type;
	document.getElementById("myBtn").click();
	}));

//contact page 

if(com[0].startsWith("contact.html")){
Array.from(document.querySelectorAll('.form-submit')).forEach(el=>el.addEventListener("click", async function(){
	
	const formName = document.getElementById('form-name').value;
	const formEmail = document.getElementById('form-email').value;
	const formQuery = document.getElementById('form-query').value;
	// if(!formName || !formEmail || !formQuery){
	// 	alert("all required fields are not defined");
	// 	return null;
	// }
	if(!formName)
	{
		document.getElementById('form-name').focus();
		alert("Name is not defined!");
		return null;
	}
	if(!formEmail)
	{
		document.getElementById('form-email').focus();
		alert("Email is not defined!");
		return null;
	}
	if(!formQuery)
	{
		document.getElementById('form-query').focus();
		alert("Query is not defined!");
		return null;
	}
	
	const Message = new message(formQuery,formEmail,formName);
	console.log(Message);
	if(await Message.postmessage() == 200){
		alert("message successfully sent");
                document.getElementById('form-name').value="";
		document.getElementById('form-email').value="";
		document.getElementById('form-query').value="";
	}
	else{
		alert("Email you entered is not valid!");
	}
	
}))};

//login page
if(com[0].startsWith("login.html")){
	document.querySelector('.login-submit-btn').addEventListener("click", async function(){
		const userName = document.getElementById('login-name').value;
		const userPassword = document.getElementById('login-password').value;
		if(!userName || !userPassword){
			alert("all required fields are not define");
			return null;
		}
		const SignIn = new signin(userName,userPassword);
		console.log(SignIn);
		if(await SignIn.login()== "success"){
			location.href=`./admin.html`;
			console.log("hello");
		}	
		else{
			alert("something went wrong");
		}
		}
)}

//Admin DashBoard 

if(com[0].startsWith("admin.html")){
	
	document.querySelector('.loginBtn').addEventListener("click", async function(){
		const SignOut = new signout();
		if(await SignOut.logout() == "success"){
			location.href=`./login.html`;
		}	
		else{
			alert("something went wrong");
		}
	});
	const jwt = localStorage.getItem("jwt");
	window.addEventListener("load", async function(){
		
		try{
			
			let viewCount = await axios.get("http://localhost:4001/api/admin/view", {
				headers: {
					"authorization": `Bearer ${jwt}`
				}});
			let searchCount = await axios.get("http://localhost:4001/api/admin/search", {
				headers: {
					"authorization": `Bearer ${jwt}`
				}});
			let redirectCount = await axios.get("http://localhost:4001/api/admin/redirect", {
				headers: {
					"authorization": `Bearer ${jwt}`
				}});
			let messages = await axios.get("http://localhost:4001/api/admin/message", {
				headers: {
					"authorization": `Bearer ${jwt}`
				}});
			let adverts = await axios.get("http://localhost:4001/api/admin/advertisement", {
				headers: {
					"authorization": `Bearer ${jwt}`
				}});
		console.log(viewCount);
		console.log(searchCount);
		console.log(redirectCount);
		console.log(messages);	
		
		console.log(adverts);
			document.getElementById("viewsCount").textContent=viewCount.data.viewCount;
			document.getElementById("searchesCount").textContent=searchCount.data.searchCount;
			document.getElementById("redirectCount").textContent=redirectCount.data.redirectCount;
			document.getElementById("msgCount").textContent=messages.data.data.length;
			///////////////
			
			const mespass = (data) => {
				const mes = `

                <div class="col-lg-4 col-sm-6 message-cont " id="${data._id}">
                    <div class="message-cover">
                        <div class="sender-name">${data.name}<i class="bi bi-x-circle" data-id="${data._id}"></i></div>
                    <div class="sender-email">${data.email}</div>
                    <div class="sender-desc">${data.message}</div>
                    </div>     

`	
		document.querySelector('.messages-row').insertAdjacentHTML('beforeend', mes);	
			}
			messages.data.data.forEach(el => mespass(el));
		Array.from(document.querySelectorAll(".bi-x-circle")).forEach(el => el.addEventListener("click", async function(){
			
			console.log(el.dataset.id);
			let deletemes = await axios.delete("http://localhost:4001/api/admin/message?msgId="+el.dataset.id, {
				headers: {
					"authorization": `Bearer ${jwt}`
				}})
			document.getElementById(el.dataset.id).parentNode.removeChild(document.getElementById(el.dataset.id));
			document.getElementById("msgCount").textContent=parseInt(document.getElementById("msgCount").textContent)-1;
			console.log(document.getElementById("msgCount").innerHtml);
		}))
			
		//adverts
			const setImage = (data) => {
					document.getElementById(data.adType+"-id").value=data.adAltUrl;
					document.getElementById(data.adType).src= "http://localhost:4001/"+data.adUrl;
			}
			
			adverts.data.data.forEach(el => setImage(el))
			
		} catch(error) {
				console.log(error);
		}
		let element;
		Array.from(document.querySelectorAll(".upload-btn")).forEach(el  => el.addEventListener("click", async function(){
				element = el;
				document.getElementById("file-select").click();
					   
					}))
		document.getElementById("file-select").addEventListener("change", async function(){
			try{
			if(!(document.getElementById("file-select").value==""))
                        {
			console.log(element);
			let val = document.getElementById("file-select").files[0];
			console.log(val);
			if(!val||val['type'].split('/')[0]!="image")
			{
			   alert('selected file is not an image!');
                           return null;
			}
			document.getElementById(element.id.split("-")[0]).src="";
                        console.log(document.getElementById(element.id.split("-")[0]+"-id").value);
			console.log(document.getElementById(element.id.split("-")[0]+"-id"));
                        console.log(element.id.split("-")[0]+"-id");
                        console.log(element.id);
			const formdata = new FormData();
			formdata.append('advertImage', val);
			formdata.append('adAltUrl', document.getElementById(element.id.split("-")[0]+"-id").value);
			formdata.append('adType', element.id.split("-")[0]);
			let additem = await axios.post("http://localhost:4001/api/admin/advertisement", formdata,{
				headers: {
//					...FormData.getHeaders(),
					"authorization": `Bearer ${jwt}`,
					
				}});
                        //update image in UI
                        document.getElementById(additem.data.newAdvert.adType).src="http://localhost:4001/"+additem.data.newAdvert.adUrl;
			console.log(additem);
                        document.getElementById("file-select").value="";
                        }
			}catch(err){alert(err);console.log(err);document.getElementById("file-select").value="";}
                        
		});
//https://localhost:4001
                Array.from(document.querySelectorAll(".delete-btn")).forEach(el=>el.addEventListener("click",async function(){
                try{
                let res;
                try{
		res= await axios.delete("http://localhost:4001/api/admin/advertisement?adType="+el.id.split("-")[0], {
				headers: {
					"authorization": `Bearer ${jwt}`
				}});
                }catch(err){
                console.log('failed once');
		res= await axios.delete("http://localhost:4001/api/admin/advertisement?adType="+el.id.split("-")[0], {
				headers: {
					"authorization": `Bearer ${jwt}`
		}});
		}
		console.log(res);
                //delete from UI
                document.getElementById(el.id.split('-')[0]).src="./../images/advertisement.png";
		document.getElementById(el.id.split("-")[0]+"-id").value="";
                }catch(err){
                    alert(err);
                }
		}));

		Array.from(document.querySelectorAll(".bi-plus-circle")).forEach(el=>el.addEventListener("click",async function(){

			try{
			    const res=await axios.patch("http://localhost:4001/api/admin/advertisement",{
                               adType:el.id.split('-')[0],
                               adAltUrl:document.getElementById(el.id.split("-")[0]+"-id").value
			    },
			    {
				headers: {
					"authorization": `Bearer ${jwt}`
				}
			    }
			    );
                            alert('Url succesfully saved!');
			}
			catch(err){console.log(err);alert('You need to upload a advertisement, before setting url!');}
		

		}));
                
	});
	
	
	
}
	