const popup = document.getElementById("pop-up");
const successPopup = document.getElementById("success-popup");
const errorPopup = document.getElementById("error-popup");
const popupForm = document.querySelector(".pop-up-form");
const sendFormBtn = document.querySelector('.pop-up-btn');
const closeButton = document.querySelector(".pop-up-close");
const openPopupButtons = document.querySelectorAll(".open-pop-up, .values-btn, .equipment-btn");
const closeSuccessPopup = document.querySelector('.success-pop-up-btn');
const closeErrorPopup = document.querySelector('.error-pop-up-btn');
const burger = document.querySelector('.burger')
const headerMenu = document.querySelector('.header-menu')
const closeBurgerBtn = document.querySelector('.burger-close')
const headerLink = document.querySelectorAll('.header-link')
const contactsButton = document.querySelector('.contacts-btn')
const animItems = document.querySelectorAll('.anim-items')

if(animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll (params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }

            if((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('-active')
            } else {
                animItem.classList.remove('-active')
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    
    setTimeout(() => { 
        animOnScroll()
    }, 800)
}


burger.addEventListener('click', function() {
    headerMenu.classList.toggle('open')
})

const closeBurger = (el) => {
    el.classList.remove('open')
}

closeBurgerBtn.addEventListener('click', () => {
    closeBurger(headerMenu)
})
 
headerLink.forEach(button => {
    button.addEventListener('click', () => {
        closeBurger(headerMenu)
    })
})

const openPopup = (el) => {
    el.classList.add("active");
};

const closePopUp = (el) => {
    el.classList.remove("active");
};

// Додати події на кнопки відкриття форми
openPopupButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        openPopup(popup);
    });
});

closeSuccessPopup.addEventListener('click', () => closePopUp(successPopup))
closeErrorPopup.addEventListener('click', () => closePopUp(errorPopup))

// Додати подію для кнопки закриття форми
closeButton.addEventListener("click", () => closePopUp(popup));

// Обробка відправки форми
popupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
        name: popupForm.name.value,
        email: popupForm.email.value,
        subject: popupForm.subject.value,
        message: popupForm.message.value,
    }

    console.log(data);

    closePopUp(popup)
    console.log(successPopup)
    openPopup(successPopup)

    // sendDataToEmail(data)




    // Перевірка валідності форми
    // if (!form.checkValidity()) {
        // openPopup(errorPopup); // Показуємо вікно помилки, якщо є проблеми з валідацією
        // return;
    // }

    // fetch('https://example.com/api/send-message', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
    // .then(response => {
    //     if (response.ok) {
    //         closePopup(popup); 
    //         openPopup(successPopup);  Показуємо спливаюче вікно успіху
    //         form.reset();  Очищаємо форму
    //     } else {
    //         openPopup(errorPopup);  Показуємо спливаюче вікно помилки, якщо запит неуспішний
    //     }s
    // })
    // .catch(() => {
    //     openPopup(errorPopup);  Показуємо спливаюче вікно помилки при помилці мережі
    // });
});

async function sendDataToEmail(data) {
    try {
        const res = await fetch('https://example.com/api/send-message', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    
        openPopup(successPopup)
    } catch (e) {
        console.error(e)

        openPopup(errorPopup)
    }
}


function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('equipment-show');
      }
    });
}
  
let options = {
threshold: [0.2] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.equipment-slide');
  
for (let elm of elements) {
observer.observe(elm);
}