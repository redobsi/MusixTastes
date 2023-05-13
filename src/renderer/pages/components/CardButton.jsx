const CardButton = ({icon, OnClick}) => {
  return (
    <button className="card-button-wrapper" onClick={OnClick}>
        {icon}
    </button>
  )
}

export default CardButton