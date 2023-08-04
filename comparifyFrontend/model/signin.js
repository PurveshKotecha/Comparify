import axios from 'axios';

export default class signin{
	constructor(username, password){
		this.username = username;
		this.password = password;
	}
	
	async login(){
		try{
			const res = await axios.post("http://localhost:4001/api/admin/login", {
			username:this.username,password:this.password});
		console.log(res);
			localStorage.setItem("jwt", res.data.jwt);
		return res.data.status;
		}catch(error){
		alert(error);
		return null;
	}
	}
}
