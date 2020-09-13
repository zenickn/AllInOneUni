$(document).ready(function () {
    //pop out box
    $("#mychoicebtn").click(function () {
        $('#mychoiceModal').modal('show');
    });

    //save choices button clikc
    $('#saveAllChoiceBtn').click(() => {

        saveSmuChoice();
        saveNusChoice();
        saveNtuChoice();
    });


    //jquery sortable for uni choices
    $(function () {
        $("#ntu-list").sortable({
            connectWith: ".ntuConnectedSortable",
            update: function () {
                // alert("run")
                //         var order1 = $('#smu-list').sortable('toArray').toString();
                // //var order2 = $('#sortable2').sortable('toArray').toString();

                // alert("Order 1:"+order1);


            },
            stop: function () {


                saveNtuChoice();




            }
        }).disableSelection();
        $("#nus-list").sortable({
            connectWith: ".nusConnectedSortable",
            update: function () {
                alert("run")
                //         var order1 = $('#smu-list').sortable('toArray').toString();
                // //var order2 = $('#sortable2').sortable('toArray').toString();

                // alert("Order 1:"+order1);


            },
            stop: function () {
                saveNusChoice();

            }
        }).disableSelection();


        $("#smu-list").sortable({
            connectWith: ".smuConnectedSortable",
            update: function () {
                // alert("run")
                //         var order1 = $('#smu-list').sortable('toArray').toString();
                // //var order2 = $('#sortable2').sortable('toArray').toString();

                // alert("Order 1:"+order1);


            },
            stop: function () {
                saveSmuChoice();


            }
        }).disableSelection();
    });
    //---save choices for uni
    function saveNtuChoice() {
        var inputs = $('input.ntuposition');
        var nbElems = inputs.length;
        var arr = []
        $('input.ntuposition').each(function (idx) {
            console.log($(this).val());
            arr.push($(this).val());
        });

        //delete existing cookie
        var choice = getCookie("ntuchoice");
        if (choice != "") {
            delete_cookie("ntuchoice");
        }
        //set new cookie
        var obj = { "1": arr[0], "2": arr[1], "3": arr[2], "4": arr[3], "5": arr[4] }
        choice = JSON.stringify(obj)

        setCookie("ntuchoice", choice, 1);
        arr = [];

    }
    function saveNusChoice() {
        var inputs = $('input.nusposition');
        var nbElems = inputs.length;
        var arr = [];
        $('input.nusposition').each(function (idx) {
            console.log($(this).val());
            arr.push($(this).val());
        });
        //delete existing cookie
        var choice = getCookie("nuschoice");
        if (choice != "") {
            delete_cookie("nuschoice");
        }
        //set new cookie
        var obj = { "1": arr[0], "2": arr[1], "3": arr[2], "4": arr[3], "5": arr[4] }
        choice = JSON.stringify(obj)

        setCookie("nuschoice", choice, 1);
        arr = [];
    }
    function saveSmuChoice() {
        var inputs = $('input.smuposition');
        var nbElems = inputs.length;
        var arr = [];
        $('input.smuposition').each(function (idx) {
            console.log($(this).val());
            arr.push($(this).val());
        });

        var choice = getCookie("smuchoice");
        if (choice != "") {
            delete_cookie("smuchoice");
        }
        //set new cookie
        var obj = { "1": arr[0], "2": arr[1], "3": arr[2], "4": arr[3], "5": arr[4] }
        choice = JSON.stringify(obj)

        setCookie("smuchoice", choice, 1);
        arr = [];
    }
    //end of save choices for uni---


    //-----cookies---
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function delete_cookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        var ntuchoiceraw = getCookie("ntuchoice");
        var nuschoiceraw = getCookie("nuschoice");
        var smuchoiceraw = getCookie("smuchoice");

        if (ntuchoiceraw != "") {
            //if existing data exist, populate data
            var ntuChoices = JSON.parse(ntuchoiceraw);
            $('#ntu-choice-1').val(ntuChoices['1']);
            $('#ntu-choice-2').val(ntuChoices['2']);
            $('#ntu-choice-3').val(ntuChoices['3']);
            $('#ntu-choice-4').val(ntuChoices['4']);
            $('#ntu-choice-5').val(ntuChoices['5']);
        }
        if (nuschoiceraw != "") {
            //nus
            var nusChoices = JSON.parse(nuschoiceraw);
            $('#nus-choice-1').val(nusChoices['1']);
            $('#nus-choice-2').val(nusChoices['2']);
            $('#nus-choice-3').val(nusChoices['3']);
            $('#nus-choice-4').val(nusChoices['4']);
            $('#nus-choice-5').val(nusChoices['5']);
        } if (smuchoiceraw != "") {
            //smu
            var smuChoices = JSON.parse(smuchoiceraw);
            $('#smu-choice-1').val(smuChoices['1']);
            $('#smu-choice-2').val(smuChoices['2']);
            $('#smu-choice-3').val(smuChoices['3']);
            $('#smu-choice-4').val(smuChoices['4']);
            $('#smu-choice-5').val(smuChoices['5']);

            alert("Your previous choices has been loaded. ");
        }
    }
    //--end of cookies--


    //auto suggestion for course search---------
    (function (courses) {

        function addItems(list, container) {
            list.forEach(function (item) {
                const option = document.createElement('option');

                option.setAttribute('value', item);
                container.appendChild(option);
            });
        }

        const courseList = ['Bachelor in computer science', 'Bachelor in Business and Computer science', 'Bachelor in computing(Business)', 'Bachelor in Computing(data annlytic)'];

        addItems(courseList, courses);
    }(document.getElementById('courses')));




    //Barchart
    //https://www.chartjs.org/docs/latest/axes/cartesian/linear.html
    //to only show the chart when scroll until the element
    var inView = false;
    Chart.defaults.global.animation.duration = 3000;

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
    }

    $(window).scroll(function () {
        if (isScrolledIntoView('#employementTitle')) {
            if (inView) { return; }
            inView = true;



            GenChart();
        } else {
            inView = false;
        }
    });
    //gererate bar chart
    function GenChart() {

        var ctx = document.getElementById('myChart').getContext('2d');
        var courses = ['1', '2', '3', '4', '5'];
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: courses,
                datasets: [{
                    label: '% of employment in 2018',
                    data: [90, 92, 80, 85, 91, 90],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            suggestedMin: 70
                        }
                    }]
                }
            }
        });
    }

    $(document).ready(function () { checkCookie() });
});
