<?php
$dbhost = 'localhost';
$dbport = '5432';
$dbname = 'BancoDeDados';
$dbuser = 'Usuário';
$dbpass = 'Senha';

try {
    $dsn = "pgsql:host={$dbhost};port={$dbport};dbname={$dbname}";
    $pdo = new PDO($dsn, $dbuser, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Falha na conexão com o banco de dados: ' . $e->getMessage();
    exit;
}

//Primeiro verifica se a requisição é somente de telefone
if (isset($_POST['telefone']) && count($_POST) === 1) {
    $telefone = $_POST['telefone'];

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM cadastro_cliente WHERE telefone = :telefone");
    $stmt->bindParam(':telefone', $telefone);
    $stmt->execute();

    $count = $stmt->fetchColumn();

    if ($count > 0) { //se houver mais que um ele retorna que já existe
        echo 'Telefone já existente.';
    } else { //Se não ele insere
        $query = "INSERT INTO cadastro_cliente (telefone) VALUES (:telefone)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':telefone', $telefone);
        $result = $stmt->execute();

        if ($result) {
            echo 'Telefone inserido com sucesso.';
        } else {
            echo 'Erro ao inserir o telefone no banco de dados.';
        }
    }
} elseif (isset($_POST['nome']) && isset($_POST['cpf'])) { //Se a requisição não é só de telefone ele prossegue para aqui
    $nome = $_POST['nome'];
    $cpf = $_POST['cpf'];
    $telefone = $_POST['telefone'];
    if (validaCPF($cpf)) { //verifica se o cpf é válido aqui no PHP também
        $query = "UPDATE cadastro_cliente SET nome = :nome, cpf = :cpf WHERE telefone = :telefone";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':cpf', $cpf);
        $stmt->bindParam(':telefone', $telefone);
        $result = $stmt->execute();

        if ($result) {
            echo 'Dados atualizados com sucesso.';
        } else {
            echo 'Erro ao atualizar os dados no banco de dados.';
        }
    } else {
        echo 'CPF inválido';
    }
} else {
    echo 'Nenhuma solicitação válida foi recebida.';
}

function validaCPF($cpf)
{
    // Extrai somente os números
    $cpf = preg_replace('/[^0-9]/is', '', $cpf);

    // Verifica se foi informado todos os digitos corretamente
    if (strlen($cpf) != 11) {
        return false;
    }

    // Verifica se foi informada uma sequência de digitos repetidos. Ex: 111.111.111-11
    if (preg_match('/(\d)\1{10}/', $cpf)) {
        return false;
    }

    // Faz o calculo para validar o CPF
    for ($t = 9; $t < 11; $t++) {
        for ($d = 0, $c = 0; $c < $t; $c++) {
            $d += $cpf[$c] * (($t + 1) - $c);
        }
        $d = ((10 * $d) % 11) % 10;
        if ($cpf[$c] != $d) {
            return false;
        }
    }
    return true;
}