
export const keysMinMax = (comparison)=> {  
      // takes comparison object from state and returns the min and max of each key {key{max:a,min:b}}
      // also returns array of keys with id in front

      const addKeys = (obj)=>{
      Object.keys(obj).map((key)=>{keys.add(key)})
      }
  
    const initiateMaxMin = (key)=>{
      keysMinMax[key]={};
      keysMinMax[key]['max']=0
      keysMinMax[key]['min']=99999999 
    }
      
    const maxMin = (obj)=> {
      keysArray.map((key)=>{
        let value = obj[key];
        // console.log(keysMinMax)
        if (keysMinMax[key].max<value){
          keysMinMax[key].max = value
        } 
        if (keysMinMax[key].min>value){
          keysMinMax[key].min = value
        }
      })
    } 
  
    var keys = new Set();
    var keysMinMax = {}
    // console.log(comparison)
    comparison.map(addKeys)
    keys.delete("id")
    let keysArray = [...keys]
    keysArray.sort()
    let keysArraySorted = ["id",...keys]
    keysArraySorted.map(initiateMaxMin)
    comparison.map(maxMin)
    keysArray = keysArraySorted
    
    return {keysMinMax,keysArray}    
  }  