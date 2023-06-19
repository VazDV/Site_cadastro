const telefone1Input = document.getElementById('telefone1');
const telefone2Input = document.getElementById('telefone2');
const nomeField = document.getElementById('nomeField');
const nomeInput = document.getElementById('nome');
const cpfField = document.getElementById('cpfField');
const cpfInput = document.getElementById('cpf');
const form = document.querySelector('form');
const btnEnviar = document.getElementById('submitButton');

// Validação CPF
function enviarTelefone(telefone) {
    $.ajax({
        url: 'EnviarDados.php',
        method: 'POST',
        data: { telefone: telefone },
        success: function(response) {
            // Callback de sucesso
            if(response === 'Telefone ja existente.')
            console.log(response);
        },
        error: function(error) {
            console.error(error);
        }
    });
}
function enviarNomeCpf(nome, cpf, telefone) {
    $.ajax({
        url: 'EnviarDados.php',
        method: 'POST',
        data: { nome: nome, cpf: cpf, telefone: telefone},
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.error(error);
        }
    });
}
telefone1Input.addEventListener('input', function () {
    var telefone1Value = $('#telefone1').val().replace(/[^0-9]/g, '');
    var telefone2Value = $('#telefone2').val().replace(/[^0-9]/g, '');
    if (telefone1Value !== '' && telefone1Value.length >= 10 && /^\d+$/.test(telefone1Value) && telefone1Value === telefone2Value) {
        nomeField.classList.remove('hidden');
        telefone1Input.readOnly = true;
        telefone1Input.classList.add('readonly');
        telefone2Input.readOnly = true;
        telefone2Input.classList.add('readonly');
        enviarTelefone(telefone1Value);
    } else {
        telefone1Input.readOnly = false;
        telefone1Input.classList.remove('readonly');
        telefone2Input.readOnly = false;
        telefone2Input.classList.remove('readonly');
        nomeField.classList.add('hidden');
        cpfField.classList.add('hidden');
        nomeInput.value = '';
        cpfInput.value = '';
    }
});
telefone2Input.addEventListener('input', function () {
    var telefone1Value = $('#telefone1').val().replace(/[^0-9]/g, '');
    var telefone2Value = $('#telefone2').val().replace(/[^0-9]/g, '');
    if (telefone1Value !== '' && telefone1Value.length >= 10 && /^\d+$/.test(telefone1Value) && telefone1Value === telefone2Value) {
        nomeField.classList.remove('hidden');
        telefone1Input.readOnly = true;
        telefone1Input.classList.add('readonly');
        telefone2Input.readOnly = true;
        telefone2Input.classList.add('readonly');
        enviarTelefone(telefone1Value);
    } else {
        telefone1Input.readOnly = false;
        telefone1Input.classList.remove('readonly');
        telefone2Input.readOnly = false;
        telefone2Input.classList.remove('readonly');
        nomeField.classList.add('hidden');
        cpfField.classList.add('hidden');
        nomeInput.value = '';
        cpfInput.value = '';
    }
});
nomeInput.addEventListener('input', function () {
    const nomeValue = nomeInput.value.trim();
    if (nomeInput.value.trim() !== '' && nomeValue.length >= 3 && /^[A-Za-z\s]+$/.test(nomeValue)) {
        cpfField.classList.remove('hidden');
    }
});
cpfInput.addEventListener('input', function (){
    var cpfValue = $('#cpf').val().replace(/[^0-9]/g, '');
    if(cpfValue.length === 11 && !validarCPF(cpfValue)){
        alert("CPF invalido");
    }
});
function checkFormValidity() {
    const nomeValue = nomeInput.value.trim();
    const cpfValue = cpfInput.value.trim();

    if (nomeInput.value.trim() !== '' && 
        nomeValue.length >= 3 && 
        /^[A-Za-z\s]+$/.test(nomeValue) && 
        validarCPF(cpfValue)
    ) {
        submitButton.classList.remove('hidden');
    } else {
        submitButton.classList.add('hidden');
    }
}

$(document).ready(function() {
    $('#telefone1').mask('(00) 00000-0000');
    $('#telefone2').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00');
});

btnEnviar.addEventListener('click', function(event) {
    var telefone1Value = $('#telefone1').val().replace(/[^0-9]/g, '');
    var cpfValue = $('#cpf').val().replace(/[^0-9]/g, '');
    event.preventDefault();
    const nomeValue = nomeInput.value.trim();
    enviarNomeCpf(nomeValue, cpfValue, telefone1Value);
  });

telefone1Input.addEventListener('input', checkFormValidity);
telefone2Input.addEventListener('input', checkFormValidity);
nomeInput.addEventListener('input', checkFormValidity);
cpfInput.addEventListener('input', checkFormValidity);