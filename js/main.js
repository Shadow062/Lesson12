// Такиим образом мы говорим после загрузки страницы заработает Скрипты
window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }


    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Пишем таймер
    let deadline = '2020-04-25 00:00';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        // hours = Math.floor((t / 1000 / 60 / 60) % 24),
        // Что бы получить количество дней
        // days = Math.floor((t / (1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    function zero(a) {
        if (a < 10) {
            a = '0' + a;
        }
        return a;
    }

    setClock('timer', deadline);

    // Modal

    // 1) Первый способ
    //     let more = document.querySelector('.more'),
    //         overlay = document.querySelector('.overlay'),
    //         close = document.querySelector('.popup-close'),
    //         descriptionBtn = document.querySelector('.description-btn');

    //     // Узнать больше
    //     more.addEventListener('click', function () {
    //         overlay.style.display = 'block';
    //         this.classList.add('more-splash');
    //         document.body.style.overflow = 'hidden';
    //     });

    //     // Для закрытия модального окна
    //     close.addEventListener('click', function () {
    //         overlay.style.display = 'none';
    //         more.classList.remove('more-splash');
    //         document.body.style.overflow = '';
    //     });

    // 2) Второй способ думаю самый хороший
    function modalWindow(openModal) {

        let overlay = document.querySelector('.overlay'),
            close = document.querySelector('.popup-close'),
            open = document.querySelectorAll(openModal);

        for (let i = 0; i < open.length; i++) {

            open[i].addEventListener('click', function () {
                overlay.style.display = 'block';
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            });

            close.addEventListener('click', function () {
                overlay.style.display = 'none';
                open[i].classList.remove('more-splash');
                document.body.style.overflow = '';
            });

        }

    }
    modalWindow('.more');
    modalWindow('.description-btn');


    // 3) Третий способ
    // function openModal(e) {
    //     const target = e.target,
    //         body = document.body,
    //         modal = document.querySelector('.overlay'),
    //         closeBtn = modal.querySelector('.popup-close');

    //     modal.style.display = 'block';
    //     body.style.overflow = 'hidden';
    //     target.classList.add('more-splash');

    //     closeBtn.addEventListener('click', function () {
    //         modal.style.display = 'none';
    //         body.style.overflow = '';
    //         target.classList.remove('more-splash');
    //     });
    // }

    // document.querySelector('.more').addEventListener('click', openModal);

    // document.querySelectorAll('.description-btn').forEach(function (btn) {
    //     btn.addEventListener('click', openModal);
    // });

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо. Скоро мы с вами свяжемся!',
        failure: 'Ошибка...'
    };

    let form = document.querySelector('.main-form'),
        contactForm = document.querySelector('#form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');


    statusMessage.classList.add('status');

    function sendRequest(data) {
        data.addEventListener('submit', function (event) {
            event.preventDefault();
            data.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            let formData = new FormData(data);
            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);
            request.send(json); //

            request.addEventListener('readystatechange', function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });
    }

    sendRequest(form);
    sendRequest(contactForm);
});