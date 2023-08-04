
import axios from 'axios';
import slugify from 'slugify';

export default class Search {
	constructor(query, sortend){
		this.query = query;
		this.sortend = sortend;
	}
	
	async getResults() {
	const link = "http://localhost:4001/api/"
	var inputt = slugify(this.query,'+');
	try{
		document.querySelector('.loading').style.display="block";
		const outp = await axios(`${link}user/search?productName=${inputt}&sortBy=${this.sortend}`);
		document.querySelector('.loading').style.display="none";
		this.result = outp.data.data;
		this.length = outp.data.length;
		console.log(this.length);
		this.result.forEach(el => console.log(el));
		if(localStorage.getItem('data'))
			{
				localStorage.removeItem('data');
				localStorage.removeItem('length12');
				localStorage.removeItem('ser');
				console.log("in if to remove");
			}
		
		localStorage.setItem('data', JSON.stringify(this.result));
		localStorage.setItem('length12', this.length+"");
		localStorage.setItem('ser',this.query);
		return true;
	}catch(error){
		document.querySelector('.loading').style.display="none";
		alert(error);
		return null;
	}
}
}





