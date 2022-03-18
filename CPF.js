console.clear();

function CPF(cpfEnviado) {
     Object.defineProperty(this, 'cpfLimpo', {
        get: function(){
            return cpfEnviado.replace(/\D+/g, '');
        }
     });
}

CPF.prototype.valida = function() {
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !==  11) return false;
    if(this.isSequencia()) return false

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCpf = cpfParcial + digito1 + digito2;

    return novoCpf === this.cpfLimpo;
};

CPF.prototype.gera = function() {
    let cpfRandom = "";

    for(let i=0; i<9; i++){
        let random = Math.floor(Math.random() * 10);
        cpfRandom += random;
    }

    const digito1 = this.criaDigito(cpfRandom);
    const digito2 = this.criaDigito(cpfRandom + digito1);

    const novoCpf = cpfRandom + digito1 + digito2;

    return novoCpf.slice(0,3) + "." + novoCpf.slice(3,6) + "." + novoCpf.slice(6,9) + "-" + novoCpf.slice(9);
};

CPF.prototype.criaDigito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;
    }, 0);

    const digito = 11 - (total%11);
    return digito > 9 ? '0' : String(digito);
};

CPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
}

const verificaCpf = new CPF('528.885.732-61');
const geraCpf = new CPF(); 

console.log(verificaCpf.valida()) // Verifica se o CPF é valido || true = válido || false = inválido
console.log();
console.log(geraCpf.gera()); // Gera um CPF válido aleatório
console.log();