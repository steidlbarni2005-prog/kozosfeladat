document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('msgSendBtn').addEventListener('click',msgSendBtn);
});
    const postFetch= async(url,data)=>{
        try{
            const response = await fetch(url,{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(data)
            });
        
        if(!response.ok){
            throw new Error('hiba'+ response.statusText+'('+response.status+'9')
        }
        return await response.json();
    }catch(error){
        throw new Error('hiba',error);
    }

}
const msgSendBtn = async ()=>{
    
    try{
        const message = document.getElementById('msgText').value;
        if(message!==''){
            
            const response= await postFetch('/api/saveData',{
                key:message
            });
            
            console.log(response);
            const div=document.createElement('div');
            div.innerText=response.message;
            setTimeout(function(){
                div.innerText="";
                document.getElementById('msgText').value='';
            },2000);
        }
    }catch(error){
        console.error('HiBA: '+error)
    }
};