document.querySelector('#button').addEventListener('click', () => {
    let code = document.querySelector('#code').value;
    let outputNode = document.querySelector('#output');
    try {
        let result = Function(code)();
        outputNode.innerText = String(result);
    } catch (error) {
        outputNode.innerText = `Error ${error}`;
    }
});
