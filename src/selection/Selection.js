export function getSelectionSort(sort, obj){
    // // const colorInitial = 'rgba(255, 0, 13, 0.8)';
        // // const colorSelectionSort = 'rgba(45, 45, 45, 0.98)';
        // // const colorSorted = 'rgba(8, 156, 249, 0.8)';
        sort = true;
        let i = 0;
        let maxV = 0;
        let idxMax = 0;
        let j = 0;
        const bars = document.getElementsByClassName('bar');
        //bars[0].style.backgroundColor = 'rgba(45, 45, 45, 0.98)';
        let interv = setInterval(() => {
            if(i>=bars.length){
                clearInterval(interv);
            }else{
                if(j>=bars.length-i){
                    let value = obj.state.numbers[bars.length-1-i];
                    let arrayAux = obj.state.numbers.slice();
                    arrayAux[idxMax] = value;
                    arrayAux[bars.length-1-i] = maxV;
                    obj.state.numbers = arrayAux;
                    bars[idxMax].style.backgroundColor = 'red';
                    bars[bars.length-1-i].style.backgroundColor = 'red';
                    j=0;
                    i++;
                    maxV = 0;
                    idxMax = 0;
                }else{
                    console.log(idxMax);
                    if(maxV<numbers[j]){
                        bars[idxMax].style.backgroundColor = 'red';
                        idxMax = j;
                        //bars[idxMax].style.backgroundColor = 'rgba(45, 45, 45, 0.98)';
                        maxV = numbers[j];
                        bars[idxMax].style.backgroundColor = 'rgba(45, 45, 45, 0.98)';
                    }else{
                        bars[j].style.backgroundColor = 'rgba(8, 156, 249, 0.8)';
                    }
                    if(j-1>=0&&j-1!==idxMax)
                        bars[j-1].style.backgroundColor = 'red';
                    j++;
                }
            }
        }, 1*(i+1))
    return 'ola';
}