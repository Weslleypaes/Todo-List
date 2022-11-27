
exports.getDate = function () {

    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};
    
    const today = new Date();

    return today.toLocaleDateString('pt-BR', options);

};

exports.getDay = function(){

    const options = { weekday: 'long'};
    
    const today = new Date();

    return today.toLocaleDateString('pt-BR', options);

};
