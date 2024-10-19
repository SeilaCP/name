const numinput = [];
let getnum = [0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9];

// count random index
function random(mn, mx) {
    return Math.random() * (mx - mn) + mn;
}
// ! make random in array by access index random
function GFG_Fun() {
    return getnum[(Math.floor(random(1, 17))) - 1];
}

// TODO: we add 'input' element in 'td' to access user can input value in 'null' box 
function createInput(n)
{
    const parainput = document.createElement('input');
    parainput.type = 'text';
    // parainput.className = n;
    document.getElementById(n).appendChild(parainput);
}
// TODO: communicate with 'random' buttom and do random data in array (numinput)
function Random()
{
    for (i = 1; i <= 81; i++)
    {
        numinput[i - 1] = GFG_Fun();
        if (numinput[i - 1] != 0)
        {
            document.getElementById(i).innerHTML = (numinput[i - 1]);
        }else if(numinput[i - 1] == 0){
            createInput(i);
        }
    }
    console.log(numinput);
}
// TODO: communicate with 'submit' buttom and do random data in array (numinput)
function myclick()
{
    for (i = 1; i <= 81; i++)
    {
        var number = 0;
        number = document.getElementById(i).value;
        if (number != 0)
        {
            numinput[i - 1] = 
            console.log(number);
        }
    }

    console.log(numinput);
}