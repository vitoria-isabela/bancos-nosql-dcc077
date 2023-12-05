
///## Consultas para **stack_network_links**

    // 1. **Encontrar as 10 tags mais comuns**
    //     Esta consulta pode ser útil para entender quais são os tópicos mais discutidos no Stack Overflow.
    db.tags_network.aggregate([   {      $group: {        _id: "$source",        count: { $sum: 1 }      }    },   {      $sort: { count: -1 }    },   {      $limit: 10    } ])

    // 2. **Encontrar a pergunta mais visualizada**
    //     Esta consulta pode nos ajudar a entender quais perguntas atraem mais atenção dos usuários.
        db.tags_network.find().sort({viewCount:-1}).limit(1)

    // 3. **Encontrar a resposta mais votada**
    //     Esta consulta pode mostrar qual resposta foi considerada mais útil pelos usuários.
        db.tags_network.find().sort({score:-1}).limit(1)

    // 4. **Encontrar o usuário com mais postagens**
    //    Esta consulta pode nos ajudar a identificar os usuários mais ativos.
        db.tags_network.aggregate([   {     $group: {       _id: "$source",       totalPosts: { $sum: 1 }     }   },   {     $sort: { totalPosts: -1 }   },   {     $limit: 1   } ])

    // 5. **Encontrar a média de visualizações por tag**
    //     Esta consulta pode nos dar uma ideia de quais tópicos atraem mais visualizações em média.
    db.tags_network.aggregate([   {     $group: {       _id: "$source",      avgValue: { $avg: "$value" }     }   },   {     $sort: { avgValue: -1 }   } ])


///## Consultas para **stack_network_nodes**

    // 1. **Encontrar as 10 tags mais utilizadas**
    //    Esta consulta pode ajudá-lo a entender quais são as tecnologias mais discutidas no Stack Overflow.

    db.nodes_tags_network.aggregate([
        { $group: { _id: "$name", count: { $sum: "$size" } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
    ])
    
    // 2. **Encontrar todas as tags pertencentes a um determinado grupo**
    // Esta consulta pode ser útil para entender quais tecnologias estão associadas a um determinado grupo (grupo = 8).
    db.nodes_tags_network.find({ "group": 8 })


    // 3. **Encontrar a média do tamanho das tags para cada grupo**
    // Esta consulta pode ajudá-lo a entender a popularidade média das tecnologias em cada grupo.
    db.nodes_tags_network.aggregate([
        { $group: { _id: "$group", avgSize: { $avg: "$size" } } },
        { $sort: { avgSize: -1 } }
    ])
