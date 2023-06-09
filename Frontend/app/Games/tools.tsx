import { sharedData } from './page'

function sleep(ms :any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function left_trans_obj1(arr: any)
{
  let xpos1=15,xpos2=40,xpos3=65;
  let opacity=1;
    for(let a=0;a<3;a++)
    {
      if(a === 0)
      {
        sharedData.id3 = setInterval(()=>
        {
          xpos1--;
          if(xpos1 === 2)
            xpos1 = 80;
          if(xpos1 > 65)
            opacity += 0.2;
          else
            opacity -= 0.1;
          arr[a].style.left = `${xpos1.toString()}%`;
          arr[a].style.opacity = `${opacity.toString()}`;
          if(xpos1 === 65)
          {
            clearInterval(sharedData.id3);
            sharedData.id3 = null;
            xpos1 = 15;
          }
        },25);
      }
      else if (a === 1)
      {
        sharedData.id4 = setInterval(()=>
        {
          xpos2--;
          arr[a].style.left = `${xpos2.toString()}%`;
          if(xpos2 === 15)
          {
            clearInterval(sharedData.id4);
            sharedData.id4 = null;
            xpos2 = 40;
          }
        },25);
      }
      else if (a === 2)
      {
        sharedData.id5 = setInterval(()=>
        {
          xpos3--;
          arr[a].style.left = `${xpos3.toString()}%`;
          if(xpos3 === 40)
          {
            clearInterval(sharedData.id5);
            sharedData.id5 = null;
            xpos3 = 65;
          }
        },25);
      }
    }
}


export async function left_trans_obj2(arr: any)
{
  let xpos1=13,xpos2=53;
  let opacity=1;
    for(let a=0;a<2;a++)
    {
      if(a === 0)
      {
        sharedData.id3 = setInterval(()=>
        {
          xpos1--;
          if(xpos1 > 53)
          opacity += 0.15;
          else
          opacity -= 0.1;
          if(xpos1 === 2)
          {  
            xpos1 = 65;
            arr[a].style.left = `40%`;
            a = 2;
          }
          arr[a].style.left = `${xpos1.toString()}%`;
            arr[a].style.opacity = `${opacity.toString()}`;
            if(xpos1 === 53)
            {
              clearInterval(sharedData.id3);
              sharedData.id3 = null;
            }
        },30);
      }
      else if (a === 1)
      {
        sharedData.id4 = setInterval(()=>
        {
          xpos2--;
          arr[a].style.left = `${xpos2.toString()}%`;
          if(xpos2 === 13)
          {
            clearInterval(sharedData.id4);
            sharedData.id4 = null;
          }
        },18);
      }
    }
}

export async function left_trans_obj3(arr: any)
{
  let xpos1=20,a=0;
  let opacity=1;
  sharedData.id3 = setInterval(()=>
  {
    xpos1--;
    if(xpos1 > 20)
      opacity += 0.15;
    else
      opacity -= 0.1;
    if(xpos1 === 2)
    {  
      xpos1 = 40;
      arr[a].style.left = `20%`;
      a = 1;
    }
    arr[a].style.left = `${xpos1.toString()}%`;
      arr[a].style.opacity = `${opacity.toString()}`;
      if(xpos1 === 20)
      {
        clearInterval(sharedData.id3);
        sharedData.id3 = null;
      }
  },25);
}

export async function right_trans_obj1(arr: any)
{
  let xpos1=15,xpos2=40,xpos3=65;
  let opacity=1;
    for(let a=0;a<3;a++)
    {
      if (a === 0)
      {
        sharedData.id = setInterval(()=>
        {
          xpos1++;
          arr[a].style.left = `${xpos1.toString()}%`;
          if(xpos1 === 40)
          {
            clearInterval(sharedData.id);
            sharedData.id = null;
            xpos1 = 15;
          }
        },25);
      }
      else if (a === 1)
      {
        sharedData.id1 = setInterval(()=>
        {
          xpos2++;
          arr[a].style.left = `${xpos2.toString()}%`;
          if(xpos2 === 65)
          {
            clearInterval(sharedData.id1);
            sharedData.id1 = null;
            xpos2 = 40;
          }
        },25);
      }
      else if (a === 2)
      {
        sharedData.id2 = setInterval(()=>
        {
          xpos3++;
          if(xpos3 < 15)
            opacity += 0.2;
          else
            opacity -= 0.1;
          if(xpos3 === 80)
            xpos3 = 2;
            arr[a].style.opacity = `${opacity.toString()}`;
            arr[a].style.left = `${xpos3.toString()}%`;
          if(xpos3 === 15)
          {
            clearInterval(sharedData.id2);
            sharedData.id2 = null;
            xpos3 = 65;
          }
        },25);
      }
    }
}
export async function right_trans_obj2(arr: any)
{
  let xpos1=13,xpos2=53;
  let opacity=1;
  for(let a=0;a<2;a++)
  {
    if (a === 0)
    {
      sharedData.id = setInterval(()=>
      {
        xpos1++;
        arr[a].style.left = `${xpos1.toString()}%`;
        if(xpos1 === 53)
        {
          clearInterval(sharedData.id);
          sharedData.id = null;
          xpos1 = 13;
        }
      },18);
    }
    else
    {
      sharedData.id2 = setInterval(()=>
      {
        xpos2++
        if(xpos2 < 13)
          opacity += 0.2;
        else
          opacity -= 0.1;
        if(xpos2 === 65)
        {
          xpos2 = 2;
          arr[a].style.left = `50%`;
          a = 2;
        }
          arr[a].style.opacity = `${opacity.toString()}`;
          arr[a].style.left = `${xpos2.toString()}%`;
        if(xpos2 === 13)
        {
          clearInterval(sharedData.id2);
          sharedData.id2 = null;
          xpos2 = 53;
        }
      },30);
    }
  }
}

export async function right_trans_obj3(arr: any)
{
  let xpos1=20, a = 0;
  let opacity=1;
  sharedData.id2 = setInterval(()=>
  {
    xpos1++;
    if(xpos1 < 20)
      opacity += 0.15;
    else
      opacity -= 0.1;
    if(xpos1 === 41)
    {
      xpos1 = 2;
      arr[a].style.left = `20%`;
      a = 2;
    }
      arr[a].style.opacity = `${opacity.toString()}`;
      arr[a].style.left = `${xpos1.toString()}%`;
    if(xpos1 === 20)
    {
      clearInterval(sharedData.id2);
      sharedData.id2 = null;
    }
  },25);
}