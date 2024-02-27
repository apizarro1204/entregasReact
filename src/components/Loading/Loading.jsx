const Loading = ({ loading }) => {
    // En caso de que se le envie loading = true se mostrara el mensaje de carga
    if(loading){
    return(
        <h4>Cargando...</h4>
    )}
}

export default Loading