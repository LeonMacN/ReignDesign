function deleteFeed(id){
    axios.delete('/deleteFeed', {params: {id:id}}).then(function(resp){
        console.log(resp);
        location.reload();
    });
}