function calculateReadTime(data){
    return Math.round (data.split(" ").length / 100 * 0.3);
}

export default calculateReadTime;