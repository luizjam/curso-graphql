const { usuarios, proximoId } = require('../../data/db')

function indiceUsuario(filtro) 
{
    if(!filtro) return -1
    const { id, email } = filtro
    if(id)
    {
        return usuarios
            .findIndex(u => u.id === id)
    }
    else if(email)
    {
        return usuarios
            .findIndex(u => u.email === email)
    }
    return -1
}

module.exports = {
    // { nome, email, idade }
    // novoUsuario(_, args) 
    // {
    //     const emailExistente = usuarios
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

    //     usuarios.push(novo)
    //     return novo
    // },
    
    // novoUsuario com input
    novoUsuario(_, { dados }) 
    {
        const emailExistente = usuarios
            .some(u => u.email === dados.email )
        
        if(emailExistente) {
            throw new Error('Email já cadastrado')
        }

        const novo = {
            id: proximoId(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(novo)
        return novo
    },

    // excluirUsuario(_, { id })
    // {
    //     const i = usuarios
    //         .findIndex(u => u.id === id)
    //     if(i < 0) return null
    //     const excluidos = usuarios.splice(i, 1)
    //         return excluidos ? excluidos[0] : null
    // },

    excluirUsuario(_, { filtro })
    {
        const i = indiceUsuario(filtro)
        if(i < 0) return null
        const excluidos = usuarios.splice(i, 1)
        return excluidos ? excluidos[0] : null
    },

    // alterarUsuario(_, args) {
    //      const i = usuarios
    //         .findIndex(u => u.id === args.id)
    //     if(i < 0) return null

    //     const usuario = {
    //         ...usuarios[i],
    //         ...args
    //     }

    //     usuarios.splice(i, 1, usuario)
    //     return usuario
    // }

    // desafio alterarUsuário input e filtro
    alterarUsuario(_, { filtro, dados })
    {
        const i = indiceUsuario(filtro)
        if(i < 0) return null

        usuarios[i].nome = dados.nome
        usuarios[i].email = dados.email
        if(dados.idade)
        {
            usuarios[i].idade = dados.idade
        }

        return usuarios[i]
    }

}