/**
 * Created by Socs on 03/06/2017.
 */
$(".btn-color-sq").click(function(){
    paper.drawBackground({
        color: $(this).css("background-color")
    });
});

$(".btn-color-none").click(function(){
    paper.drawBackground({
        color: false
    });
});