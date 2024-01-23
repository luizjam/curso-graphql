const { perfis, proximoId } = require('../../data/db')

function indicePerfil(filtro) 
{
    if(!filtro) return -1
    const { id, nome } = filtro
    if(id)
    {
        return perfis
            .findIndex(p => p.id === id)
    }
    else if(nome)
    {
        return perfis
            .findIndex(p => p.nome === nome)
    }
   
    return -1
}

module.exports = {
    // { nome, email, idade }
    // novoUsuario(_, args) 
    // {
    //     const emailExistente = perfis
    //         .some(u => u.email === args.email )
        
    //     if(emailExistente) {
    //         throw new Error('Email já cadastrado')
    //     }

    //     const novo = {
    //         id: proximoId(),
    //         ...args,
    //         perfil_id: 1,
    //         status: 'ATIVO'
    //     }

    //     perfis.push(novo)
    //     return novo
    // },
    
    // novoUsuario com input
    novoPerfil(_, { dados }) 
    {
        const nomeExistente = perfis
            .some(u => u.nome = dados.nome )
        
        if(nomeExistente) {
            throw new Error('Perfil já cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...dados,
        }

        perfis.push(novo)
        return novo
    },

    // excluirPerfil(_, { id })
    // {
    //     const i = perfis
    //         .findIndex(u => u.id === id)
    //     if(i < 0) return null
    //     const excluidos = perfis.splice(i, 1)
    //         return excluidos ? excluidos[0] : null
    // },

    excluirPerfil(_, { filtro })
    {
        const i = indicePerfil(filtro)
        if(i < 0) return null
        const excluidos = perfis.splice(i, 1)
        return excluidos ? excluidos[0] : null
    },

    // alterarPerfil(_, args) {
    //      const i = perfis
    //         .findIndex(u => u.id === args.id)
    //     if(i < 0) return null

    //     const perfil = {
    //         ...perfis[i],
    //         ...args
    //     }

    //     perfis.splice(i, 1, usuario)
    //     return usuario
    // }

    // desafio alterarUsuário input e filtro
    alterarUsuario(_, { filtro, dados })
    {
        const i = indicePerfil(filtro)
        if(i < 0) return null

        perfis[i].nome = dados.nome
        perfis[i].email = dados.email
        if(dados.idade)
        {
            perfis[i].idade = dados.idade
        }

        return perfis[i]
    }

}