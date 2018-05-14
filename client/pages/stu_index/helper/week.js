



module.exports = function (start) {
    /*var year = start.slice(0, 4)
    var month = parseInt(start.slice(5, 7)) - 1
    var day = start.slice(8, 10)*/


    var start_date = new Date(start)
    var now_date = new Date() 

    var week = parseInt((now_date - start_date) / (24 * 3600 * 1000 * 7) + 1)
    return week
}
