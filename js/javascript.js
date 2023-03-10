console.log('Scripts cargado exitosamente.');

var array = [];
var subarrays = [];

const submitEvent = (event) => {
    event.preventDefault();
    console.log('The submitEvent function was called with params', { event });
    return;
}

const agregarElemento = (numero) => {

    console.log('The agregarElemento function was called with params', { numero });

    if (typeof numero === 'string' && numero !== '') {
        numero = Number(numero);
    }

    if (numero === '') {
        $('#errorMessage').addClass('d-block');
        $('#errorMessage').text('El elemento del array no puede estar vacio.');
        throw new Error("El parametro numero no puede estar vacio.");
    }

    if (typeof numero !== 'number' || Number.isNaN(numero)) {
        $('#errorMessage').addClass('d-block');
        $('#errorMessage').text('El elemento del array debe ser un numero.');
        throw new Error("El parametro numero debe ser un numero.");
    }

    $('#errorMessage').removeClass('d-block');
    $('#button2').prop('disabled', false);
    array.push(numero);
    imprimirArray();
    resetNumero();

}

const resetNumero = () => {
    nuevoNumero.value = '';
    nuevoNumero.focus();
}

const imprimirArray = () => {
    console.log('The imprimirArray function was called');
    console.log('array data', array);
    const result = `[${array.join(', ')}]`;
    $('#elementosArray').html(result);
    obtenerSubarrays();
}

const obtenerSubarrays = () => {

    console.log('The obtenerSubarrays function was called');

    const tam = array.length;
    subarrays = [];

    for (let i = 0; i < tam; i++) {

        const tamSubarray = i + 1;

        for (let j = 0; j < tam; j++) {

            const subarray = array.slice(j, j + tamSubarray);

            if (subarray.length === tamSubarray) {
                subarrays.push(subarray);
                console.log('subarray', subarray);
            }

        }

    }

}

const calcular = (constante) => {

    console.log('The calcular function was called with params', { k: constante });

    if (typeof constante === 'string' && constante !== '') {
        constante = Number(constante);
    }

    if (constante === '') {
        $('#errorMessage2').addClass('d-block');
        $('#errorMessage2').text('El campo constante K no puede estar vacio.');
        throw new Error("El parametro numero no puede estar vacio.");
    }

    if (typeof constante !== 'number' || Number.isNaN(constante)) {
        $('#errorMessage2').addClass('d-block');
        $('#errorMessage2').text('La constante K debe ser un numero.');
        throw new Error("El parametro numero debe ser un numero.");
    }

    if (array.length === 0) {
        $('#errorMessage2').addClass('d-block');
        $('#errorMessage2').text('Debes llenar los elementos del array para continuar');
        throw new Error("Debes llenar los elementos del array para continuar.");
    }

    $('#errorMessage2').removeClass('d-block');

    let htmlTable = '';
    let cont = 0;

    for (let i = 0; i < subarrays.length; i++) {

        const subarray = subarrays[i];
        let prod = 1;

        for (let j = 0; j < subarray.length; j++) {
            prod *= subarray[j];
        }

        const applied = prod <= constante;

        htmlModel = `
        <tr>
            <th scope="row">${(i+1)}</th>
            <td>[${subarray.join(', ')}]</td>
            <td>${subarray.join('x')}</td>
            <td>${prod}</td>
            <td>${ applied ? 'Si' : 'No' }</td>
        </tr>`;

        htmlTable += htmlModel;

        if (applied) {
            cont++;
        }

    }

    $('#subarraysData').html(htmlTable);
    $('#total').text(cont);

}

const mostrarAplicativo = () => {
    $('#aplicativo').removeClass('d-none');
}

const resetearArray = () => {
    $('#elementosArray').html('No hay elementos dentro del array para mostrar');
    $('#button2').prop('disabled', true);
    array = [];
}