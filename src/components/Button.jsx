const Button = (props) => {
    const {text, style, onClick} = props;

    return (
        <button style={style} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;