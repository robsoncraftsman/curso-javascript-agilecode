//Asynchronous generators
async function* createAsyncIterable(syncIterable) {
    for (const elem of syncIterable) {
        yield elem;
    }
}

//Queuing next() invocations
(async () => {
    const asyncIterable = createAsyncIterable(['a', 'b', 'c']);
    const [{value:v1},{value:v2},{value:v3}] = await Promise.all([
        asyncIterable.next(), asyncIterable.next(), asyncIterable.next()
    ]);
    console.log(v1, v2, v3); // a b c
    
})();

//for-wait-of
(async () => {
    const asyncIterable = createAsyncIterable(['a', 'b', 'c']);
    for await (value of asyncIterable) {
        console.log(value);
    }   
})();