const Button = ({text,bgColor,textColor,padding,rounded,uppercase,font,disabled = false,onClick = () => {},className = ""})=>
    
    {

    const classes = `${bgColor} ${textColor} ${padding} ${rounded} ${uppercase} ${font} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105 transition-transform'} transition duration-200
    ${className}`;
   
    return(
        <button
        onClick={onClick}
        disabled={disabled}
        className={classes.trim()}
        >
            {text}
        </button>
    )

}
export default Button;
