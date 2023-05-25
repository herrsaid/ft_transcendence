'use client'

export default function Icon(props)
{
  const handlemouseenter = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    const xstart=  buttonRect.left;
    const xend= (buttonRect.left+buttonRect.width);
    props.setTargetX({start: xstart,end: xend});
  };
  const handleClick = () => 
  {
    for(let a=0;a < 6 ; a++)
    { 
      let idd= document.getElementById(a.toString());
      if(idd.style.transform ==  "scale(1.5)")
        idd.style.transform = "scale(1)";
    }
    let idd= document.getElementById(props.idd);
    idd.style.transform = "scale(1.5)";
  }
  return(
    <div className= "mx-2" id={props.idd}>
        <button  onMouseEnter={handlemouseenter} onClick={handleClick}>
          {props.title}
        </button>
      </div>
      );
    }