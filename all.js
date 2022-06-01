import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

class Textify {
    constructor(ele, delayTime, speed) {
        this.delayTime = delayTime
        this.speed = speed
        this.element = ele
        this.spilt()
    }
    spilt() {
        const words = this.element.textContent.trim().split("")
        words.forEach((item, index) => {
            words[index] = `<span>${item}</span>`
        })
        const text = words.join("")
        this.element.innerHTML = text
    }
    textify() {
        this.element
            .querySelectorAll("span")
            .forEach(i => (i.style.opacity = "0"))
        const animateTarget = this.element.querySelectorAll("span")
        const in_speed = this.speed
        const delayTime = this.delayTime
        setTimeout(function () {
            let count = 0
            for (let i = 0; i < animateTarget.length; i++) {
                const ele = animateTarget[i]
                $(ele)
                    .delay(in_speed * count) //delay 秒數
                    .animate({ opacity: "1" }, 0) //漸入秒數
                count++
            }
        }, delayTime)
    }
}

const nameFirst = document.querySelector(".sm_text")
const nameTitle = document.querySelector(".name")
const intro = document.querySelector(".intro")
const nameTitleAnimate = new Textify(nameTitle, 300, 40)
const nameIntroAnimate = new Textify(intro, 500, 30)
const nameFirstAnimate = new Textify(nameFirst, 0, 20)

const headerAnimate = document.querySelector(".header")
const body = document.querySelector(".body")
const loadingPage = document.querySelector(".loading_container")

window.addEventListener("load", function () {
    setTimeout(() => {
        loadingPage.classList.add("hide")
        body.classList.remove("hide")
        nameFirstAnimate.textify()
        nameTitleAnimate.textify()
        nameIntroAnimate.textify()
    }, 500)
    setTimeout(() => {
        headerAnimate.classList.add("show")
    }, 2000)
})

let lastScrollTop = 0
window.addEventListener(
    "scroll",
    function () {
        let st = window.pageYOffset || document.documentElement.scrollTop
        if (st > lastScrollTop) {
            headerAnimate.classList.remove("show")
        } else {
            headerAnimate.classList.add("show")
        }
        lastScrollTop = st <= 0 ? 0 : st
    },
    false
)
