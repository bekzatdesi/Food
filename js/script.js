'use sctict';
document.addEventListener('DOMContentLoaded', function() {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) { // значения по умолчание
        tabsContent[i].classList.add('show', 'fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target; //Элемент который кликнули
        if (target && target.classList.contains('tabheader__item')) {
            for (let i = 0; i < tabs.length; i++) {
                if (target == tabs[i]) {
                    hideTabContent();
                    showTabContent(i);
                }
            }
        }
    });
    // Timer

    const deadline = '2022-12-15';
    
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date);
        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), 
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }


        return {
          'total': t,
          'days': days,
          'hours': hours,
          'minutes': minutes,
          'seconds': seconds  
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }else {
            return num;
        }
    }
    
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
              updateClock()
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
    // console.log(getTimeRemaining(deadline)) //296231000
    // console.log(new Date());
});


// Modal
const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalClose = document.querySelector('[data-close]');

function openModal() {
    modal.classList.toggle('active')
    document.body.classList.add('hidden')
    clearInterval(modalTimer)
}
modalTrigger.forEach(item => {
    item.addEventListener('click', () => {
        openModal();
    })
})

const modalTimer = setTimeout(openModal, 30000)

function modalCloseF() {
    modal.classList.remove('active');
    document.body.classList.remove('hidden')
}

modalClose.addEventListener('click', () => {
    modalCloseF();
})

modal.addEventListener('click', (e) => {
    if (e.target && e.target == modal) {
        modalCloseF();
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code == "Escape" && modal.classList.contains('active')) {
        modalCloseF();
    }
})

function shoeM() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
        console.log(window.pageYOffset); //Скроленный 
        console.log(document.documentElement.clientHeight); // виденный обьект
        console.log(document.documentElement.scrollHeight); // общий высота
        openModal();
        window.removeEventListener('scroll', shoeM)
    }
}
window.addEventListener('scroll', shoeM);
