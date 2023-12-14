let phoih = 0;
console.log('okk');

$w.onReady(function () {
    function funWix(){
        console.log('wix++')
    };
    funEmb();
});

document.addEventListener('DOMContentLoaded', function () {
    function funEmb(){
        console.log('Emb++')
    };
    funWix();
});