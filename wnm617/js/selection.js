//SELECTION.TEST.JS

$(function () {
    $("#dragzone .drag-item").draggable({
        revert: 'invalid',
        helper: "clone",
        containment: ".selection-wrapper",
        zIndex: 10000,
        opacity: 0.5
    });
   
    //DRAG AND DROP BETWEEN DRAGZONE AND DROPZONE
    $("#dropzone, #dragzone").droppable({
        drop: function (event, ui) {
            ui.draggable.detach().appendTo($(this));
        }
    });

    $("#dropzone").droppable({
        drop: function (event, ui) {
            ui.draggable.detach().appendTo($(this));
            var currentID = ui.draggable.attr('value');
            console.log(currentID);
        }
    });


});
