function randomString(){
    return [...Array(10)].map(_=>(Math.random()*36|0).toString(36)).join("")
}

export default randomString;