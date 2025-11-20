document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('addname').addEventListener('click',addName);


});


const postFetch= async(url,data)=>{
    try{
        const response = await fetch(url,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        });
    
    if(!response.ok){
        throw new Error('hiba'+ response.statusText+'('+response.status+')')
    }
    return await response.json();
}catch(error){
    throw new Error('hiba',error);
}

}
const addName= async () => {
     
   try{
        const message = document.getElementById('nevadas').value;
        if(message!==''){
            const response= await postFetch('/api/postdata',{
                key:message
            });
            console.log(response);
            const div=document.createElement('div');
            div.innerText=response.key;
            setTimeout(function(){
                div.innerText="";
                document.getElementById('nevadas').value='';
            },2000);
        }
    }catch(error){
        console.error('HiBA: '+error)
    }

                try {
            const result = await getMethodFetch('api/postdata');
            src = result.message;
        } catch (error) {
            console.error("Hiba: " + error);
        }

};
const getMethodFetch = (url) => {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Hiba: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(`Hiba történt: ${error.message}`);
    });
};







