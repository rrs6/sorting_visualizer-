import './GraphComponentStyle.css';
import React from 'react';
let sort = false;
function quicksort(animation, array, i, j){
    if(i<0||j<=i){
        return array
    }else{
        let pivot = i + Math.floor(Math.random()*array.length)%(j-i+1);
        let aux = array[pivot];
        array[pivot] = array[j];
        array[j] = aux;
        animation.push([pivot, j, 0]);
        let it1 = i-1;
        let it2 = i-1;
        while(it2<j){
            it2++;
            if(array[it2]<=array[j]){
                it1++;
                animation.push([it1, it2]);
                let aux = array[it2];
                array[it2] = array[it1];
                array[it1] = aux;
            }
            animation.push([it2]);
        }
        quicksort(animation, array, i, it1-1);
        quicksort(animation, array, it1+1, j);
        return array;
    }
}
function merge(animations,array, i, j){
    if(j>i){
        let m = i+((j-i)>>1);
        let arrayO = merge(animations, array, i , m);
        let arrayT = merge(animations, array, m+1, j);
        // clearTimeout(interval);
        //console.log('interv');
        let arrayR = [];
        let idx1 = 0;
        let idx2 = 0;
        while(idx1<arrayO.length&&idx2<arrayT.length){
            if(arrayO[idx1]>=arrayT[idx2]){
                arrayR.push(arrayT[idx2]);
                idx2++;
            }else{
                arrayR.push(arrayO[idx1]);
                idx1++;
            }
        }
        while(idx1<arrayO.length){
            arrayR.push(arrayO[idx1]);
            idx1++;
        }
        while(idx2<arrayT.length){
            arrayR.push(arrayT[idx2]);
            idx2++;
        }
        animations.push([i,m,j,arrayR]);
        return arrayR;
    }else{
        return [array[i]];
    }
}
class GraphComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            numbers: [],
            numOfBars: 5,
        }
    }
    Mergesort(){
        sort = true;
        let animations = [];
        //console.log(this.state.numbers);
        let arr = this.state.numbers.slice();
        let array = merge(animations, arr, 0, arr.length-1);
        let bars = document.getElementsByClassName('bar');
        let i = 0;
        let it = 0;
        let timeO = setInterval(() => {
            if(i<animations.length&&sort){
                for(let it = animations[i][0]; it <= animations[i][1]&&sort; it++){
                    bars[it].style.background='rgba(74, 74, 74, 1)';
                }
                for(let it = animations[i][1]+1; it <= animations[i][2]&&sort; it++){
                    bars[it].style.background='red';
                }
                if(it>=animations[i][3].length){
                    i++;
                    it=0;
                }else{
                    arr[animations[i][0]+it]=animations[i][3][it];
                    this.setState({
                        numbers: arr,
                    });
                    it++;
                }
            }else{
                if(sort){
                    this.setState({
                        numbers: array,
                    });
                    for(let i = 0; i < bars.length; i++){
                        bars[i].style.background='red';
                    }
                }else{
                    this.setState({
                        numbers: arr,
                    });
                    this.initializeNumbers();
                }
                clearInterval(timeO);
            }
            //console.log(i);
        }, 20);
        //console.log(this.state.numbers);
    }
    selectionSort(){
        // const colorInitial = 'rgba(255, 0, 13, 0.8)';
        // const colorSelectionSort = 'rgba(45, 45, 45, 0.98)';
        // const colorSorted = 'rgba(8, 156, 249, 0.8)';
        sort = true;
        let i = 0;
        let maxV = 0;
        let idxMax = 0;
        let j = 0;
        const bars = document.getElementsByClassName('bar');
        //bars[0].style.backgroundColor = 'rgba(45, 45, 45, 0.98)';
        let interv = setInterval(() => {
            if(i>=bars.length||sort===false){
                clearInterval(interv);
            }else{
                if(j>=bars.length-i){
                    let value = this.state.numbers[bars.length-1-i];
                    let arrayAux = this.state.numbers.slice();
                    arrayAux[idxMax] = value;
                    arrayAux[bars.length-1-i] = maxV;
                    this.setState({
                        numbers: arrayAux,
                    })
                    bars[idxMax].style.backgroundColor = 'red';
                    bars[bars.length-1-i].style.backgroundColor = 'red';
                    j=0;
                    i++;
                    maxV = 0;
                    idxMax = 0;
                }else{
                    if(maxV<this.state.numbers[j]){
                        bars[idxMax].style.backgroundColor = 'red';
                        idxMax = j;
                        //bars[idxMax].style.backgroundColor = 'rgba(45, 45, 45, 0.98)';
                        maxV = this.state.numbers[j];
                        bars[idxMax].style.backgroundColor = 'rgba(74, 74, 74, 1)';
                    }else{
                        bars[j].style.backgroundColor = 'rgba(8, 156, 249, 0.8)';
                    }
                    if(j-1>=0&&j-1!==idxMax)
                        bars[j-1].style.backgroundColor = 'red';
                    j++;
                }
            }
        }, 1*(i+1))
    }
    quickSort(){
        sort = true;
        let array = this.state.numbers;
        let i = 0;
        let j = array.length-1;
        let anim = [];
        let bars = document.getElementsByClassName('bar');
        let arrayOrd = quicksort(anim, array, i, j);
        let it1 = 0;
        let interval = setInterval( () => {
            if(anim.length<=it1){
                if(it1-1>=0&&anim[it1-1].length>2){
                    bars[anim[it1-1][0]].style.backgroundColor = 'red';
                }else if(it1-1>=0&&anim[it1-1].length===1){
                    bars[anim[it1-1][0]].style.backgroundColor = 'red';
                }else if(it1-1>=0){
                    bars[anim[it1-1][0]].style.backgroundColor = 'red';
                    bars[anim[it1-1][1]].style.backgroundColor = 'red';
                }
                clearInterval(interval);
                this.setState({
                    numbers: arrayOrd,
                });
            }else if(sort===false){
                clearInterval(interval);
            }else{
                if(it1-1>=0&&anim[it1-1].length>2){
                    bars[anim[it1-1][0]].style.backgroundColor = 'red';
                }else if(it1-1>=0&&anim[it1-1].length===1){
                    bars[anim[it1-1][0]].style.backgroundColor = 'red';
                }else if(it1-1>=0){
                    bars[anim[it1-1][0]].style.backgroundColor = 'red';
                    bars[anim[it1-1][1]].style.backgroundColor = 'red';
                }
                if(anim[it1].length>2){
                    bars[anim[it1][0]].style.backgroundColor = 'rgba(74, 74, 74, 1)';
                    bars[anim[it1][1]].style.backgroundColor = 'rgba(74, 74, 74, 1)';
                    let auxH = bars[anim[it1][0]].style.height;
                    bars[anim[it1][0]].style.height = bars[anim[it1][1]].style.height;
                    bars[anim[it1][1]].style.height = auxH;
                }else if(anim[it1].length>1){
                    bars[anim[it1][0]].style.backgroundColor = 'rgba(8, 156, 249, 0.8)';
                    bars[anim[it1][1]].style.backgroundColor = 'rgba(8, 156, 249, 0.8)';
                    let auxH = bars[anim[it1][0]].style.height;
                    bars[anim[it1][0]].style.height = bars[anim[it1][1]].style.height;
                    bars[anim[it1][1]].style.height = auxH;
                }else{
                    bars[anim[it1][0]].style.backgroundColor = 'rgba(8, 156, 249, 0.8)';
                }
            }
            it1++;
        }, 5);
    }
    bubbleSort(){
        sort = true;
        let array = this.state.numbers.slice();
        //let interval = a;
        let iterations = array.length-1;
        let j = 1;
        let bars = document.getElementsByClassName('bar');
        let interval = setInterval(()=>{
            if(iterations>0&&sort){
                if(j>iterations){
                    bars[iterations].style.backgroundColor = 'red';
                    j = 1;
                    iterations--;
                    bars[iterations].style.backgroundColor = 'red';
                }else{
                    if(j-2>=0){
                        bars[j-2].style.backgroundColor = 'red';
                    }
                    bars[j-1].style.backgroundColor = 'rgba(74, 74, 74, 1)';
                    bars[j].style.backgroundColor = 'rgba(74, 74, 74, 1)';
                    if(array[j-1]>array[j]){
                        let aux = array[j-1];
                        array[j-1]=array[j];
                        array[j]=aux;
                    }
                    j++;
                    this.setState({
                        numbers: array,
                    });
                }
            }else{
                clearInterval(interval);
            }
        }, (1)*1);
    }
    initializeNumbers(){
        let nums = [];
        for(let i = 0; i < this.state.numOfBars; i++){
            nums.push(Math.floor(Math.abs(Math.random()-Math.random())*(100))+1)
        }
        this.setState({
            numbers: nums,
        });
        if(sort){
            //console.log(this.state.numbers.length);
            for(let i = 0; i < this.state.numbers.length; i++)
                document.getElementsByClassName('bar')[i].style.backgroundColor = 'red';
        }
        sort = false;
    }
    componentDidMount(){
        this.initializeNumbers();
    }
    render(){
        return (
            <div className='container'>
                <div className="bars">
                    {this.state.numbers.map((value, index) => (<div className="bar" style={{height:((value))+'%', width:(100/this.props.numOfBars)+'%', background: 'red'}} key={index}></div>))}
                </div>
                <div className="input-numbars">
                    <input className="input" type='range' min='5' max='200' value={this.state.numOfBars} onChange={(e) => {this.setState({numOfBars:e.target.value});}}></input>
                    <p className="input-text">Number of elements: {this.state.numOfBars}</p>
                </div>
                <div className="button-area">
                    <button onClick={()=>this.initializeNumbers()}className="button-newRandom">Reset Array</button>
                    <button onClick={()=>{if(sort===false)this.bubbleSort()}}className="button-sort">Bubble Sort</button>
                    <button onClick={()=>{if(sort===false)this.selectionSort()}}className="button-sort">Selection Sort</button>
                    <button onClick={()=>{if(sort===false)this.Mergesort()}}className="button-sort">Merge Sort</button>
                    <button onClick={()=>{if(sort===false)this.quickSort()}}className="button-sort">Quick Sort</button>
                </div>
            </div>
        );
    }
}
export default GraphComponent;