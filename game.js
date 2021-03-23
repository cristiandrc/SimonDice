const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const btnName = document.getElementById('btnName');
// const scoreName = document.getElementById('scoreName');
const scoreUser = document.getElementById('scoreUser');
const modal = document.getElementById('modal');
const ULTIMO_NIVEL = 100
var score = 0
var nameUser = localStorage.getItem("nameUser")
var mejorPuntaje = localStorage.getItem("mejorPuntaje");

class Juego {
    constructor() {
        
        this.inicializar()
        this.generarSecuencua()
        setTimeout(this.siguienteNivel, 500)
        
    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.capturarDatos = this.capturarDatos.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        //creamos un objeto con los elementos del DOM
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if(btnEmpezar.classList.contains('hide')) {
        btnEmpezar.classList.remove('hide')
        }else {
        btnEmpezar.classList.add('hide')
        }
    }


    generarSecuencua() {
    //Creamos un array con 10 numeros aleatorios 
    //.fill es para asignar un 0 a los 10 objetos del array 
    //Math.Floor es para que nos redonde hacia abajo
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }


    siguienteNivel() {
        this.subNivel = 0
        this.ilumunicarSecuencua()
        this.agregartEventosClick()
    }

    transformarNumeroAColor(num) {
        switch (num) {
            case 0:
                return 'celeste'

            case 1:
                return 'violeta'

            case 2: 
                return 'naranja'

            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0

            case 'violeta':
                return 1

            case 'naranja': 
                return 2

            case 'verde':
                return 3
        }
    }


    ilumunicarSecuencua() {
        for(let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            // se agregan ala pila de tares el asincronismo 
            setTimeout(() => this.iluminarColor(color), 1000 * i)
            
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout( () => this.apagarColor(color),350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregartEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)

        if(numeroColor === this.secuencia[this.subNivel]) {
            this.subNivel++
            if (this.subNivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick
                if(this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                }else {
                    score++
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        }else {
            // this.perdioElJuego()

            this.finDelJuego()
        }
    }

    ganoElJuego() {
        swal('Plazi', 'Felicitaciones Ganastes el juego', 'success')
        .then(this.inicializar.bind(this))
    }

    // perdioElJuego() {
    //     swal('Plazi', 'Perdiste', 'error')
    //     .then(() => {
    //         this.eliminarEventosClick()
    //         this.inicializar()
    //         this.mejorPuntaje()
    //         score = 0
    //     })
    // }
    
    finDelJuego() {
        this.eliminarEventosClick()
        this.inicializar()
        this.perdirDatos()
    }
    
    perdirDatos() {
        this.modalInfo()
        modal.classList.remove('hide')
        btnName.addEventListener('click', this.capturarDatos)
    }

    modalInfo() {
        console.log(score)
        console.log(mejorPuntaje)
        if(mejorPuntaje < score) {
            document.getElementById('scoreName').classList.remove('hide')


            document.getElementById('modalTitle').innerHTML = `
            FELICITACIONES POR TU RECORD
            `
            document.getElementById('modalParrafo').innerHTML = `
                Tu RECORD es: ${score}, Es el mejor RECORD que tienes.
            `
        }else {
            document.getElementById('modalTitle').innerHTML = `
            FELICITACIONES
            `
            document.getElementById('modalParrafo').innerHTML = `
                Tu RECORD es de: ${score} puntos
            `
            document.getElementById('scoreName').classList.add('hide')
        }
    }
    
    capturarDatos() {
        let name = document.getElementById('scoreName').value;
        this.mejorPuntaje(name)
        // if(name) {
        //     this.mejorPuntaje(name)
        // }
    }
    
    mejorPuntaje (id) {

        if(mejorPuntaje < score) {
            scoreUser.innerHTML = `
            <td>${id}</td>
            <td>${score}</td
            `
            mejorPuntaje = score
            this.guardarDatos(id)
        }
        modal.classList.add('hide')
        score = 0
    }

    guardarDatos(id) {
        localStorage.setItem("nameUser", id);
        localStorage.setItem("mejorPuntaje", score )
    }

}


function empezarJuego() {
    var juego = new Juego()
}

function localstorageInfo () {
        if(mejorPuntaje){

            scoreUser.innerHTML = `
            <td>${nameUser}</td>
            <td>${mejorPuntaje}</td
            `    
        }
}

function reiniciarLocalStorage() {
    localStorage.removeItem("nameUser");
    localStorage.removeItem("mejorPuntaje")
}

window.onload = localstorageInfo;