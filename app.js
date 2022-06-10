

class Circular {

    constructor(p = {processos: [], quantum: 0, tc: 0}){
        this.processos = [...p.processos].sort((a, b) => a.ingresso - b.ingresso)
        this.processos.map((v, i) => {
            v.tempoEspera = 0 
            v.rotacao = 0
            v.tempoExec = 0
        })

        this.quantum = p.quantum
        this.tempo = 0 + this.processos[0].ingresso
        this.tempoEsperaMedio = 0
        this.tc = p.tc
    }

    exec(){

        this.processos.map((v, i) => {
            if (v.tcpu <= 0){
                return 0
            }

            else if ( v.tcpu - this.quantum >= 0 ) {

                this.#calcCircular(v, this.quantum)
                
            } else if ( v.tcpu - this.quantum < 0 ) {

                this.#calcCircular(v, v.tcpu)
            }

        })


        this.#calcTEM()

        this.processos.forEach((v, i) => {
            v.tcpu != 0 ? this.exec() : ''

        })

    }

    #calcCircular(processo, tempo){
        this.#getTE(processo)

        this.tempo += tempo
        processo.tempoExec = this.tempo
        this.tempo += this.tc

        processo.tcpu -= tempo
        processo.tcpu < 0 ? processo.tcpu = 0 : ''

    }

    #getTE(processo){
        processo.rotacao == 0 ? processo.tempoEspera = this.tempo - processo.ingresso : processo.tempoEspera += this.tempo - processo.tempoExec
        processo.rotacao += 1

    }

    #calcTEM() {
        let num = 0
        this.processos.forEach((v, i) => {
            num += v.tempoEspera
        })

        this.tempoEsperaMedio = num / this.processos.length
    }

    getProcessos() {

        return this.processos
    }

    teste(){
        console.log(`Tempo de CPU: ${this.tempo-this.tc}\nTempo de espera medio ${this.tempoEsperaMedio}`)
    }

}


const objTeste = {
    processos: [
        {tcpu: 40, ingresso: 4},
        {tcpu: 20, ingresso: 1},
        {tcpu: 50, ingresso: 3},
        {tcpu: 30, ingresso: 0}
    ],
    quantum: 20,
    tc: 5
}

const cir = new Circular(objTeste)

console.log(cir.getProcessos())
cir.exec()
console.log(cir.getProcessos())
cir.teste()