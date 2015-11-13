(function() {
    'use strict';

    angular.module('global')
        .factory('core', core);

    core.$inject = [];

    function core(){
        var API = { 
           getCoursesList
        };

        return API;

        function getCoursesList(){
            var millisecondsInDay = 86400000;
            var list = [];
            var defaultItem = {
                title: "Разбираем четвертый блок курса вместе...",
                type: 'general',
                user: {
                    name: "Cat",
                    imgSrc: "http://oboi.tululu.org/o/13/35992/prew.jpg"
                }
            };

            angular.merge(list, gen(Date.now(), 4, defaultItem));
            angular.merge(list, gen(Date.now() - 86400000 * 8, 1, defaultItem));

            defaultItem.status = "finished";
            defaultItem.type = 'individ';
            angular.merge(list, gen(Date.now() - 86400000 * 10, 1, defaultItem));

            defaultItem.startTime = Date.now() - 1000 * 60 * 20;
            defaultItem.endTime = Date.now() + 1000 * 60 * 40;
            angular.merge(list, gen(Date.now(), 1, defaultItem));

            return list;

            function gen(start, count, attrs){
                for(let i = 0; i < count; i++){
                    let startDate = getPeriodBorders(start, 0).start + millisecondsInDay * (i + Math.random() * 10);
                    let startTime = startDate + millisecondsInDay / 24 * randomInteger(10, 20);
                    let endTime = startTime + millisecondsInDay / 24;
                  
                    let item = {
                       startDate, startTime, endTime 
                    };

                    angular.merge(item, attrs);
                    
                    if(startTime > Date.now && Date.now < endTime){
                        item.status = "active";
                    } 

                    else if(Date.now > endTime){
                        item.status = attrs.status ? attrs.status : 'canceled';
                    }

                    else{
                        item.status = 'static'
                    }
                  
                    list.push(item);
                }
            }    


            function randomInteger(min, max) {
                return Math.round(min + Math.random() * (max - min));
            }     


            function getPeriodBorders(time, daysCount){
                var methods = ['setMilliseconds', 'setSeconds', 'setMinutes', 'setHours'];

                methods.forEach(function(method, id){
                    time = new Date(time)[method](0); 
                })

                return {
                    start: time,
                    end: time + millisecondsInDay * daysCount
                }
            } 
        }
    }
})();
