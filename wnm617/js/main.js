// Intro Form Custom JS
$(function () {
    /*SETTING LOCAL STORAGE */
    //MAA = Master's Art Arizona
    //MBA = Master's Business Arizona
    //MHA = Master's Science Arizona
    localStorage.setItem("noselect", "degreemajorstate");
    localStorage.setItem("maa", "111");
    localStorage.setItem("mba", "121");
    localStorage.setItem("mha", "131");
    //BAC = Bachelors's Arts California
    localStorage.setItem("bac", "212");
    //MAC = Master's Art California
    //MBC = Master's Business California
    //MHC = Master's Science California
    localStorage.setItem("mac", "112");
    localStorage.setItem("mbc", "122");
    localStorage.setItem("mhc", "132");
    //MAT = Master's Art TEXAS
    //MBT = Master's Business TEXAS
    //MHT = Master's Science TEXAS
    localStorage.setItem("mat", "113");
    localStorage.setItem("mbt", "123");
    localStorage.setItem("mht", "133"); /*END OF LOCAL STORAGE*/
    //VARIABLES FOR FILTER
    var maa = localStorage.getItem("maa");
    var mba = localStorage.getItem("mba");
    var mha = localStorage.getItem("mha");
    var noselect = localStorage.getItem("noselect");
    //ON CLICK SLIDEUP BUTTON TO BRING UP THE DROPZONE  
    $("#slideup-button").click(function () {
        $("#dropzone").css("bottom", "0");
    });
    //ON MOUSEENTER TOGGLES DROPZONE
    $("#slideup-button").mouseenter(function () {
        $("#dropzone").css("bottom", "0");
    });
    //ON CLICK HTML HIDE DROPZONE WHEN
    $(".dragzone-wrapper").click(function () {
        $("#dropzone").css("bottom", "-20vh");
    });
    //ON CLICK HIDE SELECTION CONTENT & DISPLAY INTRO CONTENT
    $("#back-to-intro").click(function () {
        //CLEAR DRAGZONE DATA WHEN RETURN TO FILTER PAGE
        $("#dragzone,#dropzone").html('');
        $("#dropzone").append('<div class="dropzone-buttons"><div class="dropzone-button btn btn-success" type="button" id="apply-button"><i class="fa fa-2x fa-check-circle" aria-hidden="true"></i></div><div class="dropzone-button btn btn-info" id="clear-button"><i class="fa fa-2x fa-trash" aria-hidden="true"></i></div></div>');
        //HIDE SELECTION CONTENT
        $(".selection-wrapper").toggle();
        $(".intro-wrapper").toggle();
    });
    //ON CLICK HIDE APPLICATION FORM AND RETURN TO SELECTION PAGE
    $('#back-to-selection').click(function () {
        $('.selection-wrapper').toggle();
        $('.application-wrapper').toggle();
    });
    //ON CLICK HIDE PAYMENT FORM AND RETURN TO APPLICATION
    $('#back-to-application').click(function () {
        $('.payment-wrapper').toggle('fade', 500);
    });
    //ON CLICK TO PAYMENT FORM
    $('#proceed-button').click(function () {
        $('.payment-wrapper').toggle('fade', 500);
    });

    //ON CLICK CLOSE SCHOOL-INFO OVERLAY AND CLEAR CONTENTS
    $('#school-info-close').click(function () {
        $(".selection-wrapper, #dropzone").css("display", "initial");
        $(".school-info-content").empty();
        $('#school-info').toggle();
    });
    //MAKE SELECTMENU 
    $(".selectMenu").selectmenu();

    //CLICK SUBMIT BUTTON TO PULL UP JSON DATA ACCORDING TO DATA MATCH
    $("#submit").on('click touchstart', function () {
        //CLEAR DRAGZONE DATA BEFORE APPENDING
        $("#dragzone").html('');

        //DO SOMETHING
        var introData = $("#degree").val() + $("#major").val() + $("#state").val();
        console.log(introData);
        //ALERT NO SELECITON
        if (introData == noselect) {
            alert("Please make a selection.");
        }
        /*GETTING MAA DATA FROM LOCAL STORAGE AFTER INTRO BUTTON*/
        //ARIZONA SECTION
        if (introData == 111) {
            //APPEND APPLY BUTTON
            $("#dropzone").append('<div class="dropzone-buttons"><div class="dropzone-button btn btn-success" id="apply-button"><i class="fa fa-2x fa-check-circle" aria-hidden="true"></i></div><div class="dropzone-button btn btn-info" id="clear-button-az"><i class="fa fa-2x fa-trash" aria-hidden="true"></i></div></div>');
            //DISPLAY SELECTION CONTENT
            $(".intro-wrapper, .selection-wrapper").toggle();
            //ACCESS DRAGZONE THUMBNAIL JSON DATA
            $.getJSON('js/json/arizona.json', function (data) {
                var html = '';
                //LOOP THROUGH JSON DATA AND OUTPUT TO HTML
                $.each(data, function (key, value) {
                    html += '<div class="grid__item drag-item d-flex align-items-center justify-content-center" id ="' + value.id + '"><i class="info-button fa fa-info-circle" id="' + value.value + '"></i><img src="image/logos/arizona/' + value.img + '"/></div>';
                }); //END OF JSON LOOP AND OUTPUT
                //OUTPUT CALI DATA TO HTML
                $("#dragzone").html(html);
                //MAKE DRAGZONE AND DROPZONE ITEMS DRAGGABLE
                $("#dragzone .drag-item").draggable({
                    start: function (event, ui) {
                        $("#dropzone").css("bottom", "0");
                        $('.selection-overlay').fadeIn();
                    },
                    stop: function (event, ui) {
                        $("#dropzone").css("bottom", "-20vh");
                        $('.selection-overlay').fadeOut();
                    },
                    zIndex: 80000,
                    helper: "clone",
                    revert: 'invalid',
                    containment: "body"
                }); //END OF DRAGGABLE
                //MAKE DRAGZONE AND DROPZONE DROPPABLE
                $("#dropzone, #dragzone").droppable({
                    drop: function (event, ui) {
                        ui.draggable.detach().appendTo($(this));
                    }
                }); //END OF DROPPABLE
            }); //END OF DRAGZONE THUMBNAIL JSON DATA
        } //ARIZONA SECTION END
        //CALIFORNIA SECTION
        if (introData == 112 || introData == 212) {
            //APPEND APPLY BUTTON
            $("#dropzone").append('<div class="dropzone-buttons"><div class="dropzone-button btn btn-success" id="apply-button"><i class="fa fa-2x fa-check-circle" aria-hidden="true"></i></div><div class="dropzone-button btn btn-info" id="clear-button-ca"><i class="fa fa-2x fa-trash" aria-hidden="true"></i></div></div>');
            $(".intro-wrapper").css("display", "none");
            //DISPLAY SELECTION CONTENT
            $(".selection-wrapper").css("display", "initial");
            //ACCESS DRAGZONE THUMBNAIL JSON DATA
            $.getJSON('js/json/california.json', function (data) {
                var html = '';
                //LOOP THROUGH JSON DATA AND OUTPUT TO HTML
                $.each(data, function (key, value) {
                    html += '<div class="grid__item drag-item d-flex align-items-center justify-content-center" id ="' + value.id + '"><i class="info-button fa fa-info-circle" id="' + value.value + '"></i><img src="image/logos/california/' + value.img + '"/></div>';
                }); //END OF JSON LOOP AND OUTPUT
                //OUTPUT CALI DATA TO HTML
                $("#dragzone").html(html);
                //MAKE DRAGZONE AND DROPZONE ITEMS DRAGGABLE
                $("#dragzone .drag-item").draggable({
                    start: function (event, ui) {
                        $("#dropzone").css("bottom", "0");
                        $('.selection-overlay').fadeIn();
                    },
                    stop: function (event, ui) {
                        $("#dropzone").css("bottom", "-20vh");
                        $('.selection-overlay').fadeOut();
                    },
                    zIndex: 80000,
                    helper: "clone",
                    revert: 'invalid',
                    containment: "body"
                }); //END OF DRAGGABLE

                //MAKE DRAGZONE AND DROPZONE DROPPABLE
                $("#dropzone, #dragzone").droppable({
                    drop: function (event, ui) {
                        ui.draggable.detach().appendTo($(this));
                    }
                }); //END OF DROPPABLE
            }); //END OF DRAGZONE THUMBNAIL JSON DATA
        } //CALIFORNIA STATEMENT END
        //TEXAS SECTION
        if (introData == 113) {
            //APPEND APPLY BUTTON
            $("#dropzone").append('<div class="dropzone-buttons"><div class="dropzone-button btn btn-success" id="apply-button"><i class="fa fa-2x fa-check-circle" aria-hidden="true"></i></div><div class="dropzone-button btn btn-info" id="clear-button-tx"><i class="fa fa-2x fa-trash" aria-hidden="true"></i></div></div>');
            //DISPLAY SELECTION CONTENT
            $(".intro-wrapper, .selection-wrapper").toggle();
            //ACCESS DRAGZONE THUMBNAIL JSON DATA
            $.getJSON('js/json/texas.json', function (data) {
                var html = '';
                //LOOP THROUGH JSON DATA AND OUTPUT TO HTML
                $.each(data, function (key, value) {
                    html += '<div class="grid__item drag-item d-flex align-items-center justify-content-center" id ="' + value.id + '"><i class="info-button fa fa-info-circle" id="' + value.value + '"></i><img src="image/logos/texas/' + value.img + '"/></div>';
                }); //END OF JSON LOOP AND OUTPUT
                //OUTPUT CALI DATA TO HTML
                $("#dragzone").html(html);
                //MAKE DRAGZONE AND DROPZONE ITEMS DRAGGABLE
                $("#dragzone .drag-item").draggable({
                    start: function (event, ui) {
                        $("#dropzone").css("bottom", "0");
                        $('.selection-overlay').fadeIn();
                    },
                    stop: function (event, ui) {
                        $("#dropzone").css("bottom", "-20vh");
                        $('.selection-overlay').fadeOut();
                    },
                    zIndex: 80000,
                    helper: "clone",
                    revert: 'invalid',
                    containment: "body"
                }); //END OF DRAGGABLE
                //MAKE DRAGZONE AND DROPZONE DROPPABLE
                $("#dropzone, #dragzone").droppable({
                    drop: function (event, ui) {
                        ui.draggable.detach().appendTo($(this));
                    }
                }); //END OF DROPPABLE
            }); //END OF DRAGZONE THUMBNAIL JSON DATA
        } //TEXAS SECTION END
    }); //SUBMIT BUTTON END

    //DROPZONE CLEAR AND RESET
    //AZ BUTTON
    $(document).on('click touchstart', '#clear-button-az', function () {
        $('#dropzone').html('');
        //APPEND APPLY BUTTON
        $("#dropzone").append('<div class="dropzone-buttons"><div class="dropzone-button btn btn-success" id="apply-button"><i class="fa fa-2x fa-check-circle" aria-hidden="true"></i></div><div class="dropzone-button btn btn-info" id="clear-button-az"><i class="fa fa-2x fa-trash" aria-hidden="true"></i></div></div>');
        //HIDE DROPZONE
        $("#dropzone").css("bottom", "-20vh");
        //ACCESS DRAGZONE THUMBNAIL JSON DATA
        $.getJSON('js/json/arizona.json', function (data) {
            var html = '';
            //LOOP THROUGH JSON DATA AND OUTPUT TO HTML
            $.each(data, function (key, value) {
                html += '<div class="grid__item drag-item d-flex align-items-center justify-content-center" id ="' + value.id + '"><i class="info-button fa fa-info-circle" id="' + value.value + '"></i><img src="image/logos/arizona/' + value.img + '"/></div>';
            }); //END OF JSON LOOP AND OUTPUT
            //OUTPUT CALI DATA TO HTML
            $("#dragzone").html(html);
            //MAKE DRAGZONE AND DROPZONE ITEMS DRAGGABLE
            $("#dragzone .drag-item").draggable({
                start: function (event, ui) {
                    $("#dropzone").css("bottom", "0");
                    $('.selection-overlay').fadeIn();
                },
                stop: function (event, ui) {
                    $("#dropzone").css("bottom", "-20vh");
                    $('.selection-overlay').fadeOut();
                },
                zIndex: 80000,
                helper: "clone",
                revert: 'invalid',
                containment: "body"
            }); //END OF DRAGGABLE
        });
    }); //END OF AZ RESET BUTTON
    //CA BUTTON
    $(document).on('click touchstart', '#clear-button-ca', function () {
        $('#dropzone').html('');
        //APPEND APPLY BUTTON
        $("#dropzone").append('<div class="dropzone-buttons"><div class="dropzone-button btn btn-success" id="apply-button"><i class="fa fa-2x fa-check-circle" aria-hidden="true"></i></div><div class="dropzone-button btn btn-info" id="clear-button-ca"><i class="fa fa-2x fa-trash" aria-hidden="true"></i></div></div>');
        //HIDE DROPZONE
        $("#dropzone").css("bottom", "-20vh");
        //ACCESS DRAGZONE THUMBNAIL JSON DATA
        $.getJSON('js/json/california.json', function (data) {
            var html = '';
            //LOOP THROUGH JSON DATA AND OUTPUT TO HTML
            $.each(data, function (key, value) {
                html += '<div class="grid__item drag-item d-flex align-items-center justify-content-center" id ="' + value.id + '"><i class="info-button fa fa-info-circle" id="' + value.value + '"></i><img src="image/logos/california/' + value.img + '"/></div>';
            }); //END OF JSON LOOP AND OUTPUT
            //OUTPUT CALI DATA TO HTML
            $("#dragzone").html(html);
            //MAKE DRAGZONE AND DROPZONE ITEMS DRAGGABLE
            $("#dragzone .drag-item").draggable({
                start: function (event, ui) {
                    $("#dropzone").css("bottom", "0");
                    $('.selection-overlay').fadeIn();
                },
                stop: function (event, ui) {
                    $("#dropzone").css("bottom", "-20vh");
                    $('.selection-overlay').fadeOut();
                },
                zIndex: 80000,
                helper: "clone",
                revert: 'invalid',
                containment: "body"
            }); //END OF DRAGGABLE
        });
    }); //END OF CA RESET BUTTON
    //TX BUTTON
    $(document).on('click touchstart', '#clear-button-tx', function () {
        $('#dropzone').html('');
        //APPEND APPLY BUTTON
        $("#dropzone").append('<div class="dropzone-buttons"><div class="dropzone-button btn btn-success" id="apply-button"><i class="fa fa-2x fa-check-circle" aria-hidden="true"></i></div><div class="dropzone-button btn btn-info" id="clear-button-tx"><i class="fa fa-2x fa-trash" aria-hidden="true"></i></div></div>');
        //HIDE DROPZONE
        $("#dropzone").css("bottom", "-20vh");
        //ACCESS DRAGZONE THUMBNAIL JSON DATA
        $.getJSON('js/json/texas.json', function (data) {
            var html = '';
            //LOOP THROUGH JSON DATA AND OUTPUT TO HTML
            $.each(data, function (key, value) {
                html += '<div class="grid__item drag-item d-flex align-items-center justify-content-center" id ="' + value.id + '"><i class="info-button fa fa-info-circle" id="' + value.value + '"></i><img src="image/logos/texas/' + value.img + '"/></div>';
            }); //END OF JSON LOOP AND OUTPUT
            //OUTPUT CALI DATA TO HTML
            $("#dragzone").html(html);
            //MAKE DRAGZONE AND DROPZONE ITEMS DRAGGABLE
            $("#dragzone .drag-item").draggable({
                start: function (event, ui) {
                    $("#dropzone").css("bottom", "0");
                    $('.selection-overlay').fadeIn();
                },
                stop: function (event, ui) {
                    $("#dropzone").css("bottom", "-20vh");
                    $('.selection-overlay').fadeOut();
                },
                zIndex: 80000,
                helper: "clone",
                revert: 'invalid',
                containment: "body"
            }); //END OF DRAGGABLE
        });
    }); //END OF TX RESET BUTTON
    //APPLLY BUTTON FUNCTION
    //GET DROPPED ITEM'S AND ADD TO APPLICATION FORM SCHOOL LIST
    $(document).on('click touchstart', '#apply-button', function () {
        $('#schools').html('');
        $('#schools').append('<option>School(s) to apply</option>');
        $("#dropzone .drag-item")
            .attr("id", function (arr) {})
            .each(function () {
                console.log(this.id);
                $('#schools').append('<option>' + this.id + '</option>');
            });
        $('.selection-wrapper, .application-wrapper').toggle();
    }); //END OF ADDING ITEMS TO APPLICATION FORM


    //CLICK SCHOOL INFO-BUTTON TO ACCESS SCHOOL INFO JSON DATA
    //AAU
    $(document).on('click', '#c1', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.aau_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.aau_info + '</p><br>');
            $('.school-info-content').append('<h3>Programs</h3><br>' + '<p>' + data.aau_programs + '</p><br>');
            $('.school-info-content').append('<h3>Popular Majors</h3><br>' + '<p>' + data.aau_popular + '</p>');
        });
        $('#school-info').toggle();
    }); //END OF AAU
    //BERKELEY
    $(document).on('click', '#c2', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.berkeley_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.berkeley_info + '</p><br>');
            $('.school-info-content').append('<h3>Undergraduate</h3><br>' + '<p>' + data.berkeley_undergrad + '</p><br>');
            $('.school-info-content').append('<h3>Postgraduate</h3><br>' + '<p>' + data.berkeley_postgrad + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF BERKELEY
    //CIT
    $(document).on('click', '#c3', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.cit_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.cit_info + '</p><br>');
            $('.school-info-content').append('<h3>Undergraduate</h3><br>' + '<p>' + data.cit_undergrad + '</p><br>');
            $('.school-info-content').append('<h3>Graduate Studies</h3><br>' + '<p>' + data.cit_postgrad + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF CIT
    //CSULB
    $(document).on('click', '#c4', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.csulb_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.csulb_info + '</p><br>');
            $('.school-info-content').append('<h3>Undergraduate</h3><br>' + '<p>' + data.csulb_undergrad + '</p><br>');
            $('.school-info-content').append('<h3>Postgraduate</h3><br>' + '<p>' + data.csulb_postgrad + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF CIT
    //CSUN
    $(document).on('click', '#c5', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.csun_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.csun_info + '</p><br>');
            $('.school-info-content').append('<h3>Admissions</h3><br>' + '<p>' + data.csun_admission + '</p><br>');
            $('.school-info-content').append('<h3>Collages</h3><br>' + '<p>' + data.csun_collages + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.csun_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF CSUN
    //END OF SCHOOL INFO JSON DATA  
    //CLICK SCHOOL INFO-BUTTON TO ACCESS SCHOOL INFO JSON DATA - ARIZONA SECTION
    //ASU
    $(document).on('click', '#a1', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.asu_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.asu_info + '</p><br>');
            $('.school-info-content').append('<h3>Admissions</h3><br>' + '<p>' + data.asu_admissions + '</p><br>');
            $('.school-info-content').append('<h3>Ranking</h3><br>' + '<p>' + data.asu_ranking + '</p>');
        });
        $('#school-info').toggle();
    }); //END OF ASU
    //UP
    $(document).on('click', '#a2', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.up_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.up_info + '</p><br>');
            $('.school-info-content').append('<h3>Acdemics</h3><br>' + '<p>' + data.up_academics + '</p><br>');
            $('.school-info-content').append('<h3>Accreditation</h3><br>' + '<p>' + data.up_accreditation + '</p>');
        });
        $('#school-info').toggle();
    }); //END OF UP
    //NAU
    $(document).on('click', '#a3', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.nau_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.nau_info + '</p><br>');
            $('.school-info-content').append('<h3>Acdemics</h3><br>' + '<p>' + data.nau_academics + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF NAU
    //THUNDERBIRD
    $(document).on('click', '#a4', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.thunderbird_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.thunderbird_info + '</p><br>');
            $('.school-info-content').append('<h3>Programs</h3><br>' + '<p>' + data.thunderbird_programs + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.thunderbird_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF NTHUNDERBIRD
    //AIP
    $(document).on('click', '#a5', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.aip_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.aip_info + '</p><br>');
            $('.school-info-content').append('<h3>Undergraduate</h3><br>' + '<p>' + data.aip_undergrad + '</p><br>');
            $('.school-info-content').append('<h3>Associate</h3><br>' + '<p>' + data.aip_associate + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF AIP
    //RICE
    $(document).on('click', '#t1', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.rice_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.rice_info + '</p><br>');
            $('.school-info-content').append('<h3>Programs</h3><br>' + '<p>' + data.rice_programs + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.rice_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF AIP
    //UT AUSTIN
    $(document).on('click', '#t2', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.austin_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.austin_info + '</p><br>');
            $('.school-info-content').append('<h3>Applying</h3><br>' + '<p>' + data.austin_apply + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.austin_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF UTAUSTIN
    //METH
    $(document).on('click', '#t3', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.meth_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.meth_info + '</p><br>');
            $('.school-info-content').append('<h3>Applying</h3><br>' + '<p>' + data.meth_apply + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.meth_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF METH
    //A&M
    $(document).on('click', '#t4', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.am_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.am_info + '</p><br>');
            $('.school-info-content').append('<h3>Applying</h3><br>' + '<p>' + data.am_apply + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.am_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF A&M
    //BAYLOR
    $(document).on('click', '#t5', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.baylor_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.baylor_info + '</p><br>');
            $('.school-info-content').append('<h3>Applying</h3><br>' + '<p>' + data.baylor_apply + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.baylor_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF BAYLOR
    //CHRISTIAN
    $(document).on('click', '#t6', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.christian_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.christian_info + '</p><br>');
            $('.school-info-content').append('<h3>Applying</h3><br>' + '<p>' + data.christian_apply + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.christian_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF CHRISTIAN
    //UT DALLAS
    $(document).on('click', '#t7', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.dallas_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.dallas_info + '</p><br>');
            $('.school-info-content').append('<h3>Applying</h3><br>' + '<p>' + data.dallas_apply + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.dallas_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF UT DALLAS
    //TECH
    $(document).on('click', '#t8', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.tech_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.tech_info + '</p><br>');
            $('.school-info-content').append('<h3>Applying</h3><br>' + '<p>' + data.tech_apply + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.tech_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF TECH
    //UT HOUSTON
    $(document).on('click', '#t9', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.houston_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.houston_info + '</p><br>');
            $('.school-info-content').append('<h3>Applying</h3><br>' + '<p>' + data.houston_apply + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.houston_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF UT HOUSTON
    //BAPTIST
    $(document).on('click', '#t10', function () {
        $(".selection-wrapper, #dropzone").css("display", "none");
        $.getJSON('js/json/schoolData.json', function (data) {
            console.log("JSON load success");
            $('.school-info-content').append('<h2>' + data.baptist_title + '</h2><br>');
            $('.school-info-content').append('<p>' + data.baptist_info + '</p><br>');
            $('.school-info-content').append('<h3>Applying</h3><br>' + '<p>' + data.baptist_apply + '</p><br>');
            $('.school-info-content').append('<h3>Rankings</h3><br>' + '<p>' + data.baptist_ranking + '</p><br>');
        });
        $('#school-info').toggle();
    }); //END OF BAPTIST
});
