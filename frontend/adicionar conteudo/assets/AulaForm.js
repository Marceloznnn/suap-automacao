jQuery(document).ready(function(){
    var data = jQuery('#id_data');

    var h1 = jQuery('.form-row.horarios_1 ')[0];
    var h2 = jQuery('.form-row.horarios_2 ')[0];
    var h3 = jQuery('.form-row.horarios_3 ')[0];
    var h4 = jQuery('.form-row.horarios_4 ')[0];
    var h5 = jQuery('.form-row.horarios_5 ')[0];
    var h6 = jQuery('.form-row.horarios_6 ')[0];
    var h7 = jQuery('.form-row.horarios_7 ')[0];

    hs = [h1, h2, h3, h4, h5, h6, h7]

    function configureVisibility(){
        data_br = $(data).prop('value');
        wd = new Date(data_br).getDay();
        for (i=0; i<7; i++){
            $(hs[i]).hide();
        }
        $(hs[wd]).show();
    }

    data.on('change', function(){
        configureVisibility();
    });

    configureVisibility();

});