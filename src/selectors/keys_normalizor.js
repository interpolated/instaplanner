export const keyNormalizor = (obj, keysMinMax)=>{
    var locationScore = 0
    const keyArray=Object.keys(obj);
    keyArray.map((key)=>{
        if(String(key)!=="id"){      
          const value = obj[key]
          const max = keysMinMax[key].max
          const min = keysMinMax[key].min
          const normalized = Math.round(((value-min)/(max-min))*5)
          console.log(normalized)
          locationScore+=normalized
          // console.log('Key score.....'+locationScore)
        }      
    })
    return locationScore
  }