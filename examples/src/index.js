import pos from '../../index';
import $ from 'jquery';

$(function () {
    function position() {
        pos(positionable1, {
            of: $("#parent")[0],
            my: $("#my_horizontal").val() + " " + $("#my_vertical").val(),
            at: $("#at_horizontal").val() + " " + $("#at_vertical").val(),
            collision: $("#collision_horizontal").val() + " " + $("#collision_vertical").val()
        });
        pos(positionable2, {
            of: $("#parent")[0],
            my: $("#my_horizontal").val() + " " + $("#my_vertical").val(),
            at: $("#at_horizontal").val() + " " + $("#at_vertical").val(),
            collision: $("#collision_horizontal").val() + " " + $("#collision_vertical").val()
        });
    }

    $(".positionable").css("opacity", 0.5);

    $("select, input").on("click keyup change", position);


    position();
});