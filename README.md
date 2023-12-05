# UFJF | DCC077 - Aspectos Avançados em Bancos de Dados
 
# Relatório Final - Bancos de dados NoSQL

__Aluna:__ Vitória Isabela de Oliveira  
__Professor:__ Victor Ströele 
__Disciplina:__ DCC077 - Aspectos Avançados em Bancos de Dados  
__Departamento:__ Ciência da Computação  
__Universidade:__ Universidade Federal de Juiz de Fora  

> Para uma melhor navegação, leia esse arquivo na seção "Wiki" do GitHub.

#### Conteúdo
- [Visão Geral](#visão-geral)
- [Escolha do Banco de Dados](#escolha-do-banco-de-dados)
- [Fonte de Dados](#fonte-de-dados)
- [Domínio de Aplicação](#domínio-de-aplicação)
- [Configuração e Instalação](#configuração-e-instalação)
- [Consultas e Scripts](#consultas-e-scripts)
- [Análise Crítica](#análise-crítica)
- [Conclusões](#conclusões)

## Visão Geral
O objetivo final deste trabalho é possibilitar o contato com outros tipos de bancos de dados, especificamente bancos de dados não relacionais. O resultado será um relatório no formato de tutorial, em que será apresentado um passo-a-passo detalhado, com imagens e descrições, mostrando cada etapa realizada no trabalho. O intuito é criar um material educativo que possa servir como referência para outras pessoas que desejam aprender sobre a utilização de bancos de dados não relacionais. 

Os bancos de dados selecionados para este trabalho são MongoDB e Apache Cassandra. Ao longo do projeto, serão descritas suas características, objetivos, modelo de dados, além de especificar quais domínios de aplicação são mais adequados para cada um deles. 

Os dados utilizados variarão de acordo com a escolha do banco de dados e serão obtidos a partir de fontes disponíveis no Kaggle. 

O domínio de aplicação será descrito considerando os dados selecionados, e serão elaboradas pelo menos 5 consultas na linguagem de cada banco de dados para responder a perguntas relacionadas aos dados do domínio de aplicação. 

No final do relatório, será realizada uma análise crítica do uso dos SGBDs escolhidos e também da diferença do seu uso em comparação com um SGBD relacional. O relatório incluirá o passo a passo da configuração/instalação do banco de dados, descrição do domínio de aplicação, dos dados utilizados, e dos scripts (consulta e carga dos dados).

## Escolha do Banco de Dados
Para este trabalho, foram escolhidos dois bancos de dados não relacionais: MongoDB e Apache Cassandra. Ambos os bancos de dados têm características e capacidades únicas que os tornam adequados para determinados tipos de tarefas e domínios de aplicação.

A instalação foi realizada no sistema operacional Windows, utilizando o Windows Subsystem for Linux (WSL) com Ubuntu. No tópico **Instalação** estão os passos para a instalação dos bancos de dados nos diferentes sistemas operacionais.

## Domínio de Aplicação

### MongoDB
O domínio de aplicação para o MongoDB neste projeto é o conjunto de perguntas e respostas do site Stack Overflow. Este ambiente é extremamente rico para explorar questões relacionadas à popularidade de tópicos específicos (tags), visualizações de perguntas, votos em respostas e muitos outros aspectos interessantes. A natureza orientada a documentos do MongoDB permite uma modelagem de dados flexível, o que é ideal para lidar com a estrutura complexa e variável das postagens do Stack Overflow.
- **stack_network_links** contém links da rede, as tags tecnológicas de origem e destino mais o valor do link entre cada par.
- **stack_network_nodes** contém nós da rede, o nome de cada nó, a qual grupo esse nó pertence (calculado por meio de um walktrap de cluster), e um tamanho de nó baseado na frequência com que essa tag de tecnologia é usada.

### Apache Cassandra
O domínio de aplicação para o Apache Cassandra neste projeto é o conjunto de dados de viagens de táxi em Nova York. Este domínio de aplicação envolve lidar com uma grande quantidade de registros de viagens de táxi, cada um contendo informações como a duração da viagem, a distância percorrida, o tempo de partida, etc. A arquitetura baseada em colunas do Apache Cassandra torna-o bem adequado para manipular eficientemente esses tipos de dados de leitura intensiva.

- **train.csv** - o conjunto de treinamento (contém 1458644 registros de viagem)
- **test.csv** – o conjunto de testes (contém 625134 registros de viagem)
- **sample_submission.csv** - um arquivo de envio de amostra no formato correto

## Configuração e Instalação
### Instalação do MongoDB

#### Windows
1. Baixe o instalador do MongoDB Community Server a partir do [site oficial](https://www.mongodb.com/try/download/community).
2. Execute o instalador e siga as instruções na tela.
3. Após a instalação, você deve adicionar o diretório bin do MongoDB ao seu PATH do sistema.

#### Mac
1. Use o Homebrew para instalar o MongoDB: ```brew tap mongodb/brew``` e ```brew install mongodb-community```.
2. Para iniciar o MongoDB, use o comando: `brew services start mongodb-community`.

#### Linux
1. Para instalar o MongoDB no Ubuntu, use os seguintes comandos:

```sudo apt-get    sudo apt-get install -y mongodb```

### Instalação do Apache 
#### Windows
A instalação do Apache Cassandra no Windows foi feita através do WSL com Ubuntu, seguindo as instruções do [site oficial do Apache Cassandra](http://cassandra.apache.org/doc/latest/getting_started/installing.html) e do [tutorial de instalação do Cassandra no Windows 10](https://www.heatware.net/cassandra/cassandra-windows-10-setup-install/).

Os passos básicos são:

1. Instale o WSL no Windows seguindo as instruções da Microsoft.
2. Baixe e instale o Ubuntu na Microsoft Store.
3. Abra o Ubuntu e atualize o sistema com o comando: `sudo apt-get update`.
4. Instale o Java Development Kit (JDK) com o comando: `sudo apt-get install openjdk-8-jdk`.
5. Verifique a instalação do Java com o comando: `java -version`.
6. Adicione o repositório do Cassandra aos repositórios do APT com o comando: `echo "deb http://www.apache.org/dist/cassandra/debian 40x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list`.
7. Adicione as chaves GPG do Cassandra com os comandos: `curl https://www.apache.org/dist/cassandra/KEYS | sudo apt-key add -` e `sudo apt-get update`.
8. Instale o Cassandra com o comando: `sudo apt-get install cassandra`.
9. Verifique a instalação do Cassandra com o comando: `nodetool status`.

#### Mac
1. Use o Homebrew para instalar o Cassandra: `brew install cassandra`.
2. Para iniciar o Cassandra, use o comando: `brew services start cassandra`.

#### Linux
1. Siga os mesmos passos descritos para o Windows, começando com a atualização do sistema com o comando: `sudo apt-get update`.

## Fonte de Dados
Os conjuntos de dados utilizados para este projeto foram selecionados levando em consideração as características específicas e as forças de cada banco de dados não relacional escolhido.

Para o **MongoDB**, que é um banco de dados orientado a documentos, foi escolhido o conjunto de dados "Stack Overflow Tag Network". Este conjunto contém perguntas e respostas do site Stack Overflow, sendo perfeitamente representado como documentos. Cada postagem pode ser representada como um documento, com campos para o título da postagem, corpo, tags, respostas, entre outros. Este conjunto de dados pode ser encontrado no Kaggle [aqui](https://www.kaggle.com/stackoverflow/stack-overflow-tag-network).

Para o **Apache Cassandra**, optamos pelo conjunto de dados "NYC Taxi Trip Duration", que contém dados sobre viagens de táxi em Nova York. As viagens de táxi podem ser facilmente modeladas como uma tabela, com colunas para a duração da viagem, distância, tempo de partida, etc. Este conjunto de dados pode ser encontrado no Kaggle [aqui](https://www.kaggle.com/c/nyc-taxi-trip-duration/data).

## Consultas e Scripts

### MongoDB
A seguir estão os scripts utilizados para carregar os dados no MongoDB e as consultas realizadas no conjunto de dados "Stack Overflow Tag Network". 

**Importação de Dados:**

Antes de executar as consultas, é necessário importar os dados para o MongoDB. Neste projeto, a importação foi realizada através de um arquivo `.csv` utilizando a interface visual do MongoDB.

Passos para importar os dados através da interface visual do MongoDB:

1. Inicie o MongoDB e abra o MongoDB Compass (a interface visual do MongoDB).
2. Conecte-se ao seu banco de dados.
3. Selecione o banco de dados e a coleção para a qual deseja importar os dados.
4. Clique no botão "IMPORT DATA" e selecione o arquivo `.csv`.
5. Selecione as opções de importação desejadas e clique em "IMPORT" para iniciar a importação dos dados.

## Consultas para **stack_network_links**
1. **Encontrar as 10 tags mais comuns**
    Esta consulta pode ser útil para entender quais são os tópicos mais discutidos no Stack Overflow.
    ```
    db.tags_network.aggregate([   {      $group: {        _id: "$source",        count: { $sum: 1 }      }    },   {      $sort: { count: -1 }    },   {      $limit: 10    } ])
    ```

    ![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/c8a130a0-72ce-475e-9ed8-e05a10e87a14)
   
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/e372fa5e-b400-4ed5-87b4-acac44711242)


2. **Encontrar a pergunta mais visualizada**
   
    Esta consulta pode nos ajudar a entender quais perguntas atraem mais atenção dos usuários.
   ```
       db.tags_network.find().sort({viewCount:-1}).limit(1)
    ```

   ![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/68c2bc8a-81cb-4a78-88fa-2e183bdbd627)
   
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/501734fa-63cf-42e8-aab7-6349e4eb3919)


3. **Encontrar a resposta mais votada**
   
    Esta consulta pode mostrar qual resposta foi considerada mais útil pelos usuários.
   ```
    db.tags_network.find().sort({score:-1}).limit(1)
    ```

   ![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/8c0caf5f-f298-48ba-a89e-3628af03c75c)

   ![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/1ca0d94f-bce3-4211-98a5-1dc85470fc98)


4. **Encontrar o usuário com mais postagens**

   Esta consulta pode nos ajudar a identificar os usuários mais ativos.
   ```
      db.tags_network.aggregate([   {     $group: {       _id: "$source",       totalPosts: { $sum: 1 }     }   },   {     $sort: { totalPosts: -1 }   },   {     $limit: 1   } ])
    ```

   ![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/bc9c2062-f275-4877-a502-3f6a8c5cf2d1)

   
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/c9de7bdc-d417-4960-9c39-3c296be2f633)


![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/c9c3f677-077f-4c4f-8c0e-31404a1e5802)


5. **Encontrar a média de visualizações por tag**
   
    Esta consulta pode nos dar uma ideia de quais tópicos atraem mais visualizações em média.
   ```
   db.tags_network.aggregate([   {     $group: {       _id: "$source", // ou "_id: "$target"" dependendo da média desejada       avgValue: { $avg: "$value" }     }   },   {     $sort: { avgValue: -1 }   } ])
    ```

   ![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/f795b1d5-4d12-4b4c-a08f-0c64312bb6bc)
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/0a943cdd-4a9c-49bd-9da4-959b6f40eafd)

## Consultas para **stack_network_nodes**

1. **Encontrar as 10 tags mais utilizadas**

   Esta consulta pode ajudá-lo a entender quais são as tecnologias mais discutidas no Stack Overflow.

   ```
   db.nodes_tags_network.aggregate([
       { $group: { _id: "$name", count: { $sum: "$size" } } },
       { $sort: { count: -1 } },
       { $limit: 10 }
   ])
   ```
   ![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/1483eb8a-e7ec-49d7-b59e-f9d6c9a0a9c2)
   
   ![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/e3878718-611f-450f-9de1-8f1161ac2dbc)


2. **Encontrar todas as tags pertencentes a um determinado grupo**

Esta consulta pode ser útil para entender quais tecnologias estão associadas a um determinado grupo (grupo = 8).
```
   db.nodes_tags_network.find({ "group": 8 })
```
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/4c9c2054-a76e-46d4-9045-4b98b7eedbea)

![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/73881584-3679-4618-a29b-d4598fb9ce18)


3. **Encontrar a média do tamanho das tags para cada grupo**

Esta consulta pode ajudá-lo a entender a popularidade média das tecnologias em cada grupo.
```
   db.nodes_tags_network.aggregate([
       { $group: { _id: "$group", avgSize: { $avg: "$size" } } },
       { $sort: { avgSize: -1 } }
   ])
   ```

![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/1ab60c62-ea39-4e52-a6d0-f78666aac6db)

![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/ca358e6b-fab1-49ad-bbb6-43c054a46b97)

### Apache Cassandra
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/28058c08-a1f2-4951-bcbf-f78bc204c879)


**Criação da Database e da Tabela**

No Cassandra, os dados são armazenados em tabelas que estão contidas em keyspaces (equivalentes a bancos de dados em SGBDs relacionais). Então, o primeiro passo é criar um keyspace. Neste caso, o keyspace criado se chama `nyc_taxi`.
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/13969ce8-f0cb-434e-b6e1-9d9faf833753)

Após a criação do keyspace, a próxima etapa é criar a tabela que vai armazenar os dados das viagens de táxi. Neste caso, a tabela criada se chama `trip_data` e contém colunas para armazenar várias informações sobre cada viagem de táxi, incluindo o id da viagem, o id do fornecedor, o tempo de início e término da viagem, a quantidade de passageiros, a longitude e a latitude de início e fim da viagem, um sinalizador indicando se a viagem foi armazenada e encaminhada, e a duração da viagem. Ah! Não se esqueça de dar `USE` no seu keyspace

![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/7130345c-f94c-4d12-bff5-73850fcc087b)

**Importação de Dados**

Com a tabela criada, o próximo passo é importar os dados do arquivo CSV para a tabela `trip_data`. No Cassandra, isso pode ser feito usando o comando `COPY`. Entretanto, como o Cassandra está sendo executado no Windows Subsystem for Linux (WSL), o caminho do arquivo precisa ser especificado de uma forma particular para que o WSL possa acessá-lo.

No Windows, os arquivos são acessados através de caminhos que começam com uma letra de unidade, como `C:\`. Entretanto, no WSL, os arquivos no sistema Windows são acessados através de um caminho que começa com `/mnt/`, seguido pela letra da unidade. Por exemplo, o caminho `C:\UFJF\asp-avanc-bd\nyc-taxi-trip-duration\train\train.csv` no Windows se torna `/mnt/c/UFJF/asp-avanc-bd/nyc-taxi-trip-duration/train/train.csv` no WSL.

Portanto, ao usar o comando `COPY` para importar o arquivo CSV, o caminho do arquivo é especificado no formato do WSL. Aqui está o comando com o caminho do arquivo convertido:

![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/427ee352-bf1c-4956-b620-8cb2149b70ec)

## Consultas para nyc_taxi.trip_data
> Nota: O Cassandra é otimizado para alta velocidade de gravação e leitura e não é projetado para substituir todas as funcionalidades de um SGBD relacional. Algumas operações que são comuns em SGBDs relacionais, como joins e agregações complexas, são limitadas ou ausentes no Cassandra.

1. **Contar o número total de viagens**
Esta consulta pode ser útil para saber o número total de viagens registradas no conjunto de dados.
```
   SELECT COUNT(*) FROM nyc_taxi.trip_data;
```
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/e9881443-7391-4e3c-b546-1e83b1682e39)


2. **Obter detalhes de uma viagem específica**
Esta consulta pode ser útil para saber os detalhes de uma viagem específica (id= 87).
```
    SELECT * FROM nyc_taxi.trip_data WHERE id = 'id1301050';
```   

![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/426d6e4f-7e04-4a0a-8869-538918ebcf52)


3. **Obter a quantidade de viagens feitas por um fornecedor específico**
Esta consulta pode ser útil para saber qual foi a viagem mais longa registrada no conjunto de dados.
>No Cassandra, a filtragem em colunas que não fazem parte da chave primária não é permitida por padrão devido a considerações de desempenho. A mensagem de erro que você está vendo é o Cassandra protegendo você de potencialmente realizar uma operação muito ineficiente.
>Se você entende as implicações de desempenho e ainda deseja executar a consulta, você pode fazê-lo adicionando a cláusula ALLOW FILTERING ao final da consulta. Isso pode fazer com que a consulta seja muito lenta se estiver trabalhando com uma grande quantidade de dados, porque o Cassandra terá que verificar todas as linhas da tabela.
>No entanto, usar ALLOW FILTERING geralmente não é uma boa prática. Se você achar que precisa usar ALLOW FILTERING com frequência, geralmente é um sinal de que seu modelo de dados pode precisar ser ajustado para se adequar melhor aos padrões de consulta que você precisa suportar.

> Considerando que a quantidade de viagens por fornecedor é uma informação importante, a maneira mais eficaz de obter essa informação seria ter uma tabela separada com vendor_id como chave primária e uma contagem de viagens para cada fornecedor. No entanto, você pode conseguir uma contagem aproximada com um limite especificado usando o comando a seguir:
```
    SELECT * FROM nyc_taxi.trip_data WHERE vendor_id = 1 ALLOW FILTERING;
```

![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/12b91002-b4f6-45d2-81a4-5b8405afbc7e)
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/61a12785-5653-407e-8126-f8604cd7cdfb)


4. **Obter todas as viagens que tiveram mais do que um certo número de passageiros**
Supondo que passenger_count faça parte da chave primária, você pode usar esta consulta para obter todas as viagens que tiveram mais do que um certo número de passageiros.
```
   SELECT * FROM nyc_taxi.trip_data WHERE passenger_count > 2 ALLOW FILTERING;
```

![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/703558ee-e6b6-4a00-af7a-a66e7279149b)
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/3cb501b5-0ea9-4a3c-8db8-5011a306cf2d)


5. **Obter todas as viagens que duraram mais do que um certo tempo**
Supondo que trip_duration faça parte da chave primária, você pode usar esta consulta para obter todas as viagens que duraram mais do que um certo tempo.
```
   SELECT * FROM nyc_taxi.trip_data WHERE trip_duration > 200 ALLOW FILTERING;
```
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/b4bce93b-204c-4187-888e-3e26ca81ef22)
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/27684501-4dc2-4096-8446-67a66e6145f0)


6. **Obter detalhes de uma lista específica de viagens**
Se você tiver uma lista específica de IDs de viagem e quiser obter detalhes para essas viagens, você pode usar o operador IN na cláusula WHERE.
```
      SELECT * FROM nyc_taxi.trip_data WHERE id IN ('id3047600', 'id1378513', 'id3858529');
```

![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/4a574da4-dac4-4384-bd54-a27e5ed93460)


7. **Obter a primeira e a última viagem registrada**
Supondo que id seja um identificador único que é atribuído sequencialmente às viagens à medida que são registradas, podemos usar as funções MIN e MAX para obter as primeiras e as últimas viagens registradas:
```
   SELECT * FROM nyc_taxi.trip_data WHERE id IN ('id2379040', 'id3888028');
   SELECT * FROM nyc_taxi.trip_data WHERE id = (SELECT MAX(id) FROM nyc_taxi.trip_data);
```
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/7eba53ce-f31f-49f3-a79d-12dda779c7a9)


8. **Encontrar o número de viagens que foram armazenadas e encaminhadas**
Esta consulta pode ser útil para saber o número de viagens que foram armazenadas e encaminhadas para transmissão.
```
   SELECT COUNT(*) FROM nyc_taxi.trip_data WHERE store_and_fwd_flag = 'Y' ALLOW FILTERING;
```
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/c6befd23-9f9e-4dad-ad08-0d6ecd6d8b03)

9. **Obter todas as viagens feitas por um fornecedor específico**
Esta consulta retornará todas as viagens feitas por um fornecedor específico (neste caso, o fornecedor com vendor_id = 1).
```
   SELECT * FROM nyc_taxi.trip_data WHERE vendor_id = 1 ALLOW FILTERING;
```
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/ea72eb94-04ef-4777-8b98-e39029b47cfd)
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/0a103481-b876-4879-a5be-6a7d0e423e81)

10. **Obter todas as viagens feitas por um fornecedor específico**
Esta consulta retornará todas as viagens realizadas por um fornecedor específico (neste caso, o fornecedor com vendor_id = 1) que tiveram mais de 2 passageiros.
```
   SELECT * FROM nyc_taxi.trip_data WHERE vendor_id = 1 AND passenger_count > 2 ALLOW FILTERING;
```
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/e5d1a9c4-31c0-472a-b678-b147264e9d76)
![image](https://github.com/vitoria-isabela/bancos-nosql-dcc077/assets/65192005/2c49b0da-c44d-41cb-b293-dcdf6bdfd2d4)

## Análise Crítica

### MongoDB vs SGBD Relacional

**Estrutura de Dados**
- MongoDB: Orientado a documentos, armazena dados em documentos BSON (semelhante ao JSON). Permite estruturas de dados complexas e variáveis.
- SGBD Relacional: Armazena dados em tabelas com uma estrutura fixa. Melhor para dados estruturados que se encaixam em um esquema fixo.

**Escalabilidade**
- MongoDB: Projetado para escalabilidade horizontal, adicionando mais servidores conforme necessário. Ideal para lidar com grandes volumes de dados e crescimento futuro.
- SGBD Relacional: Geralmente escalado verticalmente, adicionando mais recursos a um único servidor. Pode ser mais caro e ter limitações.

**Consistência e Transações**
- MongoDB: Suporte para transações multi-documentos a partir da versão 4.0, mas os SGBDs relacionais geralmente têm suporte mais robusto e maduro para transações.
- SGBD Relacional: Fornece transações ACID (Atomicidade, Consistência, Isolamento, Durabilidade), garantindo alta precisão e integridade dos dados.

**Modelagem de Dados**
- MongoDB: Suporta referências (semelhante às chaves estrangeiras) ou armazena dados relacionados no mesmo documento. Não suporta operações de join como bancos de dados relacionais.
- SGBD Relacional: Os dados são organizados em tabelas e as relações são expressas por meio de chaves estrangeiras e operações de join. Efetivo para modelar relações complexas entre entidades.

**Esquema**
- MongoDB: Sem esquema, permite a inserção de documentos de diferentes estruturas na mesma coleção. Ideal para dados que mudam rapidamente.
- SGBD Relacional: Exige um esquema definido antes da inserção de dados. Permite a imposição de regras de validação de dados no nível do banco de dados.
  
***

### Cassandra vs SGBD Relacional

**Estrutura de Dados**
- **Cassandra**: Armazena dados em tabelas, mas é orientado a colunas em vez de linhas. Permite estruturas de dados de alta flexibilidade e é ideal para lidar com grandes volumes de dados distribuídos.
- **SGBD Relacional**: Armazena dados em tabelas com uma estrutura fixa. Melhor para dados estruturados que se encaixam em um esquema fixo.

**Escalabilidade**
- **Cassandra**: Projetado para escalabilidade horizontal, adicionando mais servidores conforme necessário. Ideal para lidar com grandes volumes de dados e crescimento futuro. Suporta replicação nativa e distribuição de dados em vários nós.
- **SGBD Relacional**: Geralmente escalado verticalmente, adicionando mais recursos a um único servidor. Pode ser mais caro e ter limitações.

**Consistência e Transações**
- **Cassandra**: Oferece um modelo de consistência eventual e não suporta transações ACID (Atomicidade, Consistência, Isolamento, Durabilidade) como os SGBDs relacionais.
- **SGBD Relacional**: Fornece transações ACID, garantindo alta precisão e integridade dos dados.

**Modelagem de Dados**
- **Cassandra**: Não suporta operações de join ou subconsultas. A modelagem de dados deve ser feita com base nas consultas que serão realizadas.
- **SGBD Relacional**: Os dados são organizados em tabelas e as relações são expressas por meio de chaves estrangeiras e operações de join. Efetivo para modelar relações complexas entre entidades.

**Esquema**
- **Cassandra**: Embora tecnicamente seja um banco de dados sem esquema, na prática, você precisa definir colunas e tipos de dados ao criar tabelas. No entanto, permite a adição dinâmica de novas colunas.
- **SGBD Relacional**: Exige um esquema definido antes da inserção de dados. Permite a imposição de regras de validação de dados no nível do banco de dados.

## Conclusões
Através deste trabalho, pudemos explorar e entender mais profundamente as características e capacidades de dois tipos populares de bancos de dados NoSQL, o MongoDB e o Apache Cassandra. Cada banco de dados possui um conjunto único de características que o torna adequado para certos tipos de tarefas e domínios de aplicação.
O MongoDB, sendo um banco de dados orientado a documentos, mostrou-se particularmente eficaz para lidar com dados que têm uma estrutura complexa e variável, como os dados das postagens do Stack Overflow. A flexibilidade do MongoDB nos permitiu modelar os dados de maneira eficiente e realizar uma variedade de consultas para extrair insights úteis.
O Apache Cassandra, por outro lado, com sua arquitetura baseada em colunas, provou ser ideal para lidar com grandes volumes de dados de leitura intensiva, como os dados das viagens de táxi em Nova York. Apesar de algumas limitações em relação às operações que podem ser realizadas (em comparação com um SGBD relacional), o Cassandra permitiu um desempenho de leitura muito rápido e eficiente.
No entanto, uma coisa que ficou clara durante este trabalho é que os bancos de dados NoSQL não são uma solução universal para todos os problemas. Eles têm suas próprias forças e fraquezas e são mais adequados para certos tipos de tarefas e domínios de aplicação. Portanto, é importante entender as características e capacidades de cada banco de dados ao escolher um banco de dados para um projeto específico.
Além disso, também ficou claro que a modelagem de dados em um banco de dados NoSQL é fundamentalmente diferente da modelagem de dados em um SGBD relacional. Em um banco de dados NoSQL, a modelagem de dados é fortemente orientada pelas consultas que serão realizadas, e é importante levar isso em consideração ao projetar o esquema do banco de dados.
Em conclusão, este trabalho foi uma oportunidade valiosa para aprender sobre bancos de dados NoSQL e ganhar experiência prática com o MongoDB e o Apache Cassandra. Os bancos de dados NoSQL oferecem um conjunto de ferramentas poderosas para lidar com os desafios associados ao gerenciamento de grandes volumes de dados variáveis e em constante crescimento, e é claro que eles desempenharão um papel cada vez mais importante no mundo dos dados.
