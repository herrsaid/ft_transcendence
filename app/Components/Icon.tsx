'use client'

export default function Icon(props)
{
  const handlemouseenter = (event) => {
    const buttonRect = event.target.getBoundingClientRect();
    const xstart=  buttonRect.left;
    const xend= (buttonRect.left+buttonRect.width);
    props.setTargetX({start: xstart,end: xend});
  };
  return(
    <div className= "mx-2" id={props.idd}>
        <button  onMouseEnter={handlemouseenter}>
          {props.title}
        </button>
      </div>
      );
    }