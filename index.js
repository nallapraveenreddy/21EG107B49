const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;
const windowSize = 10;
const numberCache = [];

app.get('/numbers/:numberId',async (req,res)=>{
    const numberId = req.params.numberId;
});

app.listen(port,()=>{
    console.log('Server Running on port ${port}');
});

const fetchNumbers = async(numberId)=>{
    try{
        const response = await axios.get('https://your-third-party-api/${numberId}');
        return response.data;
    }
    catch(error){
        console.error(error);
        return null;
    }
};

const numbers = await fetchNumbers(numberId);
if(numbers){
    numberCache.push(...numbers.filter(num =>!numberCache.includes(num)));
    if(numberCache.length > windowSize){
        numberCache.shift();
    }
}

const calculateAverage = () =>{
    if(numberCache.length===0){
        return 0;
    }
    const sum = numberCache.reduce((acc, curr)=>acc + curr,0);
    return sum;
}

const response = {
    windowPrevState: numberCache.slice(0,-numbers.length),
    windowCurrState: numberCache,
    numbers,
    avg: calculateAverage(),
}

res.json(response);