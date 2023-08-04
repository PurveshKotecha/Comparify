import axios from 'axios';

export default class message{
	constructor(message,email,name){
		this.name = name;
		this.message = message;
		this.email = email;
	}
	
	async postmessage(){
		try{
			const res = await axios.post("http://localhost:4001/api/user/message", {
			name:this.name,
			message:this.message,
			email:this.email
			});
		console.log(res);	
			return res.status;
		}catch(error){
		// alert(error);
		return null;
	}
		
	}
}