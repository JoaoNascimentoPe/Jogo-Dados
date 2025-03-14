export default props =>
    {
        return (
          <div>
            <img src={`/images/Alea_${props.valor}.png`} alt={`Dado ${props.valor}`} width={100} />
          </div>
        );
      };