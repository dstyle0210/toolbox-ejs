# jQuery 

## $.Deferred

```javascript
// $.Deferred 방식
const exampleDeferred = () => {
    const dfd = $.Deferred(); // 객체생성
    let result = "결과값";

    setTimeout(()=>{
        dfd.resolve(result); // Promise 결과랑 같음.
    });

    return dfd.promise(); // Promise 를 리턴시킴.
};

exampleDeferred()
.done((result)=>{ // resolve 시

})
.fail((result)=>{ // reject 시

})
.always((result)=>{ // 둘다

})
.then((result)=>{ // 첫번쨰는 resolve , 두번째는 reject

},(result)=>{

});

// Promise 방식
const examplePromise = () => {
    return new Promise((resolve,reject)=>{
        let result = "결과값";
        setTimeout(()=>{
            resolve(result);
        });
    });
};

examplePromise()
.then(()=>{ // 첫번쨰는 resolve , 두번째는 reject

},()=>{

})
.catch(()=>{ // 실행중 에러 발생 시

})
.
```