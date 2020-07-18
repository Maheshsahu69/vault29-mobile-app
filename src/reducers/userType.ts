export default function(state:any,action:any){
    if(action.type==='SELECT_USER_TYPE'){
        console.log("Selected User Type: ",action.payload);
        
    }
   
     return  {action} ;
}

