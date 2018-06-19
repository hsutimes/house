/**
 * time 仿照 jquery 进行封装
 * @name time.js
 * @time 2018/5/6
 */
var time = {};
time.$ = function (id) {
    var ele = document.getElementById(id);
    ele.text = function (x) {
        if (x) {
            ele.innerText = x;
        }
        return ele.innerText;
    };
    ele.html = function (x) {
        if (x) {
            ele.innerHTML = x;
        }
        return ele.innerHTML;
    };
    ele.val = function (x) {
        if (x) {
            ele.value = x;
        }
        return ele.value;
    };
    return ele;
};
time.ajax = function (x) {
    var data = null;
    if (x.num) {
        data = 10;
        x.success(data);
    } else {
        x.error('error');
    }
};

