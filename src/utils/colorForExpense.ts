export const ExpensesColor = (a: number) => {
  if(a<1000){
    return '#1fbf34'
  }else if(a>1000 && a<=10000){
    return '#ff8400'
  }else if(a>10000 && a<=50000){
    return '#27b4e6'
  }else if(a>50000 && a<=100000){
    return '#1d3dcc'
  }else if(a>100000 && a<=150000){
    return '#bb4af7'
  }else if(a>150000 && a<=200000){
    return '#fc3a92'
  }else if(a>200000){
    return '#c70007'
  }
}