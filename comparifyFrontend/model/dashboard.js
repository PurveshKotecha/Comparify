import axios from 'axios';

export default class signout{
	constructor(){
		
	}
	
	async logout(){
		try{
			const jwt = localStorage.getItem("jwt");
			const res = await axios.get("http://localhost:4001/api/admin/logout", {
				headers: {
					"authorization": `Bearer ${jwt}`
				}
			});
			localStorage.removeItem("jwt");
		console.log(res);	
		return res.data.status;
		}catch(error){
		alert(error);
		return null;
	}
		
	}
}


//message: "Logout successful!"
//status: "success"
