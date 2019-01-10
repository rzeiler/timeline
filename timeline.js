function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
}

function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}


function timeline(conf, obj) {


    var currentYear = new Date(2019, 0, 1);
    var itmes = [];
    var months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    for (let month = 1; month <= 12; month++) {
        currentYear.setMonth(month, 0);
        var year = currentYear.getFullYear();
        itmes.push({
            title: months[currentYear.getMonth()],
            notitle: true,
            from: year + "-" + month + "-1",
            to: year + "-" + month + "-" + currentYear.getDate(),
        });
    }

    conf.lines.push({
        color: "#a4bfd1",
        itmes: itmes
    });
    /* current date */

    var currentDate = new Date();
    conf.lines.push({
        color: "#ff1a4a",
        itmes: [{
            title: "Today",
            notitle: true,
            trun: true,
            from: currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate(),
            to: currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate()
        }]
    });

    var startdate = new Date(2019, 0, 1);
    var lastdate = new Date(2019, 0, 1);
    var enddate = new Date(2019, 11, 31, 23, 59, 59);
    var max = datediff(startdate, enddate);
    var long = 0;

    conf.lines.forEach(line => {

        lastdate = new Date(2019, 0, 1);
        var oline = document.createElement('div');
        addClass(oline, 'line');

        line.itmes.forEach(item => {
            var el = document.createElement('div');
            var bar = document.createElement('span');
            var h2 = document.createElement('h2');

            addClass(el, 'day');
            var _from = new Date(Date.parse(item.from));
            var _to = new Date(Date.parse(item.to));
            days = datediff(lastdate, _from);
            lastdate = _to;

            if (_to <= enddate && _from >= startdate) {
                long = datediff(_from, _to);
                addClass(el, 'mid');
            }

            if (_to >= enddate && _from >= startdate) {
                long = datediff(_from, enddate);
                addClass(el, 'end');
            }

            if (_to <= enddate && _from <= startdate) {
                long = datediff(startdate, _to);
                addClass(el, 'start');
            }

            var left = days * 100 / max;
            var width = long * 100 / max;

            if (width == 0) {
                width = 1.2;
            }

            el.style.marginLeft = left + "%";
            el.style.width = width + "%";

            if (item.notitle == undefined) {
                var h3 = document.createElement('h3');
                h3.innerText = _from.getDate() + "." + (_from.getMonth() + 1) + ".";
                h3.innerText += " - " + _to.getDate() + "." + (_to.getMonth() + 1) + ".";
                el.appendChild(h3);
            }
            h2.style.color = line.color;
            h2.innerText = item.title;
            el.appendChild(h2);

            bar.style.backgroundColor = line.color;
            addClass(bar, 'bar');
            el.appendChild(bar);
            oline.appendChild(el);
        });
        obj.appendChild(oline);
    });

}